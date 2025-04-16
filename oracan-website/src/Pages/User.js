import React, { useEffect, useState } from "react";
import PageLimit from "./PageLimit";
import Paging from "./component/Paging";
import { instance, formatDate } from "../util";
function User() {
  const [tableData, setTableData] = useState([]);
  const [page, updatePage] = useState(1);
  const [limit, updateLimit] = useState(10);
  const [pageArray, updatePageArray] = useState();
  useEffect(() => {
    console.log("Table Data is: ", tableData);
  }, [tableData]);

  const fetchData = async () => {
    try {
      const response = await instance.get(
        `/fetchAllUsers?limit=${limit}&page=${page}`
      );
      setTableData(response?.data);
      updatePageArray(response?.data?.pagination);
      console.log(response?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const del = async (id) => {
    try {
      const deleteReq = await instance.delete(`/deleteSpecificUser/${id}`);
      if (deleteReq.status === 200) {
        alert(deleteReq?.data?.message);
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
            <th scope="col">Clinic Email</th>
            <th scope="col">Location</th>
            <th scope="col">Type</th>
            <th scope="col">Evaluation</th>
            <th scope="col">Percentage</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.response?.map((item, index) => (
            <tr key={item?._id}>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{formatDate(item?.dob)}</td>
              <td>{item?.gender}</td>
              <td>{item?.clinicEmail}</td>
              <td>
                {item?.city}, {item?.state}
              </td>
              <td>
                <a href={item?.biometric?.imageUrl} target="_blank">
                  {item?.biometric?.type}
                </a>
              </td>
              <td>{item?.questionnaire?.total}/50</td>
              <td>{item?.questionnaire?.total}%</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => del(item?._id)}
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

export default User;
