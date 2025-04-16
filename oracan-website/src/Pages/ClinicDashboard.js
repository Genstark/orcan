import React, { useEffect, useState } from "react";
import { instance, baseUrl } from "../util";
function ClinicDashboard() {
  const [email, updateEmail] = useState("");
  const [otp, updateOtp] = useState("");
  const [step, updateStep] = useState(0);

  const sendOtp = async () => {
    const emailRegex =
      /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$)/;

    if (!emailRegex.test(email)) {
      return alert("Invalid email format");
    } else if (email.length < 7) {
      return alert("Email is too short");
    }
    try {
      const response = await instance.post(`/sendUserOtp`, {
        email: email,
        otp: Math.floor(100000 + Math.random() * 900000),
      });
      if (response.status === 200) {
        updateStep(1);
        alert(response.data.message);
      } else {
        alert(`Unexpected status code`, response.status);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const initiate = async () => {
    const emailRegex =
      /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$)/;

    if (!emailRegex.test(email)) {
      return alert("Invalid email format");
    } else if (email.length < 7) {
      return alert("Email is too short");
    } else if (otp.length !== 6) {
      return alert("OTP length incorrect");
    }
    try {
      const response = await instance.post(`/userOtpVerification`, {
        email: email,
        otp: otp,
      });

      if (response.status === 200) {
        const userData = response?.data?.userData;
        console.log(userData);
        localStorage.setItem("data", JSON.stringify(userData));
        alert(response.data.message);
        window.location.href = `${baseUrl}clinic-dashboard/userdata-update?email=${email}`;
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    console.log("Process.env.data", process.env.DATA);
  }, []);
  return (
    <div className="main">
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-xl-4 col-md-3 col-xs-9  offset-xl-3 offset-md-3">
          <input
            type="text"
            className="form form-control"
            placeholder="Patiet Email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
          />
        </div>
        <div className="col-xl-2 col-md-3 col-xs-3">
          <button
            className="btn"
            style={{
              backgroundColor: "#488092",
              color: "white",
              width: "100%",
            }}
            onClick={() => sendOtp()}
          >
            Send OTP
          </button>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-xl-6 col-md-6 col-xs-12 offset-xl-3 offset-md-3">
          <input
            type="text"
            className="form form-control"
            placeholder="OTP"
            value={otp}
            onChange={(e) => updateOtp(e.target.value)}
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-xl-6 col-md-6 col-xs-12 offset-xl-3 offset-md-3">
          <button
            className="btn btn-primary"
            style={{
              width: "100%",
              backgroundColor: "#488092",
              color: "white",
              borderColor: "#488092",
              display: step === 4 ? "none" : "block",
            }}
            onClick={() => initiate()}
            disabled={step === 0 ? true : false}
          >
            Initiate Evaluation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClinicDashboard;
