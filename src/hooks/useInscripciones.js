import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { obtenerMisInscripciones, inscribirseTaller, cancelarInscripcion } from '../helpers/llamadafetch';

/**
 * Hook que maneja las inscripciones del usuario logueado.
 *
 * - Carga las inscripciones si hay usuario.
 * - Permite inscribirse y cancelar una inscripción.
 * - Mantiene estado de carga y lista actualizada.
 */
export const useInscripciones = () => {
  // Lista de inscripciones del usuario
  const [inscripciones, setInscripciones] = useState([]);
  // Flag para indicar que se está haciendo una petición
  const [cargando, setCargando] = useState(false);
  // Usuario desde el hook de authh > si es null, no hay sesión
  const { usuario } = useAuth();

  // Función que carga las inscripciones desde la API.
  // No hace la petición si no hay usuario
  const cargarInscripciones = async () => {
    if (!usuario) {
      setInscripciones([]);
      return;
    }

    try {
      setCargando(true);
      const data = await obtenerMisInscripciones();
      setInscripciones(data || []);
    } catch (error) {
      console.error('Error cargando inscripciones:', error);
      setInscripciones([]);
    } finally {
      setCargando(false);
    }
  };

  // Inscribirse en un taller.
  // Devuelve { ok: true } si todo fue bien o { ok: false, msg } si falló.
  const inscribirse = async (tallerId) => {
    if (!usuario) {
      return { ok: false, msg: 'Debes iniciar sesión' };
    }

    try {
      setCargando(true);
      const resultado = await inscribirseTaller(tallerId);
      // Refrescar la lista después de inscribir
      await cargarInscripciones();
      return { ok: true, msg: resultado?.msg };
    } catch (error) {
      // Error.message
      return { ok: false, msg: error?.message || 'Error al inscribirse' };
    } finally {
      setCargando(false);
    }
  };

  // Cancelar una inscripción por id.
  const cancelar = async (inscripcionId) => {
    if (!usuario) {
      return { ok: false, msg: 'Debes iniciar sesión' };
    }

    try {
      setCargando(true);
      await cancelarInscripcion(inscripcionId);
      // Refrescar la lista después de cancelar
      await cargarInscripciones();
      return { ok: true };
    } catch (error) {
      console.error('Error cancelando:', error);
      return { ok: false, msg: error?.message || 'Error al cancelar' };
    } finally {
      setCargando(false);
    }
  };

  // Cargar inscripciones al montar y cada vez que cambia el usuario.
  useEffect(() => {
    cargarInscripciones();
  }, [usuario]);

  return {
    inscripciones,
    cargando,
    inscribirse,
    cancelar
  };
};