import { useState, useEffect } from 'react';
import { loginAuth, registerAuth, verificarPerfil } from '../helpers/llamadafetch';

/**
 * Hook de autenticación.
 *
 * - Verifica el token al montar el hook y mantiene el usuario en estado.
 * - Provee funciones para login, register y logout.
 */
export const useAuth = () => {
  // Usuario actual (null si no hay)
  const [usuario, setUsuario] = useState(null);
  // carga mientras se comprueba el token 
  const [cargando, setCargando] = useState(true);
  // Mensaje de error si ocurre algo
  const [error, setError] = useState(null);

  // Verifica el usuario usando token y la API
  const verificarAuth = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Primero intenta obtener el perfil desde la API 
          const data = await verificarPerfil();
          if (data?.usuario) {
            setUsuario(data.usuario);
            setCargando(false);
            return;
          }
        } catch (err) {
          // Si la API falla, intentar decodificar el token localmente
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUsuario(payload);
            setCargando(false);
            return;
          } catch (e) {
            // Token inválido o corrupto > eliminarlo
            localStorage.removeItem('token');
            setUsuario(null);
          }
        }
      }

      // Si no hay token o no se pudo obtener usuario > null
      setUsuario(null);
    } catch (err) {
      // Cualquier fallo > limpiar y quitar token
      setUsuario(null);
      localStorage.removeItem('token');
    } finally {
      setCargando(false);
    }
  };

  // Al montar, comprobar si hay sesión
  useEffect(() => {
    verificarAuth();
  }, []);

  // Login > guarda token y refresca el usuario
  const login = async (email, password) => {
    try {
      setCargando(true);
      setError(null);
      const data = await loginAuth(email, password);
      localStorage.setItem('token', data.token);
      // Volver a verificar para cargar usuario desde la API
      await verificarAuth();
      return { ok: true, usuario: data.usuario };
    } catch (err) {
      const msg = err?.message || String(err);
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setCargando(false);
    }
  };

  // Registro > guarda token y pone el usuario directamente
  const register = async (email, password, name) => {
    try {
      setCargando(true);
      setError(null);
      const data = await registerAuth(email, password, name);
      localStorage.setItem('token', data.token);
      setUsuario(data.usuario);
      return { ok: true, usuario: data.usuario };
    } catch (err) {
      const msg = err?.message || String(err);
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setCargando(false);
    }
  };

  // Logout > quitar token y limpiar estado
  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    setError(null);
  };

  return { usuario, cargando, error, login, register, logout };
};