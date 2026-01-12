import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardCard } from '../components/DashboardCard ';
import './AdminDashboard.css';

export const AdminDashboard = () => {
 const { usuario, cargando } = useAuth();  
  const navigate = useNavigate();
  // console.log('USUARIO:', usuario);

  useEffect(() => {
    if (!cargando && (!usuario || usuario.role !== 'admin')) {
      navigate('/login');
    }
  }, [usuario, cargando, navigate]);

  if (cargando) {
    return <div className="loading">Cargando...</div>;
  }
  // console.log('NO ADMIN ');

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
        <DashboardCard
          to="/admin/usuarios"
          icon="👥"
          title="Gestión de Usuarios"
          description="Crear, editar y eliminar usuarios"
        />

        <DashboardCard
          to="/admin/talleres"
          icon="🎨"
          title="Gestión de Talleres"
          description="Editar talleres y contenido"
        />

        <DashboardCard
          to="/admin/home"
          icon="🏠"
          title="Editar Home"
          description="Portada, título y cards"
        />
      </div>
    </div>
  );
};
