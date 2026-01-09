import { useState, useEffect } from 'react';
import { loginAuth, registerAuth, verificarPerfil } from '../helpers/llamadafetch';

export const useAuth = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Verifica el usuario usando el token y la API
  const verificarAuth = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      let usuarioApi = null;
      if (token) {
        try {
          // Intenta obtener usuario desde la API (más seguro)
          const data = await verificarPerfil();
          if (data?.usuario) {
            setUsuario(data.usuario);
            setCargando(false);
            return;
          }
        } catch (err) {
          // Si la API falla, intenta decodificar el token 
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUsuario(payload);
            setCargando(false);
            return;
          } catch (e) {
            // Token corrupto
            localStorage.removeItem('token');
            setUsuario(null);
          }
        }
      }
      // Si no hay token o nada funcionó, usuario fuera
      setUsuario(null);
    } catch (err) {
      setUsuario(null);
      localStorage.removeItem('token');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    verificarAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setCargando(true);
      setError(null);
      const data = await loginAuth(email, password);
      localStorage.setItem('token', data.token);
      // Vuelve a verificar para refrescar usuario desde API
      await verificarAuth();
      return { ok: true, usuario: data.usuario };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setCargando(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setCargando(true);
      setError(null);
      const data = await registerAuth(email, password, name);
      localStorage.setItem('token', data.token);
      setUsuario(data.usuario);
      return { ok: true, usuario: data.usuario };
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message };
    } finally {
      setCargando(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    setError(null);
  };

  return { usuario, cargando, error, login, register, logout };
};
