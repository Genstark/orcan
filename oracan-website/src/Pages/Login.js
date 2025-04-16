import React, { useState } from "react";
import Logo from "../assets/oracan-logo.svg";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import { instance } from "../util";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length !== 0 && password.length !== 0) {
      try {
        const result = await instance.post("/adminLogin", {
          username: username,
          password: password,
        });

        // Login successful, proceed accordingly
        console.log(result.data.jwt); // Handle successful login response
        localStorage.setItem("jwt", result.data.jwt);
        window.location.href = "/dashboard";
      } catch (error) {
        if (error.response.status === 401) {
          alert("Invalid username or password"); // Display error message
        } else {
          console.error("Login error:", error); // Handle other errors
          alert("An error occurred during login. Please try again.");
        }
      }
    } else {
      alert("Username and password field cannot be empty");
    }
    // window.location.href = "/dashboard";
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

          <form onSubmit={handleSubmit}>
            <TextField
              id="filled-basic"
              label="Username"
              variant="filled"
              size="small"
              style={{
                marginTop: 30,
              }}
              className="login-text-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="filled-basic"
              type="password"
              label="Password"
              variant="filled"
              size="small"
              style={{
                marginTop: 15,
              }}
              className="login-text-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <center>
              <button
                type="submit"
                className="login-button"
                style={{ backgroundColor: "#488092" }}
              >
                LOGIN
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
