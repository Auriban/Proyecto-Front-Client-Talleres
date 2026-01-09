const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

export const useHomeContent = () => {
  const fetchHome = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/home/public`);

      if (!res.ok) throw new Error('Error cargando contenido');
      const data = await res.json();
      return data.data || {};
    } catch (error) {
      console.error('Error cargando home:', error);
      throw error;
    }
  };

  return { fetchHome };
};
