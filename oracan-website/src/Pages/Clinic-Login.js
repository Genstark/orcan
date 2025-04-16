import React, { useState } from "react";
import Logo from "../assets/oracan-logo.svg";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import { instance } from "../util";
function ClinicLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;
  const [submit, updateSubmit] = useState(true);
  const handleSubmit = async () => {
    if (email.length !== 0 && otp.length !== 0) {
      try {
        const result = await instance.post("/verifyOtp", {
          clinicEmail: email,
          otp: otp,
        });

        // Login successful, proceed accordingly
        console.log(result.data.jwt); // Handle successful login response
        localStorage.setItem("jwt", result.data.jwt);
        localStorage.setItem("clinicEmail", result.data.email);
        window.location.href = "/clinic-dashboard";
      } catch (error) {
        if (error.response.status === 401) {
          alert("Invalid email or otp"); // Display error message
        } else {
          console.error("Login error:", error); // Handle other errors
          alert("An error occurred during login. Please try again.");
        }
      }
    } else {
      alert("Email and otp field cannot be empty");
    }
    // window.location.href = "/dashboard";
  };

  const sendOtp = async () => {
    const emailRegex =
      /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$)/;

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
    } else if (email.length < 7) {
      alert("Email is too short");
    } else {
      // Proceed with sending the OTP
      try {
        const response = await instance.post(`/sendOtpClinic`, {
          clinicEmail: email,
          otp: Math.floor(100000 + Math.random() * 900000),
        });
        if (response.data.verified) {
          updateSubmit(false);
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
      }

      //   alert(`OTP has been send to ${email}`);
    }
  };
  return (
    <div className="container-fluid bg-blue flex-row-align-center oracan-gradient">
      <div className="row">
        <div className="col-md-4 offset-md-4 login-card">
          <center>
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: "80px",
              }}
            />
          </center>
          <p
            className="bm-semi xl accent"
            style={{ marginTop: 57, color: "black" }}
          >
            {currentPath === "/staff" ? "Admin Panel" : "Clinic Login"}
          </p>
          <p style={{ marginTop: 15, color: "black" }}>
            This page is exclusively intended for authorized personnel
            associated with our organization. If you are not a member of our
            organization's staff or management, please be advised to visit
            oracan.in.
          </p>
          <p style={{ color: "black" }}>
            For general information and access to our public-facing content,
            kindly visit the home page of our website. We appreciate your
            understanding and cooperation in maintaining the security and
            functionality of this platform.
          </p>

          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            size="small"
            style={{
              marginTop: 30,
            }}
            className="login-text-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="otp-button"
              style={{
                backgroundColor: "#488092",
                border: 0,
                color: "white",
                padding: "8px 16px",
                borderRadius: 5,
              }}
              onClick={() => sendOtp()}
            >
              Send OTP
            </button>
          </div>

          <TextField
            id="filled-basic"
            type="text"
            label="Enter OTP"
            variant="filled"
            size="small"
            style={{
              marginTop: 15,
            }}
            className="login-text-field"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <center>
            <button
              type="submit"
              className="login-button"
              style={{ backgroundColor: "#488092" }}
              onClick={() => handleSubmit()}
              disabled={submit}
            >
              LOGIN
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default ClinicLogin;
