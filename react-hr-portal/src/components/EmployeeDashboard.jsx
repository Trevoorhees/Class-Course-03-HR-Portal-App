import { Link, Outlet, useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  let emailId = sessionStorage.getItem("emailId");
  let navigate = useNavigate();

  let logout = () => {
    sessionStorage.removeItem("emailId");
    navigate("/");
  };

  return (
    <div className="emp-dashboard-container">
      <div className="emp-header">
        <div>
          <p className="section-kicker">Employee Workspace</p>
          <h2>Employee Dashboard</h2>
          <p className="emp-header-copy">
            Review your profile, submit leave requests, and track approval status in one place.
          </p>
        </div>

        <button className="emp-logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="emp-welcome">
        <h3>Welcome back</h3>
        <p>{emailId || "Employee"}</p>
      </div>

      <div className="emp-nav">
        <Link to="viewEmployee">Profile</Link>
        <Link to="applyLeave">Apply Leave</Link>
        <Link to="viewLeaveStatus">Leave Status</Link>
      </div>

      <div className="emp-content">
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
