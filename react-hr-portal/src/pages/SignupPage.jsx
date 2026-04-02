import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    phone: '',
    address: '',
    position: '',
  });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'department', 'phone', 'address', 'position'];
    const missingField = requiredFields.find((field) => !formData[field].trim());

    if (missingField) {
      setMessage('Please complete all registration fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      setSaving(true);
      const usersResponse = await fetch(`${API_URL}/users`);
      const existingUsers = await usersResponse.json();

      const duplicateUser = existingUsers.find(
        (user) => user.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (duplicateUser) {
        setMessage('An account with that email already exists.');
        return;
      }

      const userPayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'employee',
        department: formData.department,
        phone: formData.phone,
      };

      const employeePayload = {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        position: formData.position,
        status: 'Pending Onboarding',
        joinDate: new Date().toISOString().slice(0, 10),
        phone: formData.phone,
        address: formData.address,
      };

      await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload),
      });

      await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeePayload),
      });

      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Could not save the new account. Please make sure JSON Server is running.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-center">
      <div className="auth-panel large-panel">
        <h1>Employee Sign Up</h1>
        <p className="muted-text">Register as an employee and your profile will also be stored in the employee records JSON collection.</p>
        <form className="form-grid two-column-grid" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <button className="primary-btn full-span" type="submit" disabled={saving}>
            {saving ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        {message ? <p className="status-text error-text">{message}</p> : null}
        <p className="small-link-row">
          Already registered? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
