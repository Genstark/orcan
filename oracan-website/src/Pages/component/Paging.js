import React, { useEffect } from "react";

function Paging({ page, updatePage, pageArray }) {
  useEffect(() => {
    console.log("***************", pageArray);
  }, [pageArray]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <button
        className="btn btn-primary"
        style={{
          backgroundColor: "#488092",
          border: 0,
        }}
        onClick={() => (page !== 1 ? updatePage(page - 1) : null)}
      >{`<`}</button>
      <div style={{ height: "100%", width: 30, textAlign: "center" }}>
        {page}
      </div>
      <button
        className="btn btn-primary"
        style={{
          backgroundColor: "#488092",
          border: 0,
        }}
        onClick={() =>
          page !== pageArray.totalPages ? updatePage(page + 1) : null
        }
      >{`>`}</button>
    </div>
  );
}

export default Paging;
