import React from "react";
import AboutImage from "../../assets/about.png";
import AboutBG from "../../assets/teeth-trans.png";
function About() {
  return (
    <div className="row reduce-70" style={{ minHeight: "100vh" }}>
      <div
        className="col-lg-6 remove-about"
        style={{
          backgroundImage: `url(${AboutImage})`,
          backgroundSize: "60%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="col-lg-6"
        style={{
          backgroundImage: `url(${AboutBG})`,
          backgroundSize: "70%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="d-flex flex-wrap align-items-end">
          <span className="p-t fifty black" style={{ lineHeight: 1.2 }}>
            About Us
          </span>
        </div>
        <br />
        <p
          className="m-m twentyeight black reduce-text"
          style={{ lineHeight: 1 }}
        >
          At Oracan, we're dedicated to revolutionizing the field of oral cancer
          prediction. We understand the profound impact that early detection can
          have on improving outcomes for individuals at risk of oral cancer.
          Through cutting-edge technology and a commitment to innovation, we've
          developed a user-friendly app designed to empower users to seek the
          right help they need, precisely when they need it.
        </p>
        <p
          className="m-m twentyeight black reduce-text"
          style={{ lineHeight: 1 }}
        >
          Our mission at Oracan is simple yet profound: to save lives by
          detecting oral cancer early. We believe that everyone deserves access
          to convenient, accurate, and timely health resources, especially when
          it comes to potentially life-threatening conditions like oral cancer.
        </p>
      </div>
    </div>
  );
}

export default About;
