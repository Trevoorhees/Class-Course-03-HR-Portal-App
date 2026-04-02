import axios from "axios";
import { useEffect, useState } from "react";
import "./ViewAllEmployees.css";

function ViewAllEmployees() {
  let [employees, setEmployees] = useState([]);
  let EMPLOYEE_URL = "http://localhost:3000/employees";

  useEffect(() => {
    viewEmployees();
  }, []);

  let viewEmployees = async () => {
    let allEmployees = await axios.get(EMPLOYEE_URL);
    setEmployees(allEmployees.data);
  };

  return (
    <div className="table-container">
      <div className="table-card">
        <div className="table-header">
          <p className="section-kicker">Directory Overview</p>
          <h2>All Employees</h2>
          <p>Review all registered employees and their assigned departments.</p>
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Email Id</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.emailId}</td>
                  <td>{employee.department}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-data">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAllEmployees;
