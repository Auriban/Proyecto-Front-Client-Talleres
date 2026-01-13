import { useState, useEffect } from 'react';
import { obtenerTallerPorId } from '../helpers/llamadafetch';

/**
 * Hook para obtener los datos de un taller por su id.
 *
 * - Si id es (undefined, null...), no hace la petición.
 * - Mantiene estado del taller, un flag de carga y un mensaje de error simple.
 *
 * @param {string|number|null|undefined} id - Id del taller a cargar.
 * @returns {{ taller: any|null, cargando: boolean, error: string|null }}
 *   - taller: datos del taller o null si no se han cargado.
 *   - cargando: true mientras se está pidiendo la información.
 *   - error: mensaje simple si falla la carga, o null en caso contrario.
 */
export const useTallerDetalle = (id) => {
  const [taller, setTaller] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const connection = async () => {
      if (!id) {
        // No hay id > no hacer petición y marcar que no está cargando.
        setCargando(false);
        return;
      }

      setCargando(true);
      setError(null);
      
      try {
        const data = await obtenerTallerPorId(id);
        setTaller(data);
      } catch (err) {
        setError('Error al cargar taller');
      }
      setCargando(false);
    };

    connection();
  }, [id]);

  return { taller, cargando, error };
};