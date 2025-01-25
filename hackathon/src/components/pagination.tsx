import React from 'react';

interface PaginationProps {
  pageSize : number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange : (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleRestart : ()=> void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  pageSize, 
  currentPage, 
  totalPages, 
  onPageChange , 
  onPageSizeChange, 
  handleRestart}: PaginationProps) => 
{
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <div className="left-align">
        <button style={{ backgroundColor: "red" }} className="restart-button" onClick={handleRestart}>
          Restart
        </button>
      </div>

      <div className="center-align">
        <button onClick={handlePrevious} disabled={currentPage == 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage == totalPages}>
          Next
        </button>
      </div>

      <div className="right-align">
        <label htmlFor={"pageSizeSelect"}> Items per page: </label>
        <select id="pageSizeSelect" value={pageSize} onChange={(e) => onPageSizeChange(e)}>
          {[1, 2, 5, 10, 15].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
  
  
};

export default Pagination;
