import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { instance, baseUrl } from "../../util";

function UserDataProfile() {
  const location = useLocation();

  const [data, updateData] = useState();

  const call = async () => {
    const searchParams = new URLSearchParams(location.search);
    const e = searchParams.get("email");
    if (e !== undefined && e !== null) {
      try {
        const response = await instance.post(`/fetchUser`, {
          email: e,
        });
        if (response.status === 200) {
          updateData(response.data);
          console.log(response.data);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("Try Again Later!");
      window.location.href = `${baseUrl}clinic-dashboard`;
    }
  };
  useEffect(() => {
    console.log("Hello");
    call();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="row"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          className="col-xl-1 col-md-1 m-3"
          style={{
            borderRadius: "50%",
            aspectRatio: 1,
            backgroundColor: "#ccc",
            backgroundImage: `url(${data?.response?.biometric?.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="col-xl-7 col-md-7">
          <p style={{ color: "black" }}>
            {data?.response?.name !== null ? data?.response?.name : `User Name`}
          </p>
          <p style={{ color: "black" }}>
            {data?.response?.email !== null
              ? data?.response?.email
              : `User Email`}
          </p>
        </div>
      </div>
      <div className="row" style={{ display: "flex", flexDirection: "row" }}>
        <div className="col-xl-8 col-md-8">
          <p
            style={{
              backgroundColor: "#488092",
              display: "inline-block",
              padding: "8px 16px",
              margin: 5,
              borderRadius: 5,
            }}
          >
            Evaluated Score:{" "}
            {data?.response?.questionnaire?.total !== null
              ? data?.response?.questionnaire?.total
              : "Unavailable"}
          </p>
          <p
            style={{
              backgroundColor: "#488092",
              display: "inline-block",
              padding: "8px 16px",
              margin: 5,
              borderRadius: 5,
            }}
          >
            Evaluation Percentage:{" "}
            {data?.response?.questionnaire?.percentage !== null
              ? Math.floor(data?.response?.questionnaire?.percentage)
              : `Unavailable`}
            %
          </p>
          <p
            style={{
              backgroundColor: "#488092",
              display: "inline-block",
              padding: "8px 16px",
              margin: 5,
              borderRadius: 5,
            }}
          >
            Biometric Type:{" "}
            {data?.response?.biometric?.type !== null
              ? data?.response?.biometric?.type
              : `Unavailable`}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8 col-md-8">
          <p
            style={{
              color: "black",
              marginTop: 12,
              fontFamily: "roboto",
              textAlign: "justify",
            }}
          >
            {data?.response?.questionnaire?.percentage >= 70
              ? "If the risk of oral cancer is determined to be very high, it is imperative to take immediate action. Individuals falling into this category should seek urgent medical attention and comprehensive screening for early detection and intervention. Lifestyle changes, including cessation of tobacco use and reducing alcohol consumption, are critical. Additionally, regular visits to healthcare professionals specializing in oral health are essential for ongoing monitoring and preventive measures."
              : data?.response?.questionnaire?.percentage < 70 &&
                data?.response?.questionnaire?.percentage >= 50
              ? "A diagnosis of high risk for oral cancer necessitates proactive measures to mitigate potential health risks. Close monitoring by healthcare professionals specializing in oral health is vital, along with regular screenings for early detection. Lifestyle modifications, such as reducing tobacco and alcohol intake, can significantly reduce the risk. Moreover, adopting a balanced diet rich in fruits and vegetables can bolster the body's immune response and promote oral health."
              : data?.response?.questionnaire?.percentage < 50 &&
                data?.response?.questionnaire?.percentage >= 30
              ? "Individuals categorized as having a moderate risk of oral cancer should prioritize regular oral health check-ups and screenings. While the risk level is not as severe as higher categories, it is essential to remain vigilant and proactive. Adopting a healthy lifestyle, including avoiding tobacco products and limiting alcohol consumption, can help mitigate the risk. Education about the signs and symptoms of oral cancer is crucial for early detection and prompt intervention if any abnormalities arise."
              : "A diagnosis of low risk for oral cancer provides some reassurance, but it's essential to maintain good oral hygiene practices and attend regular dental check-ups. Although the risk level is comparatively lower, it's still crucial to avoid tobacco products entirely and consume alcohol in moderation. Engaging in a healthy lifestyle, including a balanced diet and regular exercise, can further reduce the risk. However, individuals should remain vigilant and promptly report any concerning symptoms or changes in oral health to their healthcare providers for further evaluation."}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-8 col-md-8">
          <button
            className="btn"
            style={{ backgroundColor: "#488092", color: "white" }}
            onClick={() => {
              window.location.href = `${baseUrl}clinic-dashboard`;
            }}
          >
            Mark as Completed
          </button>
          &nbsp; &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              window.location.href = `${baseUrl}clinic-dashboard/userdata-update?email=${
                data?.response?.email || `email`
              }`;
            }}
          >
            Re-evaluate
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDataProfile;
