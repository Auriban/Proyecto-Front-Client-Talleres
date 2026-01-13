import { useState, useEffect } from 'react';
import { obtenerTalleres } from '../helpers/llamadafetch'; 

/**
 * Hook para obtener todos los talleres.
 *
 * - Llama a la API al montar el hook.
 * - Devuelve la lista de talleres y carga.
 *
 * @returns {{ talleres: Array, cargando: boolean }}
 */
export const useTalleres = () => {
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);

  const connection = async () => {
    // empezar a cargar
    setCargando(true);
    try {
      // peticion a la API
      const data = await obtenerTalleres(); 
      // guardar resultados (si la API devuelve null/undefined > se queda como [])
      setTalleres(data || []);
    } catch (error) {
      console.error('Error cargando talleres:', error);
    }
    // terminar carga
    setCargando(false);
  };

  // cargar una vez al montar
  useEffect(() => {
    connection();
  }, []);

  return { talleres, cargando };
};