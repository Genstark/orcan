import React, { useEffect, useState } from "react";
import Paging from "./component/Paging";
import PageLimit from "./PageLimit";
import { instance } from "../util";
function ClinicUser() {
  const [tableData, setTableData] = useState([]);
  const [page, updatePage] = useState(1);
  const [limit, updateLimit] = useState(10);
  const [pageArray, updatePageArray] = useState();
  useEffect(() => {
    console.log("Table Data is: ", tableData);
  }, [tableData]);

  useEffect(() => {
    console.log("This is page Array", pageArray);
  }, [pageArray]);

  const fetchData = async () => {
    try {
      const response = await instance.get(
        `/clinic?limit=${limit}&page=${page}`
      );
      console.log("API response:", response.data.pagination);
      setTableData(response.data.allClinics);
      updatePageArray(response.data.pagination);
    } catch (error) {
      alert("Error fetching clinics:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]); // Empty dependency array ensures this effect runs only once when component mounts

  const del = async (id) => {
    try {
      const deleteReq = await instance.delete(`/clinic/${id}`);
      if (deleteReq) {
        alert(deleteReq.data.message);
        fetchData();
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="main">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Clinic Name</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
            <th scope="col">Address</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={item._id}>
              <td>{item.clinicName}</td>
              <td>{item.address.state}</td>
              <td>{item.address.city}</td>
              <td>{item.address.address}</td>
              <td>{item.contactNo}</td>
              <td>{item.clinicEmail}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => del(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PageLimit limit={limit} updateLimit={updateLimit} />
        <Paging page={page} updatePage={updatePage} pageArray={pageArray} />
      </div>
    </div>
  );
}

export default ClinicUser;
