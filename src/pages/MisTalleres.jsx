import { Link } from 'react-router-dom';  
import { useInscripciones } from '../hooks/useInscripciones';
import Swal from 'sweetalert2'; 
import './MisTalleres.css'; 

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

/**
 * Página con los talleres en los que está inscrito el usuario.
 *
 * - Muestra un estado de carga mientras se obtienen las inscripciones.
 * - Si no hay inscripciones muestra un mensaje y un enlace a la lista de talleres.
 * - Permite cancelar una inscripción con confirmación.
 *
 * @returns {JSX.Element}
 */

export const MisTalleres = () => {
  const { inscripciones, cargando, cancelar } = useInscripciones();

  // Confirmación y llamada a la función de cancelar del hook
  const handleCancelar = async (id) => {
    const result = await Swal.fire({
      title: '¿Seguro que quieres cancelar?',
      text: 'Perderás acceso a este taller',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    });

    if (!result.isConfirmed) return;

    try {
      const resultado = await cancelar(id);
      
      if (resultado.ok) {
        Swal.fire({
          title: '¡Cancelado!',
          text: 'Inscripción cancelada correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        throw new Error('Error al cancelar');
      }
    } catch (error) {
      console.error('Error al cancelar:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cancelar la inscripción',
        icon: 'error'
      });
    }
  };

  return (
    <div className="mis-talleres">
      <div className="page-header">
        <h1>Mis Talleres ({inscripciones.length})</h1>
      </div>

      {cargando ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando tus talleres...</p>
        </div>
      ) : inscripciones.length === 0 ? (
        <div className="sin-talleres">
          <h2>No tienes talleres inscritos</h2>
          <p>Busca talleres y haz clic en "Inscribirse"</p>
          <Link to="/talleres" className="btn-ver-talleres">Ver Talleres</Link>
        </div>
      ) : (
        <div className="mis-talleres-grid">
          {inscripciones.map((inscripcion) => (
            <div key={inscripcion._id} className="taller-mis">
              <div className="header-taller">
                <h3 className="titulo-taller">{inscripcion.taller.titulo}</h3>
                <span className="badge-inscrito">
                  Inscrito el {new Date(inscripcion.fechaInscripcion).toLocaleDateString()}
                </span>
              </div>
              
              <div className="taller-details">
                <p className="descripcion-taller">{inscripcion.taller.descripcion}</p>
                <div className="datos-taller">
                  <p className="dato-taller"><strong>Precio:</strong> €{inscripcion.taller.precio}</p>
                  <p className="dato-taller"><strong>Fecha:</strong> {new Date(inscripcion.taller.fecha).toLocaleDateString()}</p>
                  <p className="dato-taller"><strong>Categoría:</strong> {inscripcion.taller.categoria}</p>
                </div>
                {inscripcion.taller.imgTaller && (
                  <img src={`${BASE_URL}${inscripcion.taller.imgTaller}`} alt={inscripcion.taller.titulo} className="imagen-taller" />
                )}
              </div>
              
              <button onClick={() => handleCancelar(inscripcion._id)} className="btn-cancelar">
                Cancelar Inscripción
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

};
