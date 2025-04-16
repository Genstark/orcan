import React from "react";
// import Brush from "../../assets/brush.png";
// import Recycle from "../../assets/recycle.png";
// import Appointment from "../../assets/appointment.png";
function Services(props) {
  return (
    <div
      className="col-xl-4 mb-3"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="service-image-holder"
        style={{ backgroundColor: "#8EB0BA" }}
      >
        <img src={props.imgSrc} alt="" style={{ width: "50%" }} />
      </div>
      <div className="twentyfour black service-text-holder">
        <p
          className="p-t twentyeight"
          style={{ lineHeight: 1, color: "#488392" }}
        >
          {props.title}
        </p>
        <p className="m-m eighteen greyText">{props.description}</p>
        {/* <button
          style={{
            backgroundColor: "white",
            borderRadius: 5,
            borderWidth: 0,
            padding: "5px 13px",
          }}
          className="m-b twentyone brightblue"
        >
          LEARN MORE
        </button> */}
      </div>
    </div>
  );
}

export default Services;
