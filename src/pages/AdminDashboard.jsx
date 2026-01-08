import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const { usuario, cargando } = useAuth();  
  const navigate = useNavigate();

  // console.log('USUARIO:', usuario);

  useEffect(() => {
    if (!cargando && (!usuario || usuario.role !== 'admin')) {
      // console.log('NO ADMIN ');
      navigate('/login');
    }
  }, [usuario, cargando, navigate]);

  // Loading
  if (cargando) {
    return <div className="loading">Cargando...</div>;
  }

  // No auth
  if (!usuario || usuario.role !== 'admin') {
    return <div>Redirigiendo...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Panel de Administración</h1>
        <p>Gestiona usuarios, talleres y contenido</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/admin/usuarios" className="dashboard-card usuarios">
          <div className="card-icon">👥</div>
          <h3>Gestión de Usuarios</h3>
          <p>Crear, editar y eliminar usuarios</p>
        </Link>

        <Link to="/admin/talleres" className="dashboard-card talleres">
          <div className="card-icon">🎨</div>
          <h3>Gestión de Talleres</h3>
          <p>Editar talleres y contenido</p>
        </Link>

        <Link to="/admin/home" className="dashboard-card home">
          <div className="card-icon">🏠</div>
          <h3>Editar Home</h3>
          <p>Portada, título y cards</p>
        </Link>
      </div>
    </div>
  );
};
