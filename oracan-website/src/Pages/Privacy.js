import React from "react";
import "./component/style.css";
function Privacy() {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#8eb1bc" }}>
      <div className="row privacy-heading">
        <div
          className="col-md-6 offset-md-3 pt-5 pb-3"
          style={{ backgroundColor: "#488092" }}
        >
          <p style={{ fontSize: 36, color: "white" }}>Privacy Policy</p>
        </div>
      </div>
      <div className="row">
        <div
          className="col-md-6 offset-md-3 pl-5 pr-5 pb-5"
          style={{ backgroundColor: "#488092" }}
        >
          <p style={{ fontSize: 12 }}></p>
          <p style={{ fontSize: 20 }}>Information We Collect</p>
          <p style={{ fontSize: 12 }}>
            We may collect the following personal information from you:
          </p>
          <ul style={{ fontSize: 12, color: "white" }}>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Address</li>
            <li>Date of birth</li>
            <li>Gender</li>
            <li>Dental insurance information</li>
            <li>Medical history</li>
            <li>Prescription information</li>
            <li>Allergies</li>
            <li>Home address (for dental plastic recycling)</li>
          </ul>

          <p style={{ fontSize: 20 }}>How We Use Your Information</p>
          <p style={{ fontSize: 12 }}>
            We use your personal information to provide you with the following
            services:
          </p>
          <ul style={{ fontSize: 12, color: "white" }}>
            <li>Allow you to register for an account</li>
            <li>Allow you to book appointments with doctors</li>
            <li>Process your subscription fee payments</li>
            <li>Send you reminders for appointments</li>
            <li>Allow you to chat with doctors</li>
            <li>Provide you with prescriptions</li>
            <li>Recycle dental plastic</li>
          </ul>

          <p style={{ fontSize: 20 }}>How We Disclose Your Information</p>
          <p style={{ fontSize: 12 }}>
            We may disclose your personal information to the following third
            parties:
          </p>
          <ul style={{ fontSize: 12, color: "white" }}>
            <li>Doctors who provide you with services through the App</li>
            <li>Razorpay, our payment processor</li>
            <li>Third-party service providers who help us operate the App</li>
          </ul>

          <p style={{ fontSize: 12 }}>
            We will not sell your personal information to any third parties.
          </p>
          <p style={{ fontSize: 20 }}>Your Choices</p>
          <p style={{ fontSize: 12 }}>
            You have the following choices regarding your personal information:
          </p>
          <ul style={{ fontSize: 12, color: "white" }}>
            <li>
              You can choose to not provide us with any personal information.
              However, this may prevent you from using some of the features of
              the App.
            </li>
            <li>
              You can access and update your personal information at any time by
              logging into your account.
            </li>
            <li>
              You can request that we delete your personal information by
              contacting us at info.oracan@gmail.com
            </li>
          </ul>

          <p style={{ fontSize: 20 }}>Data Security</p>
          <p style={{ fontSize: 12 }}>
            We take reasonable measures to protect your personal information
            from unauthorised access, use, or disclosure. However, no method of
            data security is 100% secure.
          </p>
          <p style={{ fontSize: 20 }}>Changes to This Privacy Policy</p>
          <p style={{ fontSize: 12 }}>
            We may update this privacy policy from time to time. If we make any
            changes, we will post the updated privacy policy on the App.
          </p>
          <p style={{ fontSize: 20 }}>Contact Us</p>
          <p style={{ fontSize: 12 }}>
            If you have any questions about this privacy policy, please contact
            us at info.oracan@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
