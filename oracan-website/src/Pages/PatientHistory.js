import React, { useEffect, useState } from "react";
import PageLimit from "./PageLimit";
import Paging from "./component/Paging";
import { instance, formatDate } from "../util";
function PatientHistory() {
  const [tableData, setTableData] = useState([]);
  const [page, updatePage] = useState(1);
  const [limit, updateLimit] = useState(10);
  const [pageArray, updatePageArray] = useState();
  const [clinicEmail, updateClinicEmail] = useState("");
  useEffect(() => {
    console.log("Table Data is: ", tableData);
  }, [tableData]);

  const fetchData = async (x) => {
    try {
      const response = await instance.get(
        `/fetchClinicSpecificUser?limit=${limit}&page=${page}&clinicEmail=${x}`
      );
      if (response.status === 200) {
        setTableData(response.data);
        updatePageArray(response.data.pagination);
        console.log(response.data);
      } else {
        alert("Try again later");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    let clinic = localStorage.getItem("clinicEmail");
    // updateClinicEmail(clinic);
    fetchData(clinic);
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  const del = async (id) => {
    try {
      const deleteReq = await instance.delete(`/deleteSpecificUser/${id}`);
      if (deleteReq.status === 200) {
        alert(deleteReq.data.message);
      } else {
        alert("Error deleting user");
      }
      fetchData();
    } catch (error) {
      alert("Error deleting user");
    }
  };

  return (
    <div className="main">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            {/* <th scope="col">Contact Number</th> */}
            <th scope="col">Date of Birth</th>
            <th scope="col">Gender</th>
            <th scope="col">Location</th>
            <th scope="col">Type</th>
            <th scope="col">Evaluation</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.response?.map((item, index) => (
            <tr key={item?._id}>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{formatDate(item?.dob)}</td>
              <td>{item?.gender}</td>
              <td>
                {item?.city}, {item?.state}
              </td>
              <td>
                <a href={item?.biometric?.imageUrl} target="_blank">
                  {item?.biometric?.type}
                </a>
              </td>
              <td>{item?.questionnaire?.total}/50</td>
              <td>{item?.questionnaire?.percentage}%</td>
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

export default PatientHistory;
