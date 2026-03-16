from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, StackingClassifier
from xgboost import XGBClassifier


# ==============================
# 1️⃣ Logistic Regression
# ==============================
def logistic_model():
    """
    Baseline Logistic Regression model.
    """
    return LogisticRegression(
        max_iter=3000,
        random_state=42
    )


# ==============================
# 2️⃣ Random Forest
# ==============================
def random_forest_model():
    """
    Random Forest classifier.
    """
    return RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        n_jobs=-1
    )


# ==============================
# 3️⃣ XGBoost
# ==============================
def xgboost_model():
    """
    XGBoost classifier.
    """
    return XGBClassifier(
        eval_metric="logloss",
        random_state=42,
        n_estimators=100,
        max_depth=6,
        learning_rate=0.1,
        n_jobs=-1
    )


# ==============================
# 4️⃣ Stacking Ensemble
# ==============================
def stacking_model():
    """
    Stacking ensemble:
    Base learners:
        - Random Forest
        - XGBoost
    Meta learner:
        - Logistic Regression
    """

    base_learners = [
        ("rf", random_forest_model()),
        ("xgb", xgboost_model())
    ]

    meta_learner = LogisticRegression(
        max_iter=1000,
        random_state=42
    )

    return StackingClassifier(
        estimators=base_learners,
        final_estimator=meta_learner,
        cv=5,
        n_jobs=-1,
        passthrough=False
    )