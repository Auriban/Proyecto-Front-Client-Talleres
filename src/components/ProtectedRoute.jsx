import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

/**
 * Componente que protege rutas según el estado de autenticación.
 * - Muestra un indicador de carga mientras se comprueba el estado.
 * - Redirige a /login si no hay usuario, preservando la ubicación actual.
 * - Si adminOnly es true > redirige a /talleres cuando el usuario no es admin.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elementos que se renderizan si pasan las comprobaciones.
 * @param {boolean} [props.adminOnly=false] - Si true > sólo usuarios con role 'admin' pueden acceder.
 * @returns {JSX.Element} children o un <Navigate /> carga según el estado.
 */
export const ProtectedRoute = ({ children, adminOnly = false }) => {
  // Estado de autenticación carga desde el contexto.
  const { usuario, cargando } = useAuthContext();
  // Ubicación actual para poder volver tras el login.
  const location = useLocation();

  // Mientras se cargan los datos de auth, mostrar spinner.
  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no hay usuario, redirigir a login y guardar la ruta de origen.
  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si la ruta es sólo para admins y el usuario no lo es, redirigir.
  if (adminOnly && usuario.role !== 'admin') {
    return <Navigate to="/talleres" replace />;
  }

  // Si todo está bien, renderizar los children.
  return children;
};