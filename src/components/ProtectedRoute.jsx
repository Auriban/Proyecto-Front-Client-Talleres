import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { usuario, cargando } = useAuthContext();
  const location = useLocation();

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  // Sin login > Login
  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Solo admin
  if (adminOnly && usuario.role !== 'admin') {
    return <Navigate to="/talleres" replace />;
  }

  return children;
};
