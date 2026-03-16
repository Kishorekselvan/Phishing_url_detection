import re
import pandas as pd
from urllib.parse import urlparse

# Suspicious keywords
KEYWORDS = [
    'login', 'verify', 'secure', 'account',
    'update', 'bank', 'confirm', 'signin',
    'paypal', 'ebay', 'free', 'bonus'
]
def advanced_security_features(url: str) -> dict:
    """
    Additional phishing detection features.
    Does NOT modify existing logic.
    """

    url = str(url).lower()

    try:
        parsed = urlparse(url)
        netloc = parsed.netloc if parsed.netloc else ""
    except Exception:
        netloc = ""

    # Trusted domains
    TRUSTED_DOMAINS = [
        "google.com", "amazon.com", "facebook.com",
        "microsoft.com", "apple.com", "github.com",
        "linkedin.com"
    ]

    trusted_domain = 1 if any(d in netloc for d in TRUSTED_DOMAINS) else 0

    # Brand mismatch detection
    BRANDS = ["google", "amazon", "facebook", "paypal", "apple", "microsoft"]

    brand_in_domain = 1 if any(b in netloc for b in BRANDS) else 0
    brand_in_path = 1 if any(b in parsed.path for b in BRANDS) else 0

    brand_mismatch = 1 if brand_in_path == 1 and brand_in_domain == 0 else 0

    # URL shorteners
    SHORTENERS = ["bit.ly", "tinyurl", "t.co", "goo.gl"]

    has_shortener = 1 if any(s in url for s in SHORTENERS) else 0

    # Keyword density
    keyword_count = sum(word in url for word in KEYWORDS)

    return {
        "trusted_domain": trusted_domain,
        "brand_mismatch": brand_mismatch,
        "has_shortener": has_shortener,
        "keyword_count": keyword_count
    }

def lexical_features(url: str) -> dict:
    """
    Extract lexical features from URL.
    """
    url = str(url)

    return {
        'url_length': len(url),
        'num_dots': url.count('.'),
        'num_hyphens': url.count('-'),
        'num_digits': sum(c.isdigit() for c in url),
        'num_special_chars': len(re.findall(r'[^a-zA-Z0-9]', url))
    }


def structural_features(url: str) -> dict:
    url = str(url)

    try:
        parsed = urlparse(url)
        netloc = parsed.netloc if parsed.netloc else ""
    except Exception:
        parsed = urlparse("")
        netloc = ""

    netloc = netloc.replace("[", "").replace("]", "")

    # Suspicious TLDs
    SUSPICIOUS_TLDS = ["ru", "tk", "xyz", "top", "club", "online", "site"]
    tld = netloc.split('.')[-1] if '.' in netloc else ""

    # Suspicious extensions
    SUSPICIOUS_EXT = ["exe", "zip", "rar", "scr"]

    # Brands
    BRANDS = ["paypal", "google", "facebook", "amazon", "apple"]

    return {
        'has_https': 1 if parsed.scheme == "https" else 0,
        'domain_length': len(netloc),
        'path_length': len(parsed.path),
        'has_ip': 1 if re.match(r'^\d{1,3}(\.\d{1,3}){3}$', netloc) else 0,

        'subdomain_count': netloc.count('.') - 1 if netloc.count('.') > 0 else 0,
        'has_at_symbol': 1 if "@" in url else 0,
        'double_slash_redirect': 1 if "//" in parsed.path else 0,
        'long_url': 1 if len(url) > 75 else 0,

        'has_suspicious_tld': 1 if tld in SUSPICIOUS_TLDS else 0,
        'has_suspicious_ext': 1 if any(ext in url for ext in SUSPICIOUS_EXT) else 0,

        'brand_in_domain': 1 if any(b in netloc for b in BRANDS) else 0,
        'brand_in_path': 1 if any(b in parsed.path for b in BRANDS) else 0
    }


def semantic_features(url: str) -> dict:
    """
    Extract keyword-based semantic features.
    """
    url = str(url)
    features = {}

    for word in KEYWORDS:
        features[f'has_{word}'] = 1 if word in url else 0

    return features


def extract_features(url: str) -> dict:
    """
    Combine all feature types.
    """
    f1 = lexical_features(url)
    f2 = structural_features(url)
    f3 = semantic_features(url)
    f4 = advanced_security_features(url)
    return {**f1, **f2, **f3}


def transform_urls(url_series: pd.Series) -> pd.DataFrame:
    """
    Convert a Series of URLs into numerical feature DataFrame.
    """
    url_series = url_series.astype(str)
    features = url_series.apply(extract_features)
    return pd.DataFrame(list(features))

def extract_single_url_features(url: str):
    """
    Extract and display all features for a single URL.
    """

    print("\nURL:", url)

    # Extract all feature groups
    lex = lexical_features(url)
    struct = structural_features(url)
    sem = semantic_features(url)
    adv = advanced_security_features(url)

    print("\nLexical Features:")
    for k, v in lex.items():
        print(f"{k}: {v}")

    print("\nStructural Features:")
    for k, v in struct.items():
        print(f"{k}: {v}")

    print("\nSemantic Features:")
    for k, v in sem.items():
        print(f"{k}: {v}")

    print("\nAdvanced Security Features:")
    for k, v in adv.items():
        print(f"{k}: {v}")

    # Combine all features (same as training pipeline)
    combined = {**lex, **struct, **sem, **adv}

    return combined