import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:3001/users';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'hr',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');

    if (!formData.email || !formData.password) {
      setMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const users = await response.json();

      const matchedUser = users.find(
        (user) =>
          user.email.toLowerCase() === formData.email.toLowerCase() &&
          user.password === formData.password &&
          user.role === formData.role
      );

      if (!matchedUser) {
        setMessage('Invalid credentials or incorrect role selected.');
        return;
      }

      login(matchedUser);
      navigate(matchedUser.role === 'hr' ? '/hr-dashboard' : '/employee-dashboard');
    } catch (error) {
      setMessage('Could not connect to the server. Please start JSON Server first.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-center">
      <div className="auth-panel">
        <h1>Login</h1>
        <p className="muted-text">Use one of the sample accounts from db.json or create a new employee account.</p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="radio-row">
            <label>
              <input
                type="radio"
                name="role"
                value="employee"
                checked={formData.role === 'employee'}
                onChange={handleChange}
              />
              Employee
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="hr"
                checked={formData.role === 'hr'}
                onChange={handleChange}
              />
              HR
            </label>
          </div>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {message ? <p className="status-text error-text">{message}</p> : null}
        <p className="small-link-row">
          Need an employee account? <Link to="/signup">Sign up</Link>
        </p>
        <div className="sample-login-box">
          <p><strong>HR:</strong> hr@portal.com / hr123</p>
          <p><strong>Employee:</strong> employee@portal.com / emp123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
