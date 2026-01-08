import { Outlet, Link } from 'react-router-dom';
import './Nav.css';  

export const PublicNav = () => {
  return (
    <div>
      <nav className="public-nav">
        <div className="nav-container">
          <div className="nav-bar">
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/talleres" className="nav-link">Todos los Talleres</Link>
            </div>
            <Link to="/login" className="btn-login">Login</Link>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
