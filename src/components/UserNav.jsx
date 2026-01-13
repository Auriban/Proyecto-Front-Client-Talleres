import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './Nav.css';

/**
 * Navegación para usuarios con rol 'user'.
 *
 * Comprueba el contexto de autenticación y redirige al login si no hay usuario
 * válido o si el rol no es 'user'. Muestra enlaces del usuario y un
 * botón para cerrar sesión.
 *
 * @returns {JSX.Element}
 */
export const UserNav = () => {
  // usuario y función de logout desde el contexto
  const { usuario, logout } = useAuthContext();

  // ubicación actual para preservar la ruta al redirigir
  const location = useLocation();

  // Cierra sesión delegando al contexto; la navegación posterior puede manejarla el contexto
  const handleLogout = () => {
    logout();
  };

  // Protección: si no hay usuario o no tiene rol 'user', redirigir a /login
  if (!usuario || usuario.role !== 'user') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      <nav className="public-nav">
        <div className="nav-container">
          <div className="nav-bar">
            <div className="nav-links">
              {/* Enlaces principales del área de usuario */}
              <Link to="/user" className="nav-link">Mis Talleres</Link>
              <Link to="/user/home" className="nav-link">Home</Link>
              <Link to="/user/talleres" className="nav-link">Todos los Talleres</Link>
            </div>
            <div>
              {/* Botón de logout */}
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Donde se renderizan las rutas hijas */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};