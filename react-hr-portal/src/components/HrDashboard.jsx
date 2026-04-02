import { Link, Outlet, useNavigate } from "react-router-dom";
import "./HrDashboard.css";

function HrDashboard() {
  let navigate = useNavigate();

  let logout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <p className="section-kicker">Administration</p>
          <h2>HR Dashboard</h2>
          <p className="dashboard-copy">
            Manage employee records, view company staff, and process pending leave requests.
          </p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-nav">
        <Link to="addEmployee">Add Employee</Link>
        <Link to="viewEmployees">View Employees</Link>
        <Link to="viewAllLeaveInfo">Leave Info</Link>
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default HrDashboard;
