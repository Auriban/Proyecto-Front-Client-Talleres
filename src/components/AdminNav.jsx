import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './Nav.css';

export const AdminNav = () => {
  const { usuario, logout } = useAuthContext();
  const location = useLocation();

  if (!usuario || usuario.role !== 'admin') {
    // Si no es admin, fuera
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      <nav className="admin-nav">
        <div className="nav-container">
          <div className="nav-bar">
            <div className="nav-links">
              <Link to="/admin" className="nav-link nav-link-admin">Panel Admin</Link>
              <Link to="/admin/usuarios" className="nav-link">Usuarios</Link>
              <Link to="/admin/home" className="nav-link">Home Admin</Link>
              <Link to="/admin/talleres" className="nav-link">Talleres Admin</Link>
            </div>
            <div>
              <button onClick={() => logout()} className="btn-logout">Logout</button>
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
