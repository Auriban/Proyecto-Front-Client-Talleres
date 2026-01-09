import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './Nav.css';

export const PublicNav = () => {
  const { usuario, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/talleres');
  };

  return (
    <div>
      <nav className={usuario ? 'public-nav logged' : 'public-nav'}>
        <div className="nav-container">
          <div className="nav-bar">
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/talleres" className="nav-link">Todos los Talleres</Link>

              {/* Si hay usuario autenticado, mostramos enlaces de usuario sin cambiar rutas */}
              {usuario && usuario.role === 'user' && (
                <Link to="/user" className="nav-link">Mis Talleres</Link>
              )}

              {/* Si es admin, mostramos el enlace al panel */}
              {usuario && usuario.role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin Panel</Link>
              )}
            </div>

            <div>
              {!usuario ? (
                <Link to="/login" className="btn-login">Registro / Login</Link>
              ) : (
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              )}
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