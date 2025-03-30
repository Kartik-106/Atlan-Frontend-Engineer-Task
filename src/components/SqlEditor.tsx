// SQLEditor.tsx
import  { useEffect, useState } from "react";
import { DatabaseSchema, Table } from "../components/DatabaseSchemaViewer";
import { QuerySearch } from "../components/QuerySearch";
import { ResultsDisplay } from "../components/QueryResults";
import { QueryHistory } from "../components/QueryHistory";
import "./SQLEditor.css";
import fetchAndFilterCSV from "../utils/fetchCSV";


export function SQLEditor() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("results");
  const [queryMap, setQueryMap] = useState<Record<string,Object>>();
  const [tables, setTables] = useState<Table[]>([]);

  
  useEffect(()=>{
    const fetchData = async() => {
      const queryMapValue = await fetch("/queryMap.json").then(res => res.json())
      const tableMetaData = await fetch("/tables.json").then(res => res.json())
      setTables(tableMetaData);
      setQueryMap(queryMapValue);
    }
    fetchData();
  },[])


  const executeQuery = async() => {
    let cols: string[] = [];
    const lowerQuery = query.toLowerCase();
    const queryMapValue = await fetch("/queryMap.json").then(res => res.json())

    const { table, filter,columns } = queryMapValue[lowerQuery];
    console.log(table);
    setQueryMap(queryMapValue);
    const data = await fetchAndFilterCSV(`/data/${table}.csv`, filter,columns);
    cols = Object.keys(data[0]);
    setQuery(query);
    setResults(data);
    
    if (!queryHistory.includes(query)) {
      setQueryHistory((prev) => [query, ...prev]);
    }
    
    setColumns(cols);
  };

  return (
    <div className="sql-editor-container">
      <div className="sidebar">
        <DatabaseSchema tables={tables} setQuery={setQuery} />
      </div>
      
      <div className="main-content">
        <QuerySearch query={query} setQuery={setQuery} executeQuery={executeQuery} querySuggestions = {queryMap ? Object.keys(queryMap) : []} />
        <div className="tabs-container">
          <div className="tabs-list">
            <button 
              className={`tab-trigger ${activeTab === "results" ? "active" : ""}`}
              onClick={() => setActiveTab("results")}
            >
              Results
            </button>
            <button 
              className={`tab-trigger ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="clock-icon"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              History ({queryHistory.length})
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === "results" && (
              <ResultsDisplay results={results} columns={columns} />
            )}
            
            {activeTab === "history" && (
              <QueryHistory history={queryHistory} setQuery={setQuery} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}