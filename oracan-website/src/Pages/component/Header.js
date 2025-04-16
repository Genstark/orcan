import React from "react";

import HeaderImage from "../../assets/mockup.png";
import "./style.css";

function Header() {
  return (
    <div className="row padding170">
      <div
        data-aos="zoom-out"
        data-aos-duration="2000"
        className="col-lg-6 d-flex flex-column justify-content-center show-bg p-5 remove-p5"
      >
        <p
          className="p-t thirtytwo lightblue mobile"
          style={{ lineHeight: 1, color: "#488392" }}
        >
          Diagnose Today, Thrive Tomorrow:
        </p>
        <p
          className="p-t twentyeight lightblue mobile"
          style={{ lineHeight: 1, color: "#488392" }}
        >
          Fast-Track Your Wellness Journey!
        </p>
        <br />
        <button
          className="m-b thirtytwo whiteColor getApp"
          style={{ backgroundColor: "#488392" }}
        >
          GET THE APP
        </button>
      </div>
      <div
        data-aos="zoom-out"
        data-aos-duration="2000"
        className="col-lg-6 remove-bg"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <img src={HeaderImage} alt="header" style={{ height: "90vh" }} />
      </div>
    </div>
  );
}

export default Header;
