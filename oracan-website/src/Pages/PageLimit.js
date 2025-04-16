import React from "react";

function PageLimit({ limit, updateLimit }) {
  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10); // Parse the selected value as integer
    updateLimit(newLimit); // Update the limit in the parent component
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <p style={{ color: "black", padding: 0, margin: 0 }}>
        Limit:&nbsp;&nbsp;
      </p>
      <select
        className="form-select"
        aria-label="Default select example"
        value={limit} // Set the selected value based on the limit prop
        onChange={handleLimitChange} // Call handleLimitChange on select change
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

export default PageLimit;
