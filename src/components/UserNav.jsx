import { Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './Nav.css';
import { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';

export const UserNav = () => {
  const { usuario, logout } = useAuthContext();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  if (!usuario || usuario.role !== 'user') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div>
      <nav className="public-nav">
        <div className="nav-container">
          <div className="nav-bar">
            {/* react-burger-menu (visible en móvil) */}
            <Menu
              right
              isOpen={open}
              onStateChange={(state) => setOpen(state.isOpen)}
              className="mobile-burger-menu"
            >
              <Link to="/user" className="bm-item" onClick={() => setOpen(false)}>Mis Talleres</Link>
              <Link to="/user/home" className="bm-item" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/user/talleres" className="bm-item" onClick={() => setOpen(false)}>Todos los Talleres</Link>
              <button onClick={() => { handleLogout(); setOpen(false); }} className="bm-item btn-logout">Logout</button>
            </Menu>

            {/* Enlaces para escritorio (ocultos en móvil) */}
            <div className="nav-links">
              <Link to="/user" className="nav-link">Mis Talleres</Link>
              <Link to="/user/home" className="nav-link">Home</Link>
              <Link to="/user/talleres" className="nav-link">Todos los Talleres</Link>
            </div>
            <div className="nav-actions-desktop">
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