import React from "react";
import Tick from "../../assets/tick.svg";

function Plan() {
  const plan = [
    {
      "1 Month": [],
      Price: "₹500/-",
    },
    {
      "3 Month": [],
      Price: "₹1,000/-",
    },
    {
      "6 Month": [],
      Price: "₹1,200/-",
    },
  ];
  return (
    <>
      <p
        className="p-t sixtyfour brightblue pt-5"
        style={{ textAlign: "center" }}
      >
        Explore Plans
      </p>
      <div className="row d-flex justify-content-center align-items-end pt-4">
        {plan.map((item, index) => (
          <div
            key={index}
            className="col-xl-2 col-lg-2 brightblue"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: 5,
              padding: 15,
              margin: 20,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: index === 1 ? "#0d96f6" : "white",
            }}
          >
            <center>
              <button
                className="p-t twentyfour brightblue"
                style={{
                  borderRadius: 5,
                  border: 0,
                  maxWidth: 200,
                  width: "100%",
                }}
              >
                {Object.keys(item)[0]}
              </button>
            </center>
            <p
              className={`p-t fifty ${
                index === 1 ? "whiteColor" : "brightblue"
              }`}
              style={{ lineHeight: 1.2, textAlign: "center", marginTop: 36 }}
            >
              {item.Price}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item[Object.keys(item)[0]].map((feature, featureIndex) => (
                <div className="d-flex align-items-center" key={featureIndex}>
                  <img src={Tick} alt="" />
                  &nbsp;
                  <span
                    className={`${index === 1 ? "whiteColor" : "brightblue"}`}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Plan;
