function FeatureTable({ features }) {
  if (!features) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        
        Extracted Features
      </h3>

      <div style={styles.tableWrapper} className="feature-table-wrapper">
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>Feature</th>
              <th style={styles.th}>Value</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(features).map(([key, value], index) => (
              <tr 
                key={key} 
                style={{
                  ...styles.tr,
                  ...(index % 2 === 0 ? styles.trEven : styles.trOdd)
                }}
                className="feature-row"
              >
                <td style={styles.td}>{key.replace(/_/g, ' ')}</td>
                <td style={styles.td}>{value.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(14, 165, 233, 0.2)',
    border: '1px solid rgba(14, 165, 233, 0.2)',
  },
  
  title: {
    margin: 0,
    padding: '1.25rem 1.5rem',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    color: '#ffffff',
    fontSize: '1.35rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
    borderBottom: '2px solid',
    borderImage: 'linear-gradient(90deg, #0ea5e9, #14b8a6) 1',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  
  titleIcon: {
    fontSize: '1.5rem',
    filter: 'drop-shadow(0 2px 4px rgba(14, 165, 233, 0.3))',
  },
  
  tableWrapper: {
    flex: 1,
    overflow: 'auto',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    scrollBehavior: 'smooth',
    backdropFilter: 'blur(10px)',
  },
  
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: '0.95rem',
    border: 'none',
  },
  
  thead: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  
  th: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    color: '#ffffff',
    fontWeight: '600',
    padding: '1rem 1.5rem',
    textAlign: 'left',
    fontSize: '0.95rem',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    borderBottom: '3px solid',
    borderImage: 'linear-gradient(90deg, #0ea5e9, #14b8a6) 1',
    whiteSpace: 'nowrap',
    position: 'relative',
  },
  
  tr: {
    transition: 'all 0.2s ease',
    cursor: 'default',
  },
  
  trEven: {
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
  },
  
  trOdd: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
  },
  
  td: {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid rgba(14, 165, 233, 0.2)',
    color: '#e2e8f0',
    lineHeight: '1.6',
  },
  
  footer: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderTop: '1px solid rgba(14, 165, 233, 0.2)',
    textAlign: 'right',
  },
  
  footerText: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    fontWeight: '500',
    letterSpacing: '0.3px',
  },
};

// Add hover effect via style tag
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  /* Custom scrollbar with blue and mint theme */
  .feature-table-wrapper::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  
  .feature-table-wrapper::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.6);
    border-radius: 8px;
  }
  
  .feature-table-wrapper::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
    border-radius: 8px;
    border: 2px solid rgba(15, 23, 42, 0.8);
  }
  
  .feature-table-wrapper::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%);
  }
  
  /* Row hover effect */
  .feature-row:hover {
    background: linear-gradient(90deg, rgba(14, 165, 233, 0.2) 0%, rgba(20, 184, 166, 0.2) 100%) !important;
    transform: scale(1.01);
    transition: all 0.2s ease;
  }
  
  /* First column styling */
  td:first-child {
    font-weight: 600;
    color: #ffffff;
    border-right: 2px solid;
    border-image: linear-gradient(180deg, #0ea5e9, #14b8a6) 1;
    background: linear-gradient(90deg, rgba(14, 165, 233, 0.1) 0%, transparent 100%);
    text-transform: capitalize;
  }
  
  /* Second column styling */
  td:last-child {
    font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
    color: #14b8a6;
    font-weight: 500;
  }
  
  /* Header glow effect */
  th::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(14, 165, 233, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%);
    pointer-events: none;
    animation: headerGlow 3s ease infinite;
  }
  
  /* Animation for header glow */
  @keyframes headerGlow {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
  }
  
  /* Subtle pattern on odd rows */
  tr:nth-child(odd) td {
    background-image: radial-gradient(circle at 0% 50%, rgba(14, 165, 233, 0.03) 0%, transparent 50%);
  }
  
  /* First column hover effect */
  td:first-child:hover {
    color: #0ea5e9;
    transition: color 0.2s ease;
  }
  
  /* Second column hover effect */
  td:last-child:hover {
    color: #ffffff;
    transition: color 0.2s ease;
  }
  
  /* Table header hover effect */
  th:hover {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
  }
  
  /* Add corner accents */
  .feature-table-wrapper {
    position: relative;
  }
  
  .feature-table-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-top: 3px solid #0ea5e9;
    border-left: 3px solid #0ea5e9;
    border-radius: 12px 0 0 0;
    pointer-events: none;
    z-index: 2;
    opacity: 0.5;
  }
  
  .feature-table-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-top: 3px solid #14b8a6;
    border-right: 3px solid #14b8a6;
    border-radius: 0 12px 0 0;
    pointer-events: none;
    z-index: 2;
    opacity: 0.5;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    td, th {
      padding: 0.75rem 1rem !important;
    }
    
    td:first-child {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  
  /* Animation for table appearance */
  @keyframes tableFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .feature-table-wrapper {
    animation: tableFadeIn 0.6s ease-out;
  }
`;
document.head.appendChild(styleSheet);

export default FeatureTable;