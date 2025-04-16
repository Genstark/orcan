import React, { useState } from "react";

function Pagination({ tableData, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  // Function to handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      {[...Array(totalPages)].map((_, page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page + 1);
            onPageChange(page + 1);
          }}
          disabled={page + 1 === currentPage}
        >
          {page + 1}
        </button>
      ))}
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default Pagination;
