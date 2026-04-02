import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:3000';

const emptyEmployeeForm = {
  name: '',
  email: '',
  department: '',
  position: '',
  status: 'Active',
  joinDate: '',
  phone: '',
  address: '',
};

function HRDashboardPage() {
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [formData, setFormData] = useState(emptyEmployeeForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      const [employeeResponse, leaveResponse] = await Promise.all([
        fetch(`${API_URL}/employees`),
        fetch(`${API_URL}/leaveRequests`),
      ]);

      const employeeData = await employeeResponse.json();
      const leaveData = await leaveResponse.json();

      setEmployees(employeeData);
      setLeaveRequests(leaveData);
    } catch (error) {
      console.error('Dashboard load error:', error);
      setMessage('Could not load dashboard data. Start JSON Server and refresh.');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    const missingValue = Object.values(formData).some((value) => !String(value).trim());
    if (missingValue) {
      setMessage('Please complete every employee detail field.');
      return;
    }

    try {
      const endpoint = editingId ? `${API_URL}/employees/${editingId}` : `${API_URL}/employees`;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Employee save failed.');
      }

      setFormData(emptyEmployeeForm);
      setEditingId(null);
      setMessage(editingId ? 'Employee updated successfully.' : 'Employee added successfully.');
      loadDashboardData();
    } catch (error) {
      console.error('Employee save error:', error);
      setMessage('Could not save employee data.');
    }
  }

  function startEdit(employee) {
    setEditingId(employee.id);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      status: employee.status,
      joinDate: employee.joinDate,
      phone: employee.phone,
      address: employee.address,
    });
  }

  async function deleteEmployee(id) {
    try {
      await fetch(`${API_URL}/employees/${id}`, { method: 'DELETE' });
      setMessage('Employee deleted successfully.');
      loadDashboardData();
    } catch (error) {
      setMessage('Could not delete employee.');
      console.error('Delete employee error:', error);
    }
  }

  async function updateLeaveStatus(id, status) {
    try {
      const request = leaveRequests.find((item) => item.id === id);
      await fetch(`${API_URL}/leaveRequests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...request, status }),
      });
      setMessage(`Leave request marked as ${status}.`);
      loadDashboardData();
    } catch (error) {
      setMessage('Could not update leave request.');
    }
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const stats = useMemo(
    () => [
      { label: 'Total Employees', value: employees.length },
      { label: 'Pending Leave Requests', value: leaveRequests.filter((item) => item.status === 'Pending').length },
      { label: 'Active Employees', value: employees.filter((item) => item.status === 'Active').length },
    ],
    [employees, leaveRequests]
  );

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>HR Dashboard</h1>
          <p>Welcome, {currentUser?.name}. Manage employee records and review leave requests.</p>
        </div>
        <button className="ghost-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>

      {message ? <p className="status-text">{message}</p> : null}

      <div className="dashboard-grid">
        <SectionCard title={editingId ? 'Edit Employee' : 'Add New Employee'}>
          <form className="form-grid" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
            <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
            <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} />
            <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            <div className="button-row full-span">
              <button className="primary-btn" type="submit">{editingId ? 'Update Employee' : 'Add Employee'}</button>
              <button
                className="secondary-btn"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData(emptyEmployeeForm);
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Employee Directory">
          {loading ? (
            <p>Loading employees...</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.department}</td>
                      <td>{employee.position}</td>
                      <td>{employee.status}</td>
                      <td>
                        <div className="inline-actions">
                          <button className="mini-btn" onClick={() => startEdit(employee)}>Edit</button>
                          <button className="mini-btn danger-btn" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SectionCard>
      </div>

      <SectionCard title="Leave Requests">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Dates</th>
                <th>Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeName}</td>
                  <td>{request.startDate} to {request.endDate}</td>
                  <td>{request.type}</td>
                  <td>{request.reason}</td>
                  <td>{request.status}</td>
                  <td>
                    <div className="inline-actions">
                      <button className="mini-btn" onClick={() => updateLeaveStatus(request.id, 'Approved')}>Approve</button>
                      <button className="mini-btn danger-btn" onClick={() => updateLeaveStatus(request.id, 'Rejected')}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </section>
  );
}

export default HRDashboardPage;
