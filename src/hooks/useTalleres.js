import { useState, useEffect } from 'react';
import { obtenerTalleres } from '../helpers/llamadafetch'; 

export const useTalleres = () => {
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);

  const connection = async () => {
    setCargando(true);
    try {
      const data = await obtenerTalleres(); 
      setTalleres(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setCargando(false);
  };

  useEffect(() => {
    connection();
  }, []);

  return { talleres, cargando };
};
