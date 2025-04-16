import React, { useState } from "react";
// import Contact from "../../assets/contact.svg";
import Phone from "../../assets/phone.svg";
import Gps from "../../assets/location.svg";
import Email from "../../assets/email.svg";
import TickFilled from "../../assets/tick-filled.svg";
import Circle from "../../assets/circle.svg";
import Instagram from "../../assets/instagram.png";
import Youtube from "../../assets/twitter.png";
import X from "../../assets/youtube.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { instance } from "../../util";

function Contact() {
  const [Selected, updateSelected] = useState(1);
  const [fname, updateFname] = useState("");
  const [lname, updateLname] = useState("");
  const [email, updateEmail] = useState("");
  const [mobile, updateMobile] = useState("");
  const [subject, updateSubject] = useState("General Enquiry");
  const [message, updateMessage] = useState("");

  const submitForm = async () => {
    // Validation checks
    if (!fname) {
      alert("First name cannot be empty");
      return;
    }

    if (!lname) {
      alert("Last name cannot be empty");
      return;
    }

    if (!email) {
      alert("Email cannot be empty");
      return;
    } else if (!isValidEmail(email)) {
      alert("Invalid email format");
      return;
    }

    if (!mobile) {
      alert("Mobile number cannot be empty");
      return;
    } else if (!isValidMobile(mobile)) {
      alert("Invalid mobile number");
      return;
    }

    if (!subject) {
      alert("Subject cannot be empty");
      return;
    }

    if (!message) {
      alert("Message cannot be empty");
      return;
    }

    try {
      const response = await instance.post(`/contactUs`, {
        fname: fname,
        lname: lname,
        email: email,
        mobile: mobile,
        message: message,
        subject: subject,
      });

      if (response.status === 200) {
        alert("Form Submitted Successfully");
      }
    } catch (error) {
      if (error.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  // Function to check if email format is valid
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to check if mobile number is numeric
  const isValidMobile = (mobile) => {
    const mobileRegex = /^\d+$/;
    return mobileRegex.test(mobile);
  };

  const setSubject = (x) => {
    if (x === 1) {
      updateSubject("General Enquiry");
      updateSelected(1);
    } else if (x === 2) {
      updateSubject("About Platform");
      updateSelected(2);
    } else if (x === 3) {
      updateSubject("Greviances");
      updateSelected(3);
    }
  };
  return (
    <div className="row d-flex justify-content-center mt-5 mb-5">
      <div
        className="col-md-7 container-fluid rounded"
        style={{ borderWidth: 1, borderStyle: "solid" }}
      >
        <div className="row p-2">
          <div
            className="col-md-5 rounded pt-4"
            style={{ backgroundColor: "white", paddingRight: 0 }}
          >
            <div>
              <p
                className="p-t thirtytwo"
                style={{ lineHeight: 1, color: "black" }}
              >
                Contact Information
              </p>
              <p className="m-m greyText eighteen">
                Say something to start a live chat
              </p>
            </div>
            <div className="mt-5">
              <span
                className="m-m eighteen whiteColor"
                style={{ color: "black" }}
              >
                <img src={Phone} alt="ph" /> 9891353960, 9873393003, 9878362779
              </span>
              <br />
              <br />
              <span
                className="m-m eighteen whiteColor"
                style={{ color: "black" }}
              >
                <img src={Email} alt="em" />
                info.oracan@gmail.com
              </span>
              <br />
              <br />
              <span
                className="m-m eighteen whiteColor"
                style={{ color: "black" }}
              >
                <img src={Gps} alt="lo" />
                Sec-43, Faridabad, Haryana
              </span>
            </div>

            <br />
            <br />
            <div>
              <div className="d-flex justify-content-between">
                <div
                  className="d-flex justify-content-around align-items-center"
                  style={{
                    width: "70%",
                    maxWidth: 150,
                  }}
                >
                  <a href="#" target="_blank">
                    <img src={Instagram} alt="" style={{ width: 30 }} />
                  </a>
                  <a href="#" target="_blank">
                    <img src={X} alt="" style={{ width: 40 }} />
                  </a>
                  <a href="#" target="_blank">
                    <img src={Youtube} alt="" style={{ width: 30 }} />
                  </a>
                </div>
                <img src={Circle} alt="" style={{ width: "30%" }} />
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div>
              <TextField
                id="first"
                label="First Name"
                variant="standard"
                style={{ width: "48%" }}
                value={fname}
                onChange={(e) => updateFname(e.target.value)}
              />
              &nbsp;
              <TextField
                id="last"
                label="Last Name"
                variant="standard"
                style={{ width: "48%" }}
                value={lname}
                onChange={(e) => updateLname(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="email"
                label="Email"
                variant="standard"
                style={{ width: "48%" }}
                value={email}
                onChange={(e) => updateEmail(e.target.value)}
              />
              &nbsp;
              <TextField
                id="mobile"
                label="Mobile"
                variant="standard"
                style={{ width: "48%" }}
                value={mobile}
                onChange={(e) => updateMobile(e.target.value)}
              />
            </div>
            <p className="m-m eighteen black pt-4">Select Subject</p>
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex align-items-center">
                <button
                  className="checkbox-container"
                  onClick={() => setSubject(1)}
                >
                  {Selected === 1 ? (
                    <div className="checkbox-filled"></div>
                  ) : (
                    <></>
                  )}
                </button>
                &nbsp;General Enquiry&nbsp;&nbsp;
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="checkbox-container"
                  onClick={() => setSubject(2)}
                >
                  {Selected === 2 ? (
                    <div className="checkbox-filled"></div>
                  ) : (
                    <></>
                  )}
                </button>
                &nbsp;About Platform&nbsp;&nbsp;
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="checkbox-container"
                  onClick={() => setSubject(3)}
                >
                  {Selected === 3 ? (
                    <div className="checkbox-filled"></div>
                  ) : (
                    <></>
                  )}
                </button>
                &nbsp;Greviances&nbsp;&nbsp;
              </div>
            </div>

            <br />
            <TextField
              id="mobile"
              label="Message"
              variant="standard"
              style={{ width: "100%" }}
              value={message}
              onChange={(e) => updateMessage(e.target.value)}
            />
            <br />
            <br />
            <div className="d-flex justify-content-end">
              <Button
                variant="contained"
                style={{ backgroundColor: "#488092" }}
                onClick={() => submitForm()}
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
