import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './Nav.css';
import { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';

export const PublicNav = () => {
  const { usuario, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/talleres');
  };

  // cerrar menú al cambiar de ruta (SPA)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div>
      <nav className={usuario ? 'public-nav logged' : 'public-nav'}>
        <div className="nav-container">
          <div className="nav-bar">
            {/* react-burger-menu*/}
            <Menu
              right
              isOpen={open}
              onStateChange={(state) => setOpen(state.isOpen)}
              className="mobile-burger-menu"
            >
              <Link to="/" className="bm-item" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/talleres" className="bm-item" onClick={() => setOpen(false)}>Todos los Talleres</Link>
              {usuario && usuario.role === 'user' && (
                <Link to="/user" className="bm-item" onClick={() => setOpen(false)}>Mis Talleres</Link>
              )}
              {usuario && usuario.role === 'admin' && (
                <Link to="/admin" className="bm-item" onClick={() => setOpen(false)}>Admin Panel</Link>
              )}
              {!usuario ? (
                <Link to="/login" className="bm-item btn-login" onClick={() => setOpen(false)}>Registro / Login</Link>
              ) : (
                <button onClick={() => { handleLogout(); setOpen(false); }} className="bm-item btn-logout">Logout</button>
              )}
            </Menu>

            {/* Enlaces para escritorio (ocultos en móvil) */}
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

            <div className="nav-actions-desktop">
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