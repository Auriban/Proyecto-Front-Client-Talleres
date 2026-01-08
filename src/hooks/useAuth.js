import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

export const useAuth = () => {
  // Usuario autenticado (null si no hay sesión)
  const [usuario, setUsuario] = useState(null);

  // Indica si se está comprobando la autenticación
  const [cargando, setCargando] = useState(true);

  // Mensajes de error para la UI
  const [error, setError] = useState(null);


  const verificarAuth = async () => {
    try {
      // Obtenemos el token JWT almacenado en localStorage
      const token = localStorage.getItem('token');

      // Si no hay token, no hay sesión activa
      if (!token) {
        setCargando(false);
        return;
      }

      // Petición al endpoint protegido para validar el token
      const res = await fetch(`${BASE_URL}/api/auth/perfil`, {
        headers: {
          // Enviamos el token en el header Authorization (Bearer)
          'Authorization': `Bearer ${token}`
        }
      });

     const data = await res.json();

      // Si la respuesta es correcta y hay usuario, lo guardamos en estado
      if (res.ok && data.usuario) {
        setUsuario(data.usuario);
      }

    } catch (err) {
      console.error('Fallo en verificación de auth', err);
    } finally {
      // Siempre desactivamos el loading
      setCargando(false);
    }
  };

  // Se ejecuta una sola vez al montar el componente. Permite mantener sesión al refrescar la página
  useEffect(() => {
    verificarAuth();
  }, []);


  const login = async (email, password) => {
    setCargando(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // Si el backend devuelve error, lo lanzamos
      if (!res.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Guardamos token y usuario
      localStorage.setItem('token', data.token);
      setUsuario(data.usuario);

      return { 
        ok: true, 
        usuario: data.usuario 
      };

    } catch (err) {
      setError(err.message);

      return { 
        ok: false, 
        error: err.message 
      };

    } finally {
      setCargando(false);
    }
  };


  const register = async (email, password, name) => {
    setCargando(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al registrarse');
      }

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
    // Eliminamos el token y limpiamos el estado
    localStorage.removeItem('token');
    setUsuario(null);
  };

  // Exponemos estado y funciones del hook
  return { usuario, cargando, error, login, register, logout };
};
