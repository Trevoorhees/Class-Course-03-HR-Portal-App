import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  let [emailId, setEmailId] = useState("");
  let [password, setPassword] = useState("");
  let [typeOfUser, setTypeOfUser] = useState("");
  let [msg, setMsg] = useState("");
  let LOGIN_URL = "http://localhost:3000/logins";
  let navigate = useNavigate();

  let signIn = async (event) => {
    setMsg("");
    event.preventDefault();

    if (emailId.length === 0 || password.length === 0 || typeOfUser.length === 0) {
      setMsg("All fields are required");
      return;
    }

    let login = { emailId, password, typeOfUser };
    let loginDb = await axios.get(LOGIN_URL);

    let result = loginDb.data.find(
      (ll) =>
        ll.emailId === login.emailId &&
        ll.password === login.password &&
        ll.typeOfUser === login.typeOfUser,
    );

    if (result === undefined) {
      setMsg("Invalid Email Id, Password or Type of User");
    } else {
      if (login.typeOfUser === "hr") {
        alert("HR logged in successfully");
        navigate("/hrHome");
      } else if (login.typeOfUser === "employee") {
        sessionStorage.setItem("emailId", login.emailId);
        alert("Employee logged in successfully");
        navigate("/employeeHome");
      }
    }

    setEmailId("");
    setPassword("");
    setTypeOfUser("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-header">
          <p className="section-kicker">Secure Access</p>
          <h2 className="login-title">Sign in to your portal</h2>
          <p className="login-subtitle">
            Access employee records, leave details, and dashboard tools from one streamlined workspace.
          </p>
        </div>

        <form onSubmit={signIn} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label>User Type</label>
            <div className="radio-group">
              <label className={`radio-option ${typeOfUser === "hr" ? "active" : ""}`}>
                <input
                  type="radio"
                  value="hr"
                  name="typeOfUser"
                  checked={typeOfUser === "hr"}
                  onChange={(e) => setTypeOfUser(e.target.value)}
                />
                <span>HR</span>
              </label>

              <label
                className={`radio-option ${typeOfUser === "employee" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  value="employee"
                  name="typeOfUser"
                  checked={typeOfUser === "employee"}
                  onChange={(e) => setTypeOfUser(e.target.value)}
                />
                <span>Employee</span>
              </label>
            </div>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don&apos;t have an account? <Link to="/signUp">Sign Up</Link>
        </p>

        {msg && <p className="error-msg">{msg}</p>}
      </div>
    </div>
  );
}

export default Login;
