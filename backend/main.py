from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pandas as pd
import joblib
import shap

from src.feature_engineering import extract_single_url_features

# ==============================
# Initialize FastAPI
# ==============================

app = FastAPI(title="Phishing URL Detection API")

# ==============================
# Enable CORS (for React frontend)
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# Load Model + Feature Columns
# ==============================

model = joblib.load("saved_models/stacking_phishing_model.pkl")
feature_columns = joblib.load("saved_models/feature_columns.pkl")

# Extract XGBoost model from stacking for SHAP
xgb_model = model.named_estimators_["xgb"]

# SHAP explainer
explainer = shap.TreeExplainer(xgb_model)

# ==============================
# Request Schema
# ==============================

class URLRequest(BaseModel):
    url: str


# ==============================
# Health Check
# ==============================

@app.get("/")
def home():
    return {"message": "Phishing URL Detection API running"}


# ==============================
# Prediction Endpoint
# ==============================

@app.post("/predict")
def predict_url(data: URLRequest):

    url = data.url

    # Extract features
    features = extract_single_url_features(url)

    features_df = pd.DataFrame([features])

    # Align columns with training features
    features_df = features_df.reindex(columns=feature_columns, fill_value=0)

    # Model prediction
    prediction = model.predict(features_df)[0]
    probability = model.predict_proba(features_df)[0][1]

    result = "phishing" if prediction == 1 else "legitimate"

    # ==============================
    # SHAP Explainability
    # ==============================

    shap_values = explainer.shap_values(features_df)

    # Map feature names with shap values
    shap_importance = dict(zip(feature_columns, shap_values[0]))

    # Get top 5 influential features
    top_features = sorted(
        shap_importance.items(),
        key=lambda x: abs(x[1]),
        reverse=True
    )[:5]

    explanations = []

    for feature, value in top_features:
        if value > 0:
            explanations.append(f"{feature} increases phishing risk")
        else:
            explanations.append(f"{feature} suggests legitimate behavior")

    return {
        "url": url,
        "prediction": result,
        "phishing_probability": float(probability),
        "features": features,
        "explanations": explanations
    }