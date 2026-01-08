import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Nav.css';

export const AdminNav = () => {
  const { usuario, cargando, logout } = useAuth();  
  const location = useLocation();

  if (cargando) {
    return <div className="loading-screen">Cargando...</div>;
  }

  if (usuario && usuario.role === 'admin') {
    const handleLogout = () => {
      logout();
    };

    return (
      <div>
        <nav className="admin-nav">
          <div className="nav-container">
            <div className="nav-bar">
              <div className="nav-links">
                <Link to="/admin" className="nav-link nav-link-admin">Panel Administrador</Link>
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
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};
