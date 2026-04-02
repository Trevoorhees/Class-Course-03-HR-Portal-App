import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAllLeaveInfo.css";

function ViewAllLeaveInfo() {
  let [leaveInfo, setLeaveInfo] = useState([]);
  let [msg, setMsg] = useState("");
  let LEAVE_INFO_URL = "http://localhost:3000/leaveInformation";

  useEffect(() => {
    allLeaveDetails();
  }, [msg]);

  let allLeaveDetails = async () => {
    let allLeaveInfo = await axios.get(LEAVE_INFO_URL);
    let pendingLeaveInfo = allLeaveInfo.data.filter(
      (ll) => ll.status === "pending" || ll.status === "Pending",
    );
    setLeaveInfo(pendingLeaveInfo);
  };

  let changeStatus = async (ll, status) => {
    setMsg("");
    let updatedLeave = { ...ll, status };
    await axios.patch(LEAVE_INFO_URL + "/" + ll.id, updatedLeave);
    setMsg("✅ Leave status updated successfully");
  };

  return (
    <div className="leave-table-container">
      <div className="leave-table-card">
        <div className="leave-table-header">
          <p className="section-kicker">Approval Queue</p>
          <h2>Pending Leave Requests</h2>
          <p>Approve or reject employee leave requests that are still awaiting review.</p>
        </div>

        <table className="leave-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Reason</th>
              <th>Days</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaveInfo.length > 0 ? (
              leaveInfo.map((ll) => (
                <tr key={ll.id}>
                  <td>{ll.emailId}</td>
                  <td>{ll.reason}</td>
                  <td>{ll.numberOfDays}</td>
                  <td className="leave-action-cell">
                    <button className="approve-btn" onClick={() => changeStatus(ll, "Approved")}>
                      Approve
                    </button>

                    <button className="reject-btn" onClick={() => changeStatus(ll, "Denied")}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No pending leave requests
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {msg && <p className="message">{msg}</p>}
      </div>
    </div>
  );
}

export default ViewAllLeaveInfo;
