import React, { useState } from "react";
import cityStateData from "../assets/city-state.json";
import PopUpModal from "./component/PopUpModal";
import { instance } from "../util";
function Dashboard() {
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const [clinicName, updateClinicName] = useState("");
  const [email, updateEmail] = useState("");
  const [contactNumber, updateContactNumber] = useState("");
  const [address, updateAddress] = useState("");
  const [otp, updateOtp] = useState("");
  const [show, setShow] = useState(false);

  const registerData = async () => {
    if (
      selectedState === "" ||
      cities === "" ||
      clinicName === "" ||
      email === "" ||
      contactNumber === "" ||
      address === ""
    ) {
      alert("All fields are mandatory");
    } else {
      try {
        const request = await instance.post(
          "/clinic",
          {
            clinicName: clinicName,
            address: {
              state: selectedState,
              city: cities[0],
              address: address,
            },
            contactNo: contactNumber,
            clinicEmail: email,
            otp: Math.floor(100000 + Math.random() * 900000),
          },
          {
            headers: {
              "Content-Type": "application/json",
              gfg_jwt_secret_key: localStorage.getItem("jwt"),
            },
          }
        );
        if (!request.data.verified) {
          setShow(true);
        } else {
          alert(request.data.message);
        }
      } catch (error) {
        console.log(error.message);
        alert(error.response.data.message);
      }
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    if (state === "") {
      setCities([]);
    } else {
      setCities(cityStateData[state]);
    }
  };

  return (
    <div className="main">
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-xl-6 col-md-6 col-xs-12">
          <input
            type="text"
            className="form form-control"
            placeholder="Clinic Name"
            value={clinicName}
            onChange={(e) => updateClinicName(e.target.value)}
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-xl-6 col-md-6 col-xs-12 ">
          <input
            type="text"
            className="form form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-xl-6 col-md-6 col-xs-12 ">
          <input
            type="text"
            className="form form-control"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => updateContactNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-xl-6 col-md-6 col-xs-12 ">
          <input
            type="text"
            className="form form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => updateAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3 col-md-3 col-xs-6" style={{ marginTop: 10 }}>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="form form-control"
            placeholder="State"
          >
            <option value="">Select State</option>
            {Object.keys(cityStateData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-6" style={{ marginTop: 10 }}>
          <select className="form form-control" placeholder="City">
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-xl-6 col-md-6 col-xs-12 ">
          <button
            className="btn btn-primary"
            style={{
              width: "100%",
              backgroundColor: "#488092",
              color: "white",
              borderColor: "#488092",
            }}
            onClick={() => registerData()}
          >
            Register Clinic
          </button>
        </div>
      </div>
      <PopUpModal
        show={show}
        setShow={setShow}
        heading={"Verify User"}
        body={"Enter the otp send on email"}
        otp={otp}
        updateOtp={updateOtp}
        updateClinicName={updateClinicName}
        updateEmail={updateEmail}
        email={email}
        updateContactNumber={updateContactNumber}
        updateAddress={updateAddress}
        setSelectedState={setSelectedState}
        setCities={setCities}
      />
    </div>
  );
}

export default Dashboard;
