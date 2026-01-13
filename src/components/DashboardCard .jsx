import { Link } from 'react-router-dom';

/**
 * Usa Link para navegación cuando disabled es false; si está deshabilitada
 * renderiza un div con aria-disabled y tabIndex=-1 para accesibilidad.
 *
 * @param {Object} props
 * @param {string} [props.to='#'] - Ruta de destino al hacer click.
 * @param {React.ReactNode|string|null} [props.icon=null] - Icono o contenido visual.
 * @param {string} [props.title=''] - Título de la tarjeta.
 * @param {string} [props.description=''] - Descripción breve.
 * @param {boolean} [props.disabled=false] - Si true, la tarjeta no es interactiva.
 * @returns {JSX.Element}
 */
export const DashboardCard = ({ to = '#', icon = null, title = '', description = '', disabled = false }) => {
  // Clase base; añade 'disabled' cuando corresponde para estilos.
  const className = `dashboard-card ${disabled ? 'disabled' : ''}`;

  // Si está deshabilitada, devolver un contenedor no interactivo.
  // aria-disabled indica a tecnologías de asistencia que no es usable.
  // tabIndex={-1} evita que reciba foco con Tab.
  if (disabled) {
    return (
      <div className={className} aria-disabled="true" tabIndex={-1}>
        <div className="card-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }

  // Comportamiento normal: la tarjeta es un Link que navega a to.
  return (
    <Link to={to} className={className}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};