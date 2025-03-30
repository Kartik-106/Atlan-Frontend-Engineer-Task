
import './PaginationControl.css';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPaginationItems = () => {
    const items = [];

    items.push(
      <li key="first" className="pagination-item">
        <button 
          className={`pagination-link ${currentPage === 1 ? 'pagination-link-active' : ''}`}
          onClick={() => goToPage(1)}
        >
          1
        </button>
      </li>
    );

    if (currentPage > 3) {
      items.push(
        <li key="ellipsis-1" className="pagination-item">
          <span className="pagination-ellipsis">...</span>
        </li>
      );
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; 
      items.push(
        <li key={i} className="pagination-item">
          <button 
            className={`pagination-link ${currentPage === i ? 'pagination-link-active' : ''}`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        </li>
      );
    }


    if (currentPage < totalPages - 2 && totalPages > 3) {
      items.push(
        <li key="ellipsis-2" className="pagination-item">
          <span className="pagination-ellipsis">...</span>
        </li>
      );
    }

    if (totalPages > 1) {
      items.push(
        <li key="last" className="pagination-item">
          <button 
            className={`pagination-link ${currentPage === totalPages ? 'pagination-link-active' : ''}`}
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return items;
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <ul className="pagination-content">
        <li className="pagination-item">
          <button 
            className="pagination-prev"
            onClick={() => goToPage(currentPage - 1)} 
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span>Previous</span>
          </button>
        </li>
        
        {getPaginationItems()}
        
        <li className="pagination-item">
          <button 
            className="pagination-next"
            onClick={() => goToPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <span>Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}