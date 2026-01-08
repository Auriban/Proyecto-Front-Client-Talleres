import { useState, useEffect } from 'react';
import { obtenerTallerPorId } from '../helpers/llamadafetch';

export const useTallerDetalle = (id) => {
  const [taller, setTaller] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const connection = async () => {
      if (!id) {
        setCargando(false);
        return;
      }

      setCargando(true);
      setError(null);
      
      try {
        const data = await obtenerTallerPorId(id);
        setTaller(data);
      } catch (error) {
        setError('Error al cargar taller');
      }
      setCargando(false);
    };

    connection();
  }, [id]);

  return { taller, cargando, error };
};
