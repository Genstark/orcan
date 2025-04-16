import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl, instance } from "../../util";

function Question() {
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [type, settype] = useState("");
  const [imageData, updateImageData] = useState("");
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/2313/2313181.png"
  );
  const [imageTrue, setimageTrue] = useState(false);
  const [email, updateEmail] = useState("");

  const randomSelection = () => {
    const arr = ["Arch", "Ulnar Loop", "Whorl", "Compound", "Radial"];
    const randomIndex = Math.floor(Math.random() * arr.length);
    settype(arr[randomIndex]);
  };

  const appendImage = async (e) => {
    updateImageData(e.target.files[0]);
    const file = e.target.files[0];
    randomSelection();
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOptionChange = (question, option) => {
    setAnswers({
      ...answers,
      [question]: option,
    });
    setSelectedOptions({
      ...selectedOptions,
      [question]: option === "Yes" ? {} : null,
    });
  };
  const handleSubOptionChange = (question, subQuestion, subOption) => {
    setSelectedOptions({
      ...selectedOptions,
      [question]: {
        ...selectedOptions[question],
        [subQuestion]: subOption,
      },
    });
  };
  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((q) => {
      if (q.options.length === 0) {
        // totalScore += answers[q.question] === "Yes" ? 5 : 0;
        if (
          answers[q.question] === "Yes" &&
          q.question === "Any positive family history of cancer?"
        ) {
          totalScore += 5;
        } else {
          totalScore += 0;
        }
        if (
          answers[q.question] === "Yes" &&
          q.question === "Presence of ULCER in mouth more than 2 weeks?"
        ) {
          totalScore += 1;
        } else {
          totalScore += 0;
        }
        if (
          answers[q.question] === "Yes" &&
          q.question === "Any white patches in mouth?"
        ) {
          totalScore += 2;
        } else {
          totalScore += 0;
        }
        if (
          answers[q.question] === "Yes" &&
          q.question === "Any red patches in mouth?"
        ) {
          totalScore += 4;
        } else {
          totalScore += 0;
        }
        if (
          answers[q.question] === "Yes" &&
          q.question === "Ever screened for oral cancer by dental practitioner?"
        ) {
          totalScore += 1;
        } else {
          totalScore += 0;
        }
      } else if (answers[q.question] === "Yes") {
        q.options.forEach((option) => {
          const selectedSubOption =
            selectedOptions[q.question][option.subQuestion];
          if (selectedSubOption) {
            const selectedOptionScore = option.subOptions.find(
              (subOption) => subOption.text === selectedSubOption
            ).score;
            totalScore += selectedOptionScore;
          }
        });
      }
    });
    return totalScore;
  };

  // function Capture() {
  //   try {
  //     document.getElementById("imgFinger").src = "data:image/bmp;base64,";

  //     var res = window.CaptureFinger(70, 10);
  //     if (res.httpStaus) {
  //       console.log(1);
  //       if (res.data.ErrorCode == "0") {
  //         console.log(2);
  //         setimageTrue(true);
  //         document.getElementById("imgFinger").src =
  //           "data:image/bmp;base64," + res.data.BitmapData;
  //         randomSelection();
  //       } else {
  //         console.log(3);
  //       }
  //     } else {
  //       console.log(4);
  //       setimageTrue(false);
  //       document.getElementById("imgFinger").src =
  //         "https://cdn-icons-png.flaticon.com/512/2313/2313181.png";
  //       alert(res.err);
  //     }
  //   } catch (e) {
  //     console.log(5);

  //     alert(e);
  //   }
  //   return false;
  // }

  const convertBase64ToBlob = async (base64Image) => {
    const response = await fetch(base64Image);
    const blob = await response.blob();
    return blob;
  };

  function createImage(newImageUrl) {
    var img = new Image();
    // img.src = imageUrl;
    img.src = newImageUrl;
    img.crossOrigin = "anonymous";
    // if (imageTrue == false) {
    //   alert("Please submit finger print");
    //   return;
    // }
    console.log("image is", img.src);
    img.onload = async function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Get the canvas context and draw the image onto the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      console.log(canvas);
      // Convert the canvas to a PNG image data URL
      var pngImageData = canvas.toDataURL("image/png");

      const blob = await convertBase64ToBlob(pngImageData);
      console.log("blob data is: ", blob);
      updateImageData(blob);
    };
  }

  function Capture() {
    try {
      // Clear the previous image
      setImageUrl("");

      var res = window.CaptureFinger(70, 10);
      if (res.httpStaus) {
        console.log("If 1");
        // alert("Error: 1");
        if (res.data.ErrorCode === "0") {
          console.log("If 2");
          // alert("Error: 2");
          // setimageTrue(true);
          // Update the image URL with the captured thumbprint
          const newImageUrl = "data:image/bmp;base64," + res.data.BitmapData;
          console.log("New Image Url ", newImageUrl);
          setImageUrl(newImageUrl);
          createImage(newImageUrl);
          randomSelection();
        } else {
          if (res.data.ErrorCode === "-1140") {
            alert("Timeout! Refresh the page or reconnect biometric.");
          }
          if (res.data.ErrorCode === "-1135") {
            alert("Unsupported Format! Reconnect biometric and refresh page.");
          }
          if (res.data.ErrorCode === "-1321") {
            alert(
              "Already running biometric! Reconnect biometric and refresh page."
            );
          }
        }
      } else {
        console.log("Error: 2");
        alert("Error: 2");
        setimageTrue(false);
        // Reset image URL to default if capturing fails
        setImageUrl("https://cdn-icons-png.flaticon.com/512/2313/2313181.png");
        alert(res.err);
      }
    } catch (e) {
      console.log("Error: 3");
      alert("Error: 3");
      console.log(5);
      alert(e);
    }
    return false;
  }

  const handleSelection = (e) => {
    const selected = e.target.value;
    settype(selected);
  };

  const submit = async () => {
    // console.log("total before biometric:", calculateScore());
    let t = 0;
    t += calculateScore();
    if (type !== "") {
      if (type === "Arch" || type === "Ulnar Loop") {
        t += 5;
      } else if (type === "Whorl") {
        t += 3;
      } else if (type === "Compound" || type === "Radial") {
        t += 0;
      }
      console.log("Biometric Type: ", type);
      console.log("Total after Biometric Type", t);

      const formData = new FormData();

      const ans = Object.entries(answers).map(([key, value]) => {
        return { [key]: value };
      });
      let qna = JSON.stringify(ans);
      formData.append("image", imageData);
      formData.append("type", type);
      formData.append("total", t);
      formData.append("email", email);
      formData.append("qna", qna);
      formData.append("clinicEmail", localStorage.getItem("clinicEmail"));
      const response = await instance.post("/formData", formData, {
        header: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert(response.data.message);
        localStorage.removeItem("data");
        window.location.href = `${baseUrl}clinic-dashboard/userdata-profile?email=${email}`;
      }
    } else {
      alert("Please select a biometric type before submitting");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const e = searchParams.get("email");
    if (e.length > 0) {
      updateEmail(e);
    }
  }, []);

  return (
    <>
      {/* <h6>{imageUrl}</h6> */}
      {questions.map((q, index) => (
        <div className="row" key={index}>
          <div
            className="col-xl-6 col-md-6 offset-xl-3 offset-md-3"
            style={{
              backgroundColor: "rgba(72,128,146,0.7)",
              marginTop: 12,
              padding: 26,
              borderRadius: 7,
            }}
          >
            <div key={index}>
              <p style={{ color: "black" }}>{q.question}</p>
              <div>
                <p style={{ color: "black" }}>
                  <label>
                    <input
                      type="radio"
                      value="Yes"
                      checked={answers[q.question] === "Yes"}
                      onChange={() => handleOptionChange(q.question, "Yes")}
                    />
                    &nbsp; Yes
                  </label>
                </p>
                <p style={{ color: "black" }}>
                  <label>
                    <input
                      type="radio"
                      value="No"
                      checked={answers[q.question] === "No"}
                      onChange={() => handleOptionChange(q.question, "No")}
                    />
                    &nbsp; No
                  </label>
                </p>
              </div>
              {answers[q.question] === "Yes" && (
                <div>
                  {q.options.map((option, idx) => (
                    <div key={idx}>
                      <p style={{ color: "black" }}>{option.subQuestion}</p>
                      {option.subOptions.map((subOption, subIdx) => (
                        <p key={subIdx} style={{ color: "black" }}>
                          <label>
                            <input
                              type="radio"
                              value={subOption.text}
                              checked={
                                selectedOptions[q.question] &&
                                selectedOptions[q.question][
                                  option.subQuestion
                                ] === subOption.text
                              }
                              onChange={() =>
                                handleSubOptionChange(
                                  q.question,
                                  option.subQuestion,
                                  subOption.text
                                )
                              }
                            />
                            &nbsp; {subOption.text}
                          </label>
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="row">
        <div
          className="col-xl-6 col-md-6 offset-xl-3 offset-md-3"
          style={{
            backgroundColor: "rgba(72,128,146,0.7)",
            marginTop: 12,
            padding: 26,
            borderRadius: 7,
          }}
        >
          <p style={{ color: "black" }}>Upload Biometric Thumb Print</p>
          <button
            className="btn"
            style={{ backgroundColor: "#488092", color: "white" }}
            onClick={() => {
              Capture();
            }}
          >
            Capture
          </button>
          {/* <p style={{ color: "black" }}>Total Score: {calculateScore()}</p> */}
          <img
            id="imgFinger"
            src={imageUrl}
            style={{ width: "200px", margin: "auto", display: "block" }}
            alt="Uploaded Image"
          />

          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="mt-4"
          >
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={appendImage}
            />
          </div>
          <select
            className="form-control"
            style={{ marginTop: 12 }}
            onChange={handleSelection}
            value={type}
            placeholder="Select Biometric Type"
          >
            <option value="">Select Biometric Type</option>
            <option value="Arch">Arch</option>
            <option value="Ulnar Loop">Ulnar Loop</option>
            <option value="Whorl">Whorl</option>
            <option value="Compound">Compound</option>
            <option value="Radial">Radial</option>
          </select>
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
            onClick={() => submit()}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
const questions = [
  {
    question: "Do you smoke?",
    options: [
      {
        subQuestion: "Frequency?",
        subOptions: [
          { text: "One-two cigarette per day", score: 1 },
          { text: "Three-four cigarette per day", score: 3 },
          { text: "More than one packet", score: 5 },
        ],
      },
      {
        subQuestion: "Duration?",
        subOptions: [
          { text: "Less than one year", score: 1 },
          { text: "From 2-4 years", score: 3 },
          { text: "More than 5 years", score: 5 },
        ],
      },
    ],
  },
  {
    question: "Do you consume alcohol?",
    options: [
      {
        subQuestion: "Frequency?",
        subOptions: [
          { text: "One-two glass per day", score: 1 },
          { text: "Three-four glass per day", score: 2 },
          { text: "One complete bottle", score: 5 },
        ],
      },
      {
        subQuestion: "Duration?",
        subOptions: [
          { text: "Less than one year", score: 1 },
          { text: "From 2-4 years", score: 3 },
          { text: "More than 5 years", score: 5 },
        ],
      },
    ],
  },
  {
    question: "Any positive family history of cancer?",
    options: [],
  },
  {
    question: "Do you chew tobaco in any form?",
    options: [
      {
        subQuestion: "Frequency?",
        subOptions: [
          { text: "One-two times a day", score: 1 },
          { text: "Three-four times a day", score: 3 },
          { text: "More than 5 times a day", score: 5 },
        ],
      },
      {
        subQuestion: "Duration?",
        subOptions: [
          { text: "Less than one year", score: 1 },
          { text: "From 2-4 years", score: 3 },
          { text: "More than 5 years", score: 5 },
        ],
      },
    ],
  },
  {
    question: "Presence of ULCER in mouth more than 2 weeks?",
    options: [],
  },
  {
    question: "Any white patches in mouth?",
    options: [],
  },
  {
    question: "Any red patches in mouth?",
    options: [],
  },
  {
    question: "Ever screened for oral cancer by dental practitioner?",
    options: [],
  },
];
export default Question;
