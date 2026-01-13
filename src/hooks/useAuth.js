import { useState, useEffect } from 'react';
import { loginAuth, registerAuth, verificarPerfil } from '../helpers/llamadafetch';

/**
 * Hook de autenticación (cookies httpOnly).
 *
 * - Usa verificarPerfil() para restaurar sesión al montar.
 * - login/register llaman a los endpoints que setean cookie httpOnly en el servidor.
 */
export const useAuth = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const verificarAuth = async () => {
    setCargando(true);
    setError(null);
    try {
      // verificarPerfil hace fetch('/api/auth/perfil', { credentials: 'include' })
      const data = await verificarPerfil();
      if (data && data.usuario) {
        setUsuario(data.usuario);
      } else {
        setUsuario(null);
      }
    } catch (err) {
      console.error('Error verificando sesión:', err);
      setUsuario(null);
      setError(err?.message || 'Error verificando sesión');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    verificarAuth();
  }, []);

  const login = async (email, password) => {
    setCargando(true);
    setError(null);
    try {
      // loginAuth debe hacer fetch(..., { credentials: 'include' })
      const data = await loginAuth(email, password);
      if (data && data.usuario) {
        setUsuario(data.usuario);
        return { ok: true, usuario: data.usuario };
      }
      // en caso de respuesta mala:
      setUsuario(null);
      return { ok: false, error: 'Respuesta inválida del servidor' };
    } catch (err) {
      const msg = err?.message || String(err);
      setError(msg);
      setUsuario(null);
      return { ok: false, error: msg };
    } finally {
      setCargando(false);
    }
  };

  const register = async (email, password, name) => {
    setCargando(true);
    setError(null);
    try {
      // registerAuth debe hacer fetch(..., { credentials: 'include' })
      const data = await registerAuth(email, password, name);
      if (data && data.usuario) {
        setUsuario(data.usuario);
        return { ok: true, usuario: data.usuario };
      }
      setUsuario(null);
      return { ok: false, error: 'Respuesta inválida del servidor' };
    } catch (err) {
      const msg = err?.message || String(err);
      setError(msg);
      setUsuario(null);
      return { ok: false, error: msg };
    } finally {
      setCargando(false);
    }
  };

  const logout = async () => {
    try {
      // Llama al endpoint que borra la cookie en el servidor
      await fetch(`${import.meta.env.VITE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Error en logout:', err);
    } finally {
      // limpiamos el estado del cliente
      setUsuario(null);
      setError(null);
    }
  };

  return { usuario, cargando, error, login, register, logout };
};