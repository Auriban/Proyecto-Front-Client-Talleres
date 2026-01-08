import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './nav.css';

export const UserNav = () => {
  const { usuario, cargando, logout } = useAuth();  
  const location = useLocation();

  if (cargando) {
    return <div className="loading-screen">Cargando...</div>;
  }

  const handleLogout = () => {
    logout();
  };

  return (usuario && usuario.role ==='user') ? (
    <div>
      <nav className="public-nav">
        <div className="nav-container">
          <div className="nav-bar">
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/talleres" className="nav-link">Todos los Talleres</Link>
              <Link to="/user/mistalleres" className="nav-link">Mis Talleres</Link>
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
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
