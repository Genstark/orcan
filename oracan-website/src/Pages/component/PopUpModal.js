import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { instance } from "../../util";

function PopUpModal({
  show,
  setShow,
  heading,
  body,
  otp,
  updateOtp,
  email,
  updateClinicName,
  updateEmail,
  updateContactNumber,
  updateAddress,
  setSelectedState,
  setCities,
}) {
  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const verifyOtp = async () => {
    try {
      const response = await instance.post("/verifyOtp", {
        otp: otp,
        clinicEmail: email,
      });
      console.log(response);
      if (response.data.verified) {
        setShow(false);
        updateClinicName("");
        updateEmail("");
        updateContactNumber("");
        updateAddress("");
        updateOtp("");
        setSelectedState("");
        setCities([]);
        alert("Clinic Verified Successfully");
      } else {
        updateOtp("");
        alert("OTP Incorrect! Please re-check and submit");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setShow(false);
        console.log(error);
        updateOtp("");
        alert(error.response.data.message);
      }
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
        <input
          type="text"
          className="form form-control"
          placeholder="OTP"
          value={otp}
          onChange={(e) => updateOtp(e.target.value)}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => verifyOtp()}
          style={{ backgroundColor: "#488092", border: 0 }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUpModal;
