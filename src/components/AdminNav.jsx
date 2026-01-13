import { Outlet, useLocation, Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './Nav.css';
import { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';

export const AdminNav = () => {
  const { usuario, logout } = useAuthContext();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  if (!usuario || usuario.role !== 'admin') {
    // Si no es admin, fuera
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div>
      <nav className="admin-nav">
        <div className="nav-container">
          <div className="nav-bar">
            {/* react-burger-menu (visible en móvil) */}
            <Menu
              right
              isOpen={open}
              onStateChange={(state) => setOpen(state.isOpen)}
              className="mobile-burger-menu"
            >
              <Link to="/admin" className="bm-item" onClick={() => setOpen(false)}>Panel Admin</Link>
              <Link to="/admin/usuarios" className="bm-item" onClick={() => setOpen(false)}>Usuarios Admin</Link>
              <Link to="/admin/home" className="bm-item" onClick={() => setOpen(false)}>Home Admin</Link>
              <Link to="/admin/talleres" className="bm-item" onClick={() => setOpen(false)}>Talleres Admin</Link>
              <button onClick={() => { logout(); setOpen(false); }} className="bm-item btn-logout">Logout</button>
            </Menu>

            {/* Enlaces para escritorio (ocultos en móvil) */}
            <div className="nav-links">
              <Link to="/admin" className="nav-link nav-link-admin">Panel Admin</Link>
              <Link to="/admin/usuarios" className="nav-link">Usuarios</Link>
              <Link to="/admin/home" className="nav-link">Home Admin</Link>
              <Link to="/admin/talleres" className="nav-link">Talleres Admin</Link>
            </div>
            <div className="nav-actions-desktop">
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