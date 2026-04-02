import axios from "axios";
import { useState } from "react";
import "./ApplyLeave.css";

function ApplyLeave() {
  let [reason, setReason] = useState("");
  let [numberOfDays, setNumberOfDays] = useState("");
  let [status] = useState("Pending");
  let [msg, setMsg] = useState("");

  let LEAVE_INFO_URL = "http://localhost:3000/leaveInformation";
  let emailId = sessionStorage.getItem("emailId");

  let applyLeaveDetails = async (event) => {
    event.preventDefault();
    setMsg("");

    if (reason === "" || numberOfDays === "") {
      setMsg("❌ All fields are required");
      return;
    }

    let newLeaveInfo = { reason, numberOfDays, status, emailId };
    await axios.post(LEAVE_INFO_URL, newLeaveInfo);
    setMsg("✅ Leave applied successfully");
    setReason("");
    setNumberOfDays("");
  };

  return (
    <div className="leave-container">
      <div className="leave-card">
        <div className="leave-header">
          <p className="section-kicker">Leave Management</p>
          <h2>Apply Leave</h2>
          <p>Submit your leave request with a reason and number of requested days.</p>
        </div>

        <form onSubmit={applyLeaveDetails}>
          <div className="form-group">
            <label>Reason</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
            />
          </div>

          <div className="form-group">
            <label>Number of Days</label>
            <input
              type="number"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(e.target.value)}
              placeholder="Enter number of days"
            />
          </div>

          <button type="submit" className="apply-btn">
            Apply Leave
          </button>
        </form>

        {msg && <p className="message">{msg}</p>}
      </div>
    </div>
  );
}

export default ApplyLeave;
