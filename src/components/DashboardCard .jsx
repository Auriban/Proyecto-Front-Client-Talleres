import { Link } from 'react-router-dom';

/**
 * Props:
 * - to: ruta donde enlaza la card (string)
 * - icon: contenido del icono (string o node)
 * - title: título de la card (string)
 * - description: descripción corta (string)
 * - disabled: boolean para desactivar la card
 */
export const DashboardCard = ({ to = '#', icon = null, title = '', description = '', disabled = false }) => {
  const className = `dashboard-card ${disabled ? 'disabled' : ''}`;
  // Si está deshabilitada, no navegamos
  if (disabled) {
    return (
      <div className={className} aria-disabled="true">
        <div className="card-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }

  return (
    <Link to={to} className={className}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

