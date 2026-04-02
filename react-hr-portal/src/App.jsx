import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HRPolicyPage from './pages/HRPolicyPage';
import EmployeePolicyPage from './pages/EmployeePolicyPage';
import AboutPage from './pages/AboutPage';
import HRDashboardPage from './pages/HRDashboardPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/hr-policy" element={<HRPolicyPage />} />
          <Route path="/employee-policy" element={<EmployeePolicyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/hr-dashboard"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <HRDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
