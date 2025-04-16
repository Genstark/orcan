import React, { useEffect, useState } from "react";
import LogoBig from "../../assets/oracan-logo.svg";
import Instagram from "../../assets/footer-instagram.svg";
import X from "../../assets/footer-twitter.svg";
import Youtube from "../../assets/footer-youtube.svg";
import { Link } from "react-router-dom";

function Footer() {
  const [year, updateYear] = useState(2023);
  useEffect(() => {
    const currentDate = new Date();
    updateYear(currentDate.getFullYear());
  }, []);
  return (
    <>
      <div
        className="row d-flex justify-content-center"
        style={{ backgroundColor: "#488092" }}
      >
        <center>
          <img
            src={LogoBig}
            alt=""
            style={{
              width: 240,
              backgroundColor: "white",
              padding: "20px 20px 20px 20px",
              borderRadius: "0 0 8px 8px",
            }}
          />
        </center>
        <div className="col-md-3 col-sm-4 d-flex justify-content-between mt-4 mb-4">
          <a href="#" target="_blank">
            <img src={Instagram} alt="" style={{ width: 50 }} />
          </a>
          <a href="#" target="_blank">
            <img src={X} alt="" style={{ width: 50 }} />
          </a>
          <a href="#" target="_blank">
            <img src={Youtube} alt="" style={{ width: 50 }} />
          </a>
        </div>
      </div>
      <div
        className="row p-2"
        style={{ backgroundColor: "#488092", borderTop: "1px solid white" }}
      >
        <div className="col-xl-4 d-flex footer-copy">
          <p style={{ margin: 0, textAlign: "center" }}>
            Copyright &copy; {year} HelixSmartLabs
          </p>
        </div>
        <div className="col-xl-4 offset-xl-4 d-flex justify-content-between flex-wrap remove-320">
          <Link
            to="clinic"
            className="pointer whiteColor"
            style={{ margin: 0 }}
          >
            Clinics
          </Link>

          <Link to="staff" className="pointer whiteColor" style={{ margin: 0 }}>
            Staff
          </Link>

          <Link
            to="terms-conditions"
            className="pointer whiteColor"
            style={{ margin: 0 }}
          >
            Terms & Conditions
          </Link>

          <Link
            to="privacy-policy"
            className="pointer whiteColor"
            style={{ margin: 0 }}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </>
  );
}

export default Footer;
