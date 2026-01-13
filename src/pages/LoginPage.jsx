import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './LoginPage.css';

/**
 * Página de login y registro.
 *
 * Usa el contexto de autenticación para realizar login/register (cookies httpOnly).
 * Añade validación simple en el cliente y muestra errores amigables.
 */
export const LoginPage = () => {
  const { login, register, cargando: cargandoGlobal } = useAuthContext();
  const navigate = useNavigate();

  const [vista, setVista] = useState('register');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errorLocal, setErrorLocal] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorLocal(null);
  };

  const validateRegister = () => {
    if (!form.name || form.name.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      return 'Email no válido';
    }
    if (!form.password || form.password.length < 6) {
      return 'La contraseña debe tener mínimo 6 caracteres';
    }
    return null;
  };

  const validateLogin = () => {
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      return 'Email no válido';
    }
    if (!form.password || form.password.length < 6) {
      return 'La contraseña debe tener mínimo 6 caracteres';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLocal(null);

    if (vista === 'login') {
      const err = validateLogin();
      if (err) {
        setErrorLocal(err);
        return;
      }

      try {
        setSubmitting(true);
        const resp = await login(form.email, form.password);
        if (resp.ok) {
          const role = resp.usuario?.role || 'user';
          if (role === 'admin') navigate('/admin');
          else navigate('/user');
        } else {
          setErrorLocal(resp.error || 'Credenciales inválidas');
        }
      } catch (err) {
        setErrorLocal(err?.message || 'Error en el login');
      } finally {
        setSubmitting(false);
      }

    } else {
      // register view
      const err = validateRegister();
      if (err) {
        setErrorLocal(err);
        return;
      }

      try {
        setSubmitting(true);
        const resp = await register(form.email, form.password, form.name);
        if (resp.ok) {
          // normalmente el usuario creado será 'user'
          navigate('/user');
        } else {
          setErrorLocal(resp.error || 'Error al registrarse');
        }
      } catch (err) {
        setErrorLocal(err?.message || 'Error en el registro');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const cargando = cargandoGlobal || submitting;

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-tabs">
          <button
            className={vista === 'register' ? 'tab-active' : 'tab'}
            onClick={() => { setVista('register'); setErrorLocal(null); }}
            type="button"
          >
            Registrarse
          </button>
          <button
            className={vista === 'login' ? 'tab-active' : 'tab'}
            onClick={() => { setVista('login'); setErrorLocal(null); }}
            type="button"
          >
            Ya tengo cuenta
          </button>
        </div>

        <div className="login-header">
          <h1>{vista === 'register' ? 'Crear cuenta' : 'Iniciar sesión'}</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {vista === 'register' && (
            <label className="login-label">
              Nombre
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </label>
          )}

          <label className="login-label">
            Correo electrónico
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nombre@email.com"
              required
            />
          </label>

          <label className="login-label">
            Contraseña
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              minLength="6"
            />
          </label>

          {(errorLocal) && <div className="login-error">{errorLocal}</div>}

          <button
            type="submit"
            className="login-button"
            disabled={cargando}
          >
            {cargando
              ? 'Procesando...'
              : vista === 'register'
                ? 'Crear Cuenta'
                : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <Link to="/">← Volver al inicio</Link>
        </div>

      </div>
    </div>
  );
};