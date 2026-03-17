from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pandas as pd
import numpy as np
import joblib
import shap

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

from src.feature_engineering import extract_single_url_features

# ==============================
# Initialize FastAPI
# ==============================

app = FastAPI(title="Hybrid Phishing URL Detection API")

# ==============================
# Enable CORS
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# Load Models
# ==============================

# ML (Stacking)
stack_model = joblib.load("saved_models/stacking_phishing_model.pkl")

# Meta model (Hybrid)
meta_model = joblib.load("saved_models/hybrid_meta_model.pkl")

# Feature columns
feature_columns = joblib.load("saved_models/feature_columns.pkl")

# LSTM model
lstm_model = load_model("saved_models/lstm_model.keras")

# Tokenizer
tokenizer = joblib.load("saved_models/tokenizer.pkl")

# SHAP (for XGBoost inside stacking)
xgb_model = stack_model.named_estimators_["xgb"]
explainer = shap.TreeExplainer(xgb_model)

# ==============================
# Config
# ==============================

MAX_LEN = 100  # must match training

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
    return {"message": "Hybrid Phishing Detection API running 🚀"}


# ==============================
# Prediction Endpoint
# ==============================

@app.post("/predict")
def predict_url(data: URLRequest):

    url = data.url.lower().strip()

    # ==============================
    # 🔹 1. ML FEATURES → STACKING
    # ==============================

    features = extract_single_url_features(url)
    features_df = pd.DataFrame([features])

    features_df = features_df.reindex(columns=feature_columns, fill_value=0)

    stack_prob = stack_model.predict_proba(features_df)[0][1]

    # ==============================
    # 🔹 2. LSTM PREDICTION
    # ==============================

    seq = tokenizer.texts_to_sequences([url])
    pad = pad_sequences(seq, maxlen=MAX_LEN, padding='post')

    lstm_prob = lstm_model.predict(pad)[0][0]

    # ==============================
    # 🔹 3. HYBRID META MODEL
    # ==============================

    X_meta = np.array([[stack_prob, lstm_prob]])

    final_pred = meta_model.predict(X_meta)[0]
    final_prob = meta_model.predict_proba(X_meta)[0][1]

    result = "phishing" if final_pred == 1 else "legitimate"

    # ==============================
    # 🔹 4. SHAP EXPLANATION (ML ONLY)
    # ==============================

    shap_values = explainer.shap_values(features_df)

    shap_importance = dict(zip(feature_columns, shap_values[0]))

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

    # ==============================
    # 🔹 5. RESPONSE
    # ==============================

    return {
        "url": url,
        "final_prediction": result,
        "final_probability": float(final_prob),

        "model_outputs": {
            "stacking_probability": float(stack_prob),
            "lstm_probability": float(lstm_prob)
        },

        "features": features,
        "explanations": explanations
    }