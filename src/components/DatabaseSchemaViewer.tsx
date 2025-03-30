// DatabaseSchema.tsx

import './DatabasSchema.css';

export interface Table {
  name: string;
  columns: string[];
}

interface DatabaseSchemaProps {
  tables: Table[];
  setQuery: (query: string) => void;
}

export function DatabaseSchema({ tables, setQuery }: DatabaseSchemaProps) {


  return (
    <div className="database-schema-card">
      <div className="card-header">
        <h3 className="card-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="database-icon"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"></path>
            <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3"></path>
          </svg>
          Database Schema
        </h3>
      </div>
      <div className="card-content">
        <div className="scroll-area">
          {tables.map((table) => (
            <div key={table.name} className="table-info">
              <h3 className="table-name">{table.name}</h3>
              <ul className="column-list">
                {table.columns.map((column) => (
                  <li  style={{
                    cursor: 'pointer'
                  }} onClick={(e) => {
                    const column = e.currentTarget.textContent;
                    console.log(column);
                    setQuery(`select ${column} from ${table.name}`);
                  }} key={column} className="column-item">
                    {column}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}