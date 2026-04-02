import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser } = useAuth();

  return (
    <header className="topbar">
      <div className="brand-mark">HR Portal</div>
      <nav className="topnav">
        {!currentUser && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/hr-policy">HR Policy</NavLink>
            <NavLink to="/employee-policy">Employee Policy</NavLink>
            <NavLink to="/about">About</NavLink>
          </>
        )}

        {currentUser?.role === 'hr' && (
          <>
            <NavLink to="/hr-dashboard">HR Dashboard</NavLink>
            <NavLink to="/hr-policy">HR Policy</NavLink>
            <NavLink to="/about">About</NavLink>
          </>
        )}

        {currentUser?.role === 'employee' && (
          <>
            <NavLink to="/employee-dashboard">Employee Dashboard</NavLink>
            <NavLink to="/employee-policy">Employee Policy</NavLink>
            <NavLink to="/about">About</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
