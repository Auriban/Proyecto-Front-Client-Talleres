import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './Nav.css';

export const UserNav = () => {
  const { usuario, logout } = useAuthContext();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Protección: si no hay usuario o no es role user > redirige
  if (!usuario || usuario.role !== 'user') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      <nav className="public-nav">
        <div className="nav-container">
          <div className="nav-bar">
            <div className="nav-links">
              
              <Link to="/user" className="nav-link">Mis Talleres</Link>
              <Link to="/user/home" className="nav-link">Home</Link>
              <Link to="/user/talleres" className="nav-link">Todos los Talleres</Link>
            </div>
            <div>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};