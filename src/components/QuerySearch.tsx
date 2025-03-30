// QueryEditor.tsx
import { useRef, useEffect, useState } from "react";
import { Play, X } from "lucide-react";
// import { querySuggestions } from "./mock-data";


// CSS will be imported from a separate file
import "./QueryEditor.css";

interface QueryEditorProps {
  query: string;
  setQuery: (query: string) => void;
  executeQuery: () => void;
  querySuggestions: string[];
}

export function QuerySearch({ query, setQuery, executeQuery,querySuggestions}: QueryEditorProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  // Filter suggestions based on current query
  useEffect(() => {
    if (query) {
      const filtered = querySuggestions.filter((suggestion) => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query]);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">SQL Query</h2>
        <p className="card-description">
          Write your SQL query below and click Run to execute
        </p>
      </div>
      <div className="card-content">
        <div className="textarea-container">
          <textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="code-textarea"
            placeholder="SELECT * FROM table"
          />
          <button className="run-button" onClick={executeQuery}>
            <Play className="button-icon" /> Run
          </button>
          
          {/* Query suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <QuerySuggestions
              suggestions={filteredSuggestions}
              onSelect={(suggestion) => {
                setQuery(suggestion);
                setShowSuggestions(false);
              }}
              onClose={() => setShowSuggestions(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface QuerySuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  onClose: () => void;
}

export function QuerySuggestions({ suggestions, onSelect, onClose }: QuerySuggestionsProps) {
  return (
    <div className="suggestions-container">
      <div className="suggestions-header">
        <span className="suggestions-title">Suggestions</span>
        <button className="close-button" onClick={onClose}>
          <X className="close-icon" />
        </button>
      </div>
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="suggestion-item"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
