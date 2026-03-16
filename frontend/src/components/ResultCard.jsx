function ResultCard({ result }) {
  if (!result) return null;

  const isPhishing = result.prediction === "phishing";

  return (
    <div style={styles.container}>
      <div style={styles.glowEffect}></div>
      
      <div style={{
        ...styles.card,
        background: isPhishing 
          ? 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)' 
          : 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
        boxShadow: isPhishing
          ? '0 20px 40px rgba(185, 28, 28, 0.3), 0 8px 20px rgba(0, 0, 0, 0.4)'
          : '0 20px 40px rgba(4, 120, 87, 0.3), 0 8px 20px rgba(0, 0, 0, 0.4)',
      }}>
        {/* Decorative corner accents */}
        <div style={styles.cornerTopLeft}></div>
        <div style={styles.cornerTopRight}></div>
        <div style={styles.cornerBottomLeft}></div>
        <div style={styles.cornerBottomRight}></div>

        <div style={styles.content}>
          <div style={styles.iconWrapper}>
            <span style={styles.icon}>
              {isPhishing ? '⚠️' : '✅'}
            </span>
          </div>

          <h2 style={styles.title}>
            {isPhishing ? 'Phishing URL Detected' : 'Legitimate URL'}
          </h2>

          <div style={styles.urlWrapper}>
            <span style={styles.urlLabel}>URL</span>
            <div style={styles.urlContainer}>
              <span style={styles.urlText}>{result.url}</span>
            </div>
          </div>

          <div style={styles.probabilityWrapper}>
            <div style={styles.probabilityHeader}>
              <span style={styles.probabilityLabel}>Phishing Probability</span>
              <span style={styles.probabilityValue}>
                {(result.phishing_probability * 100).toFixed(2)}%
              </span>
            </div>
            
            {/* Progress bar */}
            <div style={styles.progressBarBg}>
              <div style={{
                ...styles.progressBarFill,
                width: `${(result.phishing_probability * 100)}%`,
                background: isPhishing
                  ? 'linear-gradient(90deg, #f87171 0%, #ef4444 100%)'
                  : 'linear-gradient(90deg, #34d399 0%, #10b981 100%)',
              }}></div>
            </div>
          </div>

          {/* Status badge */}
          <div style={{
            ...styles.statusBadge,
            background: isPhishing
              ? 'rgba(239, 68, 68, 0.2)'
              : 'rgba(16, 185, 129, 0.2)',
            border: isPhishing
              ? '1px solid rgba(239, 68, 68, 0.3)'
              : '1px solid rgba(16, 185, 129, 0.3)',
          }}>
            <span style={styles.statusDot}></span>
            <span style={styles.statusText}>
              {isPhishing ? 'High Risk' : 'Safe'}
            </span>
          </div>

          {/* Explainability Section */}
          {result.explanations && result.explanations.length > 0 && (
            <div style={styles.explanationWrapper}>
              <h3 style={styles.explanationTitle}>
                
                Why this result?
              </h3>

              <ul style={styles.explanationList}>
                {result.explanations.map((exp, index) => (
                  <li key={index} style={styles.explanationItem}>
                    <span style={styles.explanationBullet}>•</span>
                    <span style={styles.explanationText}>{exp}</span>
                  </li>
                ))}
              </ul>
              
              {/* AI insight badge */}
              <div style={styles.explanationFooter}>
                
                <span style={styles.explanationFooterText}>
                  AI-powered explanation based on feature analysis
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    marginBottom: '24px',
    animation: 'slideIn 0.5s ease-out',
  },
  
  glowEffect: {
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
    background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)',
    borderRadius: '24px',
    opacity: '0.2',
    filter: 'blur(20px)',
    zIndex: '0',
  },
  
  card: {
    position: 'relative',
    padding: '28px',
    borderRadius: '20px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    overflow: 'hidden',
    zIndex: '1',
  },
  
  // Corner accents
  cornerTopLeft: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '30px',
    height: '30px',
    borderTop: '4px solid rgba(255, 255, 255, 0.3)',
    borderLeft: '4px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px 0 0 0',
  },
  
  cornerTopRight: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '30px',
    height: '30px',
    borderTop: '4px solid rgba(255, 255, 255, 0.3)',
    borderRight: '4px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '0 16px 0 0',
  },
  
  cornerBottomLeft: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '30px',
    height: '30px',
    borderBottom: '4px solid rgba(255, 255, 255, 0.3)',
    borderLeft: '4px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '0 0 0 16px',
  },
  
  cornerBottomRight: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '30px',
    height: '30px',
    borderBottom: '4px solid rgba(255, 255, 255, 0.3)',
    borderRight: '4px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '0 0 16px 0',
  },
  
  content: {
    position: 'relative',
    zIndex: '2',
  },
  
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  
  icon: {
    fontSize: '4rem',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
    animation: 'pulse 2s infinite',
  },
  
  title: {
    color: 'white',
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    margin: '0 0 24px 0',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-0.5px',
  },
  
  urlWrapper: {
    marginBottom: '28px',
  },
  
  urlLabel: {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  
  urlContainer: {
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '12px',
    padding: '16px 20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  
  urlText: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '500',
    wordBreak: 'break-all',
    fontFamily: 'Monaco, Menlo, Courier New, monospace',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  
  probabilityWrapper: {
    marginBottom: '24px',
  },
  
  probabilityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  
  probabilityLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
  
  probabilityValue: {
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: '700',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  
  progressBarBg: {
    width: '100%',
    height: '10px',
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  
  progressBarFill: {
    height: '100%',
    borderRadius: '10px',
    transition: 'width 1s ease-in-out',
    boxShadow: '0 0 10px currentColor',
  },
  
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '30px',
    backdropFilter: 'blur(5px)',
  },
  
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'white',
    animation: 'pulse 1.5s infinite',
  },
  
  statusText: {
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },

  // Explanation section styles
  explanationWrapper: {
    marginTop: '28px',
    background: 'rgba(0, 0, 0, 0.25)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    animation: 'fadeIn 0.8s ease-out',
  },

  explanationTitle: {
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  explanationIcon: {
    fontSize: '1.3rem',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
  },

  explanationList: {
    listStyle: 'none',
    padding: '0',
    margin: '0 0 16px 0',
  },

  explanationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '12px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    padding: '8px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    transition: 'all 0.2s ease',
  },

  explanationBullet: {
    color: '#14b8a6',
    fontSize: '1.2rem',
    fontWeight: '700',
    lineHeight: '1',
  },

  explanationText: {
    flex: '1',
  },

  explanationFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
    padding: '10px 12px',
    background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(20, 184, 166, 0.15) 100%)',
    borderRadius: '10px',
    border: '1px solid rgba(14, 165, 233, 0.2)',
  },

  explanationFooterIcon: {
    fontSize: '1rem',
  },

  explanationFooterText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.85rem',
    fontStyle: 'italic',
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .result-card:hover {
    transform: translateY(-4px);
  }
  
  .result-card:hover .corner-accent {
    border-color: rgba(255, 255, 255, 0.5);
  }

  /* Hover effect for explanation items */
  .explanation-item:hover {
    background: rgba(14, 165, 233, 0.15) !important;
    transform: translateX(5px);
  }
`;
document.head.appendChild(styleSheet);

export default ResultCard;