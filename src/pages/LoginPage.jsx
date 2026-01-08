import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

export const LoginPage = () => {
  const { login, register, cargando, error } = useAuth();
  const navigate = useNavigate();

  const [vista, setVista] = useState('login');
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
      if (resp.ok) {
        if (resp.usuario.role === 'admin') {
          navigate('/admin');
        } else if (resp.usuario.role === 'user') {
          navigate('/user');
        } else {
          navigate('/home');
        }
      }
    } else {
      const resp = await register(form.email, form.password, form.name);
      if (resp.ok) navigate('/user'); 
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-tabs">
          <button 
            className={vista === 'login' ? 'tab-active' : 'tab'}
            onClick={() => setVista('login')}
          >
            Iniciar Sesión
          </button>
          <button 
            className={vista === 'register' ? 'tab-active' : 'tab'}
            onClick={() => setVista('register')}
          >
            Registrarse
          </button>
        </div>

        <div className="login-header">
          <h1>{vista === 'login' ? 'Bienvenido de nuevo' : 'Crear Cuenta'}</h1>
          <p>{vista === 'login' ? 'Accede a tu cuenta' : 'Únete como usuario'}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {vista === 'register' && (
            <label className="login-label">
              Nombre completo
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
              placeholder="tunombre@email.com"
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
            {cargando ? 'Procesando...' : 
              (vista === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta')
            }
          </button>
        </form>

      <div className="login-footer">
        <Link to="/">← Volver al inicio</Link>
      </div>

      </div>
    </div>
  );
};
