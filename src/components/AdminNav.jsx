import { Outlet, useLocation, Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './Nav.css';

/**
 * Barra de navegación para la zona de administración.
 *
 * Restringe acceso a usuarios que no tengan role "admin" y muestra los enlaces
 * del panel junto a un Outlet para las rutas hijas.
 *
 * @returns {JSX.Element}
 */
export const AdminNav = () => {
  // Obtiene el objeto de usuario y la función de logout desde el contexto.
  const { usuario, logout } = useAuthContext();

  // Ruta actual > se guarda al redirigir para poder volver tras el login.
  const location = useLocation();

  // Si no existe usuario o no tiene rol 'admin', redirige a /login.
  if (!usuario || usuario.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div>
      <nav className="admin-nav">
        <div className="nav-container">
          <div className="nav-bar">
            {/* Enlaces principales del panel de administración */}
            <div className="nav-links">
              <Link to="/admin" className="nav-link nav-link-admin">Panel Admin</Link>
              <Link to="/admin/usuarios" className="nav-link">Usuarios Admin</Link>
              <Link to="/admin/home" className="nav-link">Home Admin</Link>
              <Link to="/admin/talleres" className="nav-link">Talleres Admin</Link>
            </div>

            {/* Botón que invoca logout del contexto para cerrar sesión */}
            <div>
              <button onClick={() => logout()} className="btn-logout">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Lugar donde se renderizan las rutas hijas del admin */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};