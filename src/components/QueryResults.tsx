// ResultsDisplay.tsx
import { useState, useEffect } from "react";
import { Download, ArrowUpDown } from "lucide-react";
import { PaginationControls } from "./PaginationControl";

// Import CSS
import "./QueryResults.css";

interface ResultsDisplayProps {
  results: any[];
  columns: string[];
}

export function ResultsDisplay({ results, columns }: ResultsDisplayProps) {
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [visibleResults, setVisibleResults] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Update visible results when results, page, or items per page changes
  useEffect(() => {
    if (useInfiniteScroll) {
      setVisibleResults(results);
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setVisibleResults(results.slice(startIndex, endIndex));
    }

    setTotalPages(Math.max(1, Math.ceil(results.length / itemsPerPage)));
  }, [results, currentPage, itemsPerPage, useInfiniteScroll]);

  useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  const downloadResults = () => {
    if (results.length === 0) return;

    const csvContent = [
      columns.join(","), 
      ...results.map((row) => columns.map((col) => row[col]).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "query_results.csv");
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="results-card">
      <div className="results-header">
        <h2 className="results-title">Query Results</h2>
        <div className="results-controls">
          {results.length > 0 && (
            <>
              <div className="switch-container">
                <div className="switch-wrapper">
                  <input
                    type="checkbox"
                    id="infinite-scroll"
                    className="switch-input"
                    checked={useInfiniteScroll}
                    onChange={(e) => setUseInfiniteScroll(e.target.checked)}
                  />
                  <label className="switch" htmlFor="infinite-scroll"></label>
                </div>
                <label className="switch-label" htmlFor="infinite-scroll">
                  {useInfiniteScroll ? "Infinite Scroll" : "Pagination"}
                </label>
              </div>

              {!useInfiniteScroll && (
                <div className="select-container">
                  <div className="select-wrapper">
                    <select
                      className="select-input"
                      value={itemsPerPage.toString()}
                      onChange={(e) => setItemsPerPage(Number.parseInt(e.target.value))}
                    >
                      <option value="5">5 rows</option>
                      <option value="10">10 rows</option>
                      <option value="20">20 rows</option>
                      <option value="50">50 rows</option>
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>
              )}

              <button className="download-button" onClick={downloadResults}>
                <Download className="button-icon" /> Download CSV
              </button>
            </>
          )}
        </div>
      </div>
      <div className="results-content">
        {results.length > 0 ? (
          <div className="results-container">
            <ResultsTable
              columns={columns}
              data={visibleResults}
              totalResults={results.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              useInfiniteScroll={useInfiniteScroll}
            />

            {/* Pagination controls */}
            {!useInfiniteScroll && results.length > itemsPerPage && (
              <PaginationControls 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            )}
          </div>
        ) : (
          <div className="empty-results">
            No results to display. Run a query to see results.
          </div>
        )}
      </div>
    </div>
  );
}

interface ResultsTableProps {
  columns: string[];
  data: any[];
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
  useInfiniteScroll: boolean;
}

function ResultsTable({
  columns,
  data,
  totalResults,
  currentPage,
  itemsPerPage,
  useInfiniteScroll,
}: ResultsTableProps) {
  return (
    <div className="table-container">
      <table className="results-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                <div className="table-header-content">
                  {column}
                  <ArrowUpDown className="sort-icon" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={`${rowIndex}-${column}`}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <caption className="table-caption">
          {useInfiniteScroll
            ? `Showing all ${totalResults} results`
            : `Showing ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                currentPage * itemsPerPage,
                totalResults
              )} of ${totalResults} results`}
        </caption>
      </table>
    </div>
  );
}