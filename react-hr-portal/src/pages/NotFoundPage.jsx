import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page-center">
      <div className="auth-panel">
        <h1>Page Not Found</h1>
        <p className="muted-text">The page you requested does not exist.</p>
        <Link className="primary-btn link-btn" to="/login">Back to Login</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
