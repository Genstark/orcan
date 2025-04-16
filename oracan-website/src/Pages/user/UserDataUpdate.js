import React, { useEffect, useState } from "react";
import cityStateData from "../../assets/city-state.json";
import { useLocation } from "react-router-dom";
import { instance, baseUrl } from "../../util";

function UserDataUpdate() {
  const [name, updateName] = useState("");
  const [state, updateState] = useState("");
  const [cities, updateCities] = useState([]);
  const [city, updateCity] = useState("");
  const [gender, updateGender] = useState("");
  const [dob, updateDob] = useState("");
  const [email, updateEmail] = useState("");
  const location = useLocation();

  const handleStateChange = (e) => {
    const state = e.target.value;
    updateState(state);
    if (state === "") {
      updateCities([]);
    } else {
      updateCities(cityStateData[state]);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    updateCity(city);
  };
  function calculateAge(dateOfBirthString) {
    const dob = new Date(dateOfBirthString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  }

  const updateUser = async () => {
    if (
      state.length === 0 ||
      city.length === 0 ||
      name.length === 0 ||
      gender.length === 0 ||
      dob.length === 0
    ) {
      return alert("All fields are mandatory!");
    }
    const age = calculateAge(dob);
    // const genderScore = gender === "Male" ? 1 : 0;
    // const ageScore = age > 40 ? 1 : 0;
    // const totalScore = genderScore + ageScore;
    // console.log(
    //   "My total score is ",
    //   totalScore,
    //   " my gender score is ",
    //   genderScore,
    //   "and my age score is ",
    //   ageScore
    // );
    // updateScore(totalScore);
    try {
      const response = await instance.post(`/updateUser`, {
        email: email,
        state: state,
        city: city,
        name: name,
        gender: gender,
        dob: dob,
      });
      if (response.status === 200) {
        // updateStep(3);
        alert("User Data Updated Successfully!");
        window.location.href = `${baseUrl}clinic-dashboard/userdata-update-ques?email=${email}`;
      } else if (response.status === 404) {
        alert("Try again later!");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    console.log("Hello");
    const data = JSON.parse(localStorage.getItem("data"));
    const searchParams = new URLSearchParams(location.search);
    const e = searchParams.get("email");
    console.log("Value is", data);
    if (e.length > 0 && data !== null) {
      if (data.email === e) {
        if (data.email) {
          if (data.email.length > 0) {
            updateEmail(data.email);
          }
        }
        if (data.state) {
          if (data.state.length > 0) {
            updateState(data.state);
            updateCities(cityStateData[data.state]);
          }
        }
        if (data.city) {
          if (data.city.length > 0) {
            updateCity(data.city);
          }
        }
        if (data.gender) {
          if (data.gender.length > 0) {
            updateGender(data.gender);
          }
        }
        if (data.dob) {
          if (data.dob.length > 0) {
            const d = data.dob.split("T");
            updateDob(d[0]);
          }
        }
        if (data.name) {
          if (data.name.length > 0) {
            updateName(data.name);
          }
        }
      } else {
        localStorage.removeItem("data");
        alert("Network Error! Please try again.");
        window.location.href = `${baseUrl}clinic-dashboard`;
      }
    } else if (e.length > 0) {
      updateEmail(e);
    } else {
      alert("Data Inconsistency! Try again later.");
      window.location.href = `${baseUrl}clinic-dashboard`;
    }
  }, []);

  return (
    <>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-xl-6 col-md-6 col-xs-12 offset-xl-3 offset-md-3">
          <input
            type="text"
            className="form form-control"
            placeholder="Patient Name"
            value={name}
            onChange={(e) => updateName(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div
          className="col-xl-3 col-md-3 col-xs-6 offset-xl-3 offset-md-3"
          style={{ marginTop: 10 }}
        >
          <select
            value={state}
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
          <select
            className="form form-control"
            placeholder="City"
            onChange={handleCityChange}
            value={city}
          >
            <option value="">Select City</option>
            {cities.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div
          className="col-xl-3 col-md-3 col-xs-6 offset-xl-3 offset-md-3"
          style={{ marginTop: 10 }}
        >
          <select
            className="form form-control"
            value={gender}
            onChange={(e) => updateGender(e.target.value)}
          >
            <option value="">Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="col-xl-3 col-md-3 col-xs-6" style={{ marginTop: 10 }}>
          <input
            type="date"
            className="form form-control"
            value={dob}
            onChange={(e) => updateDob(e.target.value)}
            pattern="\d{2}-\d{2}-\d{4}"
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
            }}
            onClick={() => updateUser()}
          >
            Update User Information
          </button>
        </div>
      </div>
    </>
  );
}

export default UserDataUpdate;
