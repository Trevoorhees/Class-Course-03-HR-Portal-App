import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ allowedRoles, children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to={currentUser.role === 'hr' ? '/hr-dashboard' : '/employee-dashboard'} replace />;
  }

  return children;
}

export default ProtectedRoute;
