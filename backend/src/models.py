
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

# ==============================
# 5️⃣ LSTM Model (Deep Learning)
# ==============================
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense, Dropout

def lstm_model(vocab_size, max_len):
    """
    LSTM model for URL classification
    """

    model = Sequential([
        Embedding(input_dim=vocab_size, output_dim=32, input_length=max_len),

        LSTM(64, return_sequences=False),

        Dropout(0.3),

        Dense(32, activation='relu'),
        Dense(1, activation='sigmoid')
    ])

    model.compile(
        loss='binary_crossentropy',
        optimizer='adam',
        metrics=['accuracy']
    )

    return model

# ==============================
# 6️⃣ Transformer Model
# ==============================
from tensorflow.keras.layers import Input, Dense, Dropout, LayerNormalization, MultiHeadAttention, Embedding, GlobalAveragePooling1D
from tensorflow.keras.models import Model

def transformer_model(vocab_size, max_len):
    """
    Simple Transformer model for URL classification
    """

    inputs = Input(shape=(max_len,))

    x = Embedding(input_dim=vocab_size, output_dim=32)(inputs)

    # Attention block
    attn_output = MultiHeadAttention(num_heads=2, key_dim=32)(x, x)
    x = LayerNormalization()(x + attn_output)

    x = GlobalAveragePooling1D()(x)

    x = Dense(32, activation='relu')(x)
    x = Dropout(0.3)(x)

    outputs = Dense(1, activation='sigmoid')(x)

    model = Model(inputs, outputs)

    model.compile(
        loss='binary_crossentropy',
        optimizer='adam',
        metrics=['accuracy']
    )

    return model

# ==============================
# 7️⃣ Hybrid Meta Model
# ==============================
from sklearn.linear_model import LogisticRegression

def hybrid_meta_model():
    """
    Meta learner to combine ML + DL predictions
    """
    return LogisticRegression()