// QueryHistory.tsx

import './QueryHistory.css';

interface QueryHistoryProps {
  history: string[];
  setQuery: (query: string) => void;
}

export function QueryHistory({ history, setQuery }: QueryHistoryProps) {
  return (
    <div className="query-history-card">
      <div className="card-header">
        <h3 className="card-title">Query History</h3>
        <p className="card-description">Previously executed queries</p>
      </div>
      <div className="card-content">
        <div className="scroll-area">
          {history.length > 0 ? (
            <div className="history-list">
              {history.map((historyItem, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => setQuery(historyItem)}
                >
                  <div className="history-item-header">
                    <span className="badge">
                      Query {history.length - index}
                    </span>
                  </div>
                  <pre className="history-item-content">{historyItem}</pre>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-history">No query history yet</div>
          )}
        </div>
      </div>
    </div>
  );
}