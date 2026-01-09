import { useState, useEffect } from 'react';
import { useAuth } from './useAuth'; 
import { obtenerMisInscripciones, inscribirseTaller, cancelarInscripcion } from '../helpers/llamadafetch';

export const useInscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { usuario } = useAuth();  

  const cargarInscripciones = async () => {
    // NO hace fetch si no hay login
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

  // Inscribirse
  const inscribirse = async (tallerId) => {
    if (!usuario) {
      return { ok: false, msg: 'Debes iniciar sesión' };
    }

    try {
      setCargando(true);
      const resultado = await inscribirseTaller(tallerId);
      await cargarInscripciones(); // Refresca lista
      return { ok: true, msg: resultado.msg };
    } catch (error) {
      return { ok: false, msg: error.message };
    } finally {
      setCargando(false);
    }
  };

  const cancelar = async (inscripcionId) => {
    if (!usuario) {
      return { ok: false, msg: 'Debes iniciar sesión' };
    }

    try {
      setCargando(true);
      await cancelarInscripcion(inscripcionId);
      await cargarInscripciones(); // Refresca lista
      return { ok: true };
    } catch (error) {
      console.error('Error cancelando:', error);
      return { ok: false };
    } finally {
      setCargando(false);
    }
  };

  // SOLO carga si está logueado
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
