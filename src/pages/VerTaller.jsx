import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext'; 
import { useTallerDetalle } from '../hooks/useTallerDetalle';
import { useInscripciones } from '../hooks/useInscripciones';
import { Map } from '../components/Map';
import Swal from 'sweetalert2';
import './VerTaller.css';


const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

/**
 * Página de detalle de un taller.
 *
 * - Carga el taller por id.
 * - Muestra datos, imagen y mapa.
 * - Permite inscribirse (si hay sesión).
 *
 * @returns {JSX.Element}
 */
export const VerTaller = () => {
  const { id } = useParams();

  // Datos del taller y estado de carga / error
  const { taller, cargando, error } = useTallerDetalle(id);

  // Hook que maneja inscripciones (lista, funciones...)
  const { inscribirse, cargando: cargandoInscripcion } = useInscripciones();

  // Usuario desde el hook de autenticación
  const { usuario } = useAuthContext(); 

  if (cargando) return <div className="loading">Cargando...</div>;
  if (error || !taller) return <div className="error">Taller no encontrado</div>;

  /**
   * Manejo de la acción de inscribirse.
   * - Si no hay sesión, mostrar aviso.
   * - Llamar a la API para inscribir y mostrar resultado.
   */
  const handleInscribirse = async () => {
    // Si no hay usuario logueado, mostrar aviso 
    if (!usuario) {
      Swal.fire({
        title: '🔐 Inicio de sesión necesario',
        text: 'Es necesario iniciar sesión para inscribirse',
        icon: 'info',
        confirmButtonColor: '#A84628'
      });
      return;
    }

    // Intento de inscripción
    const resultado = await inscribirse(taller._id);

    if (resultado.ok) {
      // Inscripción correcta
      Swal.fire({
        title: 'Inscripción realizada',
        text: 'La inscripción se ha realizado correctamente',
        icon: 'success',
        draggable: true,
        confirmButtonColor: '#10b981',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      const msg = resultado.msg || '';
      if (msg.includes('Ya estás inscrito') || msg.toLowerCase().includes('inscrito')) {
        Swal.fire({
          icon: 'error',
          title: 'Inscripción existente',
          text: 'Ya existe una inscripción para este taller',
          footer: 'Revisar la lista de inscripciones'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: msg || 'Error al realizar la inscripción'
        });
      }
    }
  };

  // Formateo de la fecha en formato legible
  const fechaObj = taller && taller.fecha ? new Date(taller.fecha) : null;
  const fechaLegible =
    fechaObj && !Number.isNaN(fechaObj)
      ? fechaObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
      : 'Fecha no disponible';

  return (
    <section className="taller-detalle">
      <div className="taller-info">
        <h1>{taller.titulo}</h1>
        <p>{taller.descripcion}</p>

        <p><strong>FECHA:</strong> {fechaLegible}</p>
        <p><strong>PRECIO:</strong> {taller.precio}€</p>

        {!usuario ? (
          <div className="login-requerido">
            <button className="btn-login" disabled type="button">
              🔐 Inicio de sesión necesario para inscribirse
            </button>
          </div>
        ) : usuario.role !== 'user' ? (
          <div className="login-requerido">
            <button className="btn-login" disabled type="button">
              ❗ Solo usuarios pueden inscribirse
            </button>
          </div>
        ) : (
          <button onClick={handleInscribirse} disabled={cargandoInscripcion} className="btn-inscribirse" type="button">
            {cargandoInscripcion ? 'Inscribiendo...' : 'Inscribirse'}
          </button>
        )}
      </div>

      <div className="taller-imagen">
        <img src={`${BASE_URL}${taller.imgTaller}`} alt={taller.titulo} />
      </div>

      <div className="mapa-container">
        <h2>Ubicación</h2>
        <p>{taller.localizacion?.direccion}</p>
        {/* Componente Map recibe la localización en formato GeoJSON */}
        <Map localizacion={taller.localizacion} />
      </div>
    </section>
  );
};