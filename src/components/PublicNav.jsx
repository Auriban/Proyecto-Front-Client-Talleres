import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './Nav.css';

/**
 * Muestra enlaces generales y, si hay usuario, enlaces según el rol.
 * Al hacer logout se llama a la función del contexto y se redirige a /talleres.
 *
 * @returns {JSX.Element}
 */
export const PublicNav = () => {
  // Extrae el usuario y la función de cierre de sesión desde el contexto de auth
  const { usuario, logout } = useAuthContext();

  // Hook para navegar después del logout
  const navigate = useNavigate();

  // Maneja el cierre de sesión: limpia auth (logout) y navega a la lista pública
  const handleLogout = () => {
    logout();
    navigate('/talleres');
  };

  return (
    <div>
      {/* Añade la clase 'logged' cuando hay usuario para poder cambiar estilos */}
      <nav className={usuario ? 'public-nav logged' : 'public-nav'}>
        <div className="nav-container">
          <div className="nav-bar">
            <div className="nav-links">
              {/* Enlaces públicos */}
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/talleres" className="nav-link">Todos los Talleres</Link>

              {/* Enlace específico para usuarios normales (no admin) */}
              {usuario && usuario.role === 'user' && (
                <Link to="/user" className="nav-link">Mis Talleres</Link>
              )}

              {/* Enlace al panel admin si el usuario es admin */}
              {usuario && usuario.role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin Panel</Link>
              )}
            </div>

            <div>
              {/* Si no hay usuario, mostrar enlace a login/registro; si hay, botón de logout */}
              {!usuario ? (
                <Link to="/login" className="btn-login">Registro / Login</Link>
              ) : (
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Outlet para renderizar rutas hijas dentro del layout público */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};