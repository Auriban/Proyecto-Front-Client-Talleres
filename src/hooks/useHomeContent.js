const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

/**
 * Hook para obtener el contenido público de la página home.
 *
 * fetchHome hace la petición a la API y devuelve data. Lanza un error si la respuesta no es OK.
 *
 * @returns {{ fetchHome: () => Promise<Object> }} Función para cargar el contenido.
 */
export const useHomeContent = () => {
  const fetchHome = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/home/public`);

      if (!res.ok) throw new Error('Error cargando contenido');
      const data = await res.json();
      // Devolver data del back o {} si no existe
      return data.data || {};
    } catch (error) {
      // Mostrar en consola y volver a lanzar para que el llamador lo gestione
      console.error('Error cargando home:', error);
      throw error;
    }
  };

  return { fetchHome };
};