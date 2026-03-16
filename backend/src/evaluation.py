import pandas as pd
from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report
)


def evaluate(model, X_test, y_test) -> dict:
    """
    Evaluate trained model and return metrics dictionary.
    """
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    return {
        "Precision": precision_score(y_test, y_pred),
        "Recall": recall_score(y_test, y_pred),
        "F1-Score": f1_score(y_test, y_pred),
        "ROC-AUC": roc_auc_score(y_test, y_prob)
    }


def full_report(model, X_test, y_test):
    """
    Print detailed classification report and confusion matrix.
    """
    y_pred = model.predict(X_test)

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred))


def compare_models(models_dict, X_test, y_test) -> pd.DataFrame:
    """
    Compare multiple trained models.
    """
    results = []

    for name, model in models_dict.items():
        metrics = evaluate(model, X_test, y_test)
        metrics["Model"] = name
        results.append(metrics)

    return pd.DataFrame(results)