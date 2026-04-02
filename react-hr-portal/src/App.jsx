import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HrDashboard from "./components/HrDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import AddEmployee from "./components/AddEmployee";
import ViewAllEmployees from "./components/ViewAllEmployees";
import EmployeeView from "./components/EmployeeView";
import ViewAllLeaveInfo from "./components/ViewAllLeaveInfo";
import ApplyLeave from "./components/ApplyLeave";
import ViewLeaveStatus from "./components/ViewLeaveStatus";

function App() {
  return (
    <div className="app-shell">
      <div className="app-branding">
        <p className="app-kicker">Workforce Management</p>
        <h1>HR Portal</h1>
        <p className="app-subtitle">
          A streamlined employee and leave management experience with a clean,
          modern interface.
        </p>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />

        <Route path="hrHome" element={<HrDashboard />}>
          <Route path="addEmployee" element={<AddEmployee />} />
          <Route path="viewEmployees" element={<ViewAllEmployees />} />
          <Route path="viewEmployee/:employeeId" element={<EmployeeView />} />
          <Route path="viewAllLeaveInfo" element={<ViewAllLeaveInfo />} />
        </Route>

        <Route path="employeeHome" element={<EmployeeDashboard />}>
          <Route path="viewEmployee" element={<EmployeeView />} />
          <Route path="applyLeave" element={<ApplyLeave />} />
          <Route path="viewLeaveStatus" element={<ViewLeaveStatus />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
