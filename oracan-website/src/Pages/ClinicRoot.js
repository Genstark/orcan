import React, { useEffect, useState } from "react";
import Logo from "../assets/oracan-logo-white.svg";
import Two from "../assets/2.svg";
import Four from "../assets/4.svg";
import Six from "../assets/6.svg";
import Seven from "../assets/7.svg";
import Profile from "../assets/profile.svg";
import { Outlet, Link } from "react-router-dom";
import { instance } from "../util";

export default function ClinicRoot() {
  const [active, updateActive] = useState("Evaluation");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log("ClinicRoot.js useEffect");
    console.log("value of jwt is:", jwt);
    // const accessToken = "Test@123";
    if (jwt !== null) {
      console.log(1);
      instance
        .get(`/verifyJwt`, {
          headers: {
            gfg_jwt_secret_key: jwt,
          },
        })
        .then((response) => {
          if (response.data.success) {
            console.log("in If", response.data);
          } else {
            console.log("in else");
            alert(response.data.message);
            clearAllData();
          }
        })
        .catch((error) => {
          if (error.response.status === 400 || error.response.status === 401) {
            console.log("In Catch", error);
            clearAllData();
          }
        });
    } else {
      console.log(2);
      console.log("outer else");
      clearAllData();
    }
  }, []);

  const clearAllData = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}
      >
        <div
          className="side-menu"
          style={{ display: screenWidth < 630 && "none" }}
        >
          <div className="top-holder">
            <center>
              <img src={Logo} alt="Logo" className="logo" />
            </center>
          </div>
          <div className="middle-holder">
            <span>
              <Link to="./" onClick={() => updateActive("Evaluation")}>
                <img src={Two} alt="Dashboard" className="icn" />
                Evaluation
              </Link>
            </span>

            <span>
              <Link
                to="./patient-history"
                onClick={() => updateActive("Patient History")}
              >
                <img src={Six} alt="User" className="icn" />
                Patient History
              </Link>
            </span>
          </div>

          <div className="bottom-holder">
            <span onClick={() => clearAllData()}>
              <a
                style={{
                  color: "white",
                  marginLeft: "30px",
                  marginRight: "30px",
                  fontSize: "1rem",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
                href="/"
              >
                Logout <img src={Seven} alt="Logout" className="icn-2" />
              </a>
            </span>
          </div>
        </div>
        <div className="container-fluid main-section">
          <div
            className="row"
            style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}
          >
            <div className="container-fluid" style={{ paddingTop: 87 }}>
              <div
                className="row"
                style={{
                  position: "fixed",
                  top: 0,
                  zIndex: 999,
                  width: "calc(100% - 275px)",
                }}
              >
                <div className="col-md-12 top-nav-with-name">
                  <p className="page-heading">{active}</p>
                  <img src={Profile} alt="profile" />
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
