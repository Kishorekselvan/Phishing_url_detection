import { useState } from "react";
import UrlInput from "../components/URLinput";
import ResultCard from "../components/ResultCard";
import FeatureTable from "../components/FeatureTable";
import { checkUrl } from "../services/api";
import './Home.css';

function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrlSubmit = async (url) => {
    setLoading(true);
    setResult(null); // Clear previous result when new URL is submitted

    try {
      const data = await checkUrl(url);
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error contacting backend");
    }

    setLoading(false);
  };

  return (
    <div className="home-container">
      {/* Animated background elements */}
      <div className="bg-gradient"></div>
      <div className="bg-pattern"></div>
      
      <div className="content-wrapper">
        <div className="header-section">
          <div className="title-wrapper">
            <h1 className="title">
              <span className="title-icon">🛡️</span>
              Phishing URL Detection
            </h1>
            <div className="title-underline"></div>
          </div>
          <p className="subtitle">
            Enter a URL to analyze and detect potential phishing threats
          </p>
        </div>

        <div className="input-section">
          <UrlInput onSubmit={handleUrlSubmit} />
        </div>

        {/* Always show loading indicator with proper spacing */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Analyzing URL...</p>
            <p className="loading-subtext">Checking for phishing indicators</p>
          </div>
        )}

        {/* Always show result card if result exists */}
        {result && (
          <div className="result-section">
            <ResultCard result={result} />
          </div>
        )}

        {/* Always show feature table if result and features exist */}
        {result && result.features && Object.keys(result.features).length > 0 && (
          <div className="features-section">
            <div className="features-header">
              <h2 className="features-title">
                
                Feature Table
              </h2>
              <div className="features-badge">
                {Object.keys(result.features).length} Features Extracted
              </div>
            </div>
            <FeatureTable features={result.features} />
          </div>
        )}

        {/* Show empty state when no result and not loading */}
        {!loading && !result && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No URL Analyzed Yet</h3>
            <p className="empty-state-text">
              Enter a URL above to start analyzing for phishing threats
            </p>
            <div className="empty-state-features">
              <div className="feature-chip">URL Length Check</div>
              <div className="feature-chip">SSL Certificate</div>
              <div className="feature-chip">Domain Age</div>
              <div className="feature-chip">Special Characters</div>
              <div className="feature-chip">IP Address</div>
              <div className="feature-chip">URL Shorteners</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;