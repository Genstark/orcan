import React, { useState } from "react";

function Table({ tableData, tableColumns }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Define the number of items per page

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page data
  const paginatedData = tableData.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Extract column names dynamically from the first item in tableData
  const columns = tableColumns.length > 0 ? tableColumns : [];

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => {
                return (
                  <td key={colIndex} style={{ fontFamily: "arial" }}>
                    {row[column]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="btn btn-sm btn-primary"
          >
            Previous
          </button>
          &nbsp;
          {[...Array(totalPages)].map((_, page) => (
            <>
              <button
                key={page}
                onClick={() => setCurrentPage(page + 1)}
                disabled={page + 1 === currentPage}
                className="btn btn-sm btn-primary"
              >
                {page + 1}
              </button>
              &nbsp;
            </>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-primary"
          >
            Next
          </button>
        </div>
        <p style={{ color: "#000" }}>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </>
  );
}

export default Table;
