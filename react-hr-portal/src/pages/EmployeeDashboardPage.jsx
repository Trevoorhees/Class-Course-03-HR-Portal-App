import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:3001';

function EmployeeDashboardPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [employeeProfile, setEmployeeProfile] = useState(null);
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  const [leaveForm, setLeaveForm] = useState({
    startDate: '',
    endDate: '',
    type: 'Annual Leave',
    reason: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      loadEmployeeData();
    }
  }, [currentUser]);

  async function loadEmployeeData() {
    try {
      const [employeeResponse, leaveResponse] = await Promise.all([
        fetch(`${API_URL}/employees?email=${encodeURIComponent(currentUser.email)}`),
        fetch(`${API_URL}/leaveRequests?employeeEmail=${encodeURIComponent(currentUser.email)}`),
      ]);

      const employeeData = await employeeResponse.json();
      const leaveData = await leaveResponse.json();
      setEmployeeProfile(employeeData[0] || null);
      setEmployeeLeaves(leaveData);
    } catch (error) {
      setMessage('Could not load employee dashboard data.');
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setLeaveForm((current) => ({ ...current, [name]: value }));
  }

  async function handleLeaveSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason.trim()) {
      setMessage('Please complete the leave request form.');
      return;
    }

    try {
      await fetch(`${API_URL}/leaveRequests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeName: currentUser.name,
          employeeEmail: currentUser.email,
          startDate: leaveForm.startDate,
          endDate: leaveForm.endDate,
          type: leaveForm.type,
          reason: leaveForm.reason,
          status: 'Pending',
        }),
      });

      setLeaveForm({
        startDate: '',
        endDate: '',
        type: 'Annual Leave',
        reason: '',
      });

      setMessage('Leave request submitted successfully.');
      loadEmployeeData();
    } catch (error) {
      setMessage('Could not submit leave request.');
    }
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const leaveSummary = useMemo(
    () => ({
      total: employeeLeaves.length,
      pending: employeeLeaves.filter((item) => item.status === 'Pending').length,
      approved: employeeLeaves.filter((item) => item.status === 'Approved').length,
    }),
    [employeeLeaves]
  );

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Employee Dashboard</h1>
          <p>Welcome, {currentUser?.name}. View your profile and submit leave requests.</p>
        </div>
        <button className="ghost-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><span>Total Requests</span><strong>{leaveSummary.total}</strong></div>
        <div className="stat-card"><span>Pending</span><strong>{leaveSummary.pending}</strong></div>
        <div className="stat-card"><span>Approved</span><strong>{leaveSummary.approved}</strong></div>
      </div>

      {message ? <p className="status-text">{message}</p> : null}

      <div className="dashboard-grid">
        <SectionCard title="My Profile">
          {employeeProfile ? (
            <div className="profile-grid">
              <p><strong>Name:</strong> {employeeProfile.name}</p>
              <p><strong>Email:</strong> {employeeProfile.email}</p>
              <p><strong>Department:</strong> {employeeProfile.department}</p>
              <p><strong>Position:</strong> {employeeProfile.position}</p>
              <p><strong>Status:</strong> {employeeProfile.status}</p>
              <p><strong>Join Date:</strong> {employeeProfile.joinDate}</p>
              <p><strong>Phone:</strong> {employeeProfile.phone}</p>
              <p><strong>Address:</strong> {employeeProfile.address}</p>
            </div>
          ) : (
            <p>No employee profile was found for this account yet.</p>
          )}
        </SectionCard>

        <SectionCard title="Submit Leave Request">
          <form className="form-grid" onSubmit={handleLeaveSubmit}>
            <input type="date" name="startDate" value={leaveForm.startDate} onChange={handleChange} />
            <input type="date" name="endDate" value={leaveForm.endDate} onChange={handleChange} />
            <select name="type" value={leaveForm.type} onChange={handleChange}>
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Emergency Leave</option>
              <option>Work From Home</option>
            </select>
            <textarea
              name="reason"
              rows="5"
              placeholder="Reason for leave"
              value={leaveForm.reason}
              onChange={handleChange}
            />
            <button className="primary-btn" type="submit">Submit Request</button>
          </form>
        </SectionCard>
      </div>

      <SectionCard title="My Leave Requests">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Type</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employeeLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.type}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </section>
  );
}

export default EmployeeDashboardPage;
