import { useState } from "react";
import './URLinput.css'; // Create this CSS file

function UrlInput({ onSubmit }) {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="url-input-form">
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter URL to analyze"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`url-input ${isFocused ? 'focused' : ''} ${url ? 'filled' : ''}`}
        />
        
        <button 
          type="submit" 
          className={`analyze-btn ${url ? 'active' : 'disabled'}`}
          disabled={!url}
        >
          Analyze
        </button>
      </div>
    </form>
  );
}

export default UrlInput;