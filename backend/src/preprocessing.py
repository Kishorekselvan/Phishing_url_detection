import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.utils import resample


import pandas as pd

def load_and_clean_data(phishing_path: str, legit_path: str) -> pd.DataFrame:
    """
    Load phishing and legitimate datasets, clean and combine them.
    """

    
    phishing_df = pd.read_csv(phishing_path)
    legit_df = pd.read_csv(legit_path)

    
    phishing_df.columns = ['url', 'type']
    legit_df.columns = ['url', 'type']

    
    phishing_df['label'] = 1

    
    legit_df['type'] = legit_df['type'].str.lower().str.strip()

    legit_df['label'] = legit_df['type'].map({
        'phishing': 1,
        'legitimate': 0
    })

    
    df = pd.concat([
        phishing_df[['url', 'label']],
        legit_df[['url', 'label']]
    ], ignore_index=True)

    
    df.drop_duplicates(inplace=True)
    df.dropna(inplace=True)
    df['url'] = df['url'].str.lower().str.strip()

    return df

def split_data(df: pd.DataFrame, test_size: float = 0.2):
    """
    Split dataset into stratified train and test sets.
    """
    X = df['url']
    y = df['label']

    return train_test_split(
        X,
        y,
        test_size=test_size,
        stratify=y,
        random_state=42
    )



def balance_training_data(X_train: pd.DataFrame, y_train: pd.Series):
    """
    Balance training dataset using downsampling.
    Works with feature DataFrame (not URL Series).
    """

    # Combine features + label
    train_df = X_train.copy()
    train_df['label'] = y_train.values

    # Separate classes
    phishing = train_df[train_df['label'] == 1]
    legit = train_df[train_df['label'] == 0]

    # Downsample majority class
    if len(phishing) < len(legit):
        legit_downsampled = resample(
            legit,
            replace=False,
            n_samples=len(phishing),
            random_state=42
        )
        balanced_df = pd.concat([phishing, legit_downsampled])
    else:
        phishing_downsampled = resample(
            phishing,
            replace=False,
            n_samples=len(legit),
            random_state=42
        )
        balanced_df = pd.concat([phishing_downsampled, legit])

    # Shuffle
    balanced_df = balanced_df.sample(frac=1, random_state=42)

    # Separate again
    y_balanced = balanced_df['label']
    X_balanced = balanced_df.drop(columns=['label'])

    return X_balanced, y_balanced