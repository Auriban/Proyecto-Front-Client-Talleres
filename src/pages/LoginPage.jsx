import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import './LoginPage.css';

/**
 * Página de login y registro.
 *
 * - Gestiona las vistas de registro e inicio de sesión.
 * - Usa el contexto de autenticación para realizar login/registro.
 * - Redirige según el rol devuelto por la API.
 *
 * @returns {JSX.Element}
 */

export const LoginPage = () => {
  // Usar el contexto 
  const { login, register, cargando, error } = useAuthContext();
  const navigate = useNavigate();

  const [vista, setVista] = useState('register');

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (vista === 'login') {
      const resp = await login(form.email, form.password);

      //console.log(' LOGIN RESP', resp);
      //console.log(' localStorage token', localStorage.getItem('token'));

      if (resp.ok) {
        // Navegar según rol devuelto
        const role = resp.usuario?.role || 'user';
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }
    } else {
      const resp = await register(form.email, form.password, form.name);
      if (resp.ok) {
        // después de registrarse normalmente es user, ajustar según flujo
        navigate('/user');
      }
    }
  };


  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-tabs">

          <button 
            className={vista === 'register' ? 'tab-active' : 'tab'}
            onClick={() => setVista('register')}
          >
            Registrarse
          </button>
          <button 
            className={vista === 'login' ? 'tab-active' : 'tab'}
            onClick={() => setVista('login')}
          >
            Ya tengo cuenta
          </button>
        </div>

        <div className="login-header">
          <h1>
            {vista === 'register'
              ? 'Crear cuenta'
              : 'Iniciar sesión'}
          </h1>
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

          {error && <div className="login-error">{error}</div>}

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