import { useState } from 'react';
import { useUsuariosAdmin } from '../hooks/useUsuariosAdmin';
import './AdminPanelPages.css';

export const AdminUsuarios = () => {
  const [vista, setVista] = useState('lista');
  const {
    usuarios, cargando, formData, setFormData,
    handleCrear, handleEditar, handleActualizar, handleEliminar,
    editandoId, connection
  } = useUsuariosAdmin();

  if (cargando) return <div className="loading">Cargando usuarios...</div>;

  return (
    <div className="admin-panel">
      <h1>Gestión de Usuarios</h1>

      <div className="tabs">
        <button 
          className={vista === 'lista' ? 'active' : ''} 
          onClick={() => setVista('lista')}
        >
          Lista Usuarios
        </button>
        <button 
          className={vista === 'crear' ? 'active' : ''} 
          onClick={() => setVista('crear')}
        >
          + Nuevo Usuario
        </button>
      </div>

      {vista === 'lista' && (
        <div className="lista-usuarios">
          <h2>Total: {usuarios.length} usuarios</h2>
          <div className="tabla-usuarios">
            {usuarios.map(usuario => (
              <div key={usuario._id} className="usuario-item">               
                <div className="usuario-info">
                  <div className="usuario-nombre">
                    <strong>{usuario.name}</strong>
                    <span className="badge-rol">{usuario.role?.toUpperCase()}</span>
                  </div>
                  <div className="usuario-detalles">
                    <span className="email">{usuario.email}</span>
                  </div>
                </div>
                
                <div className="acciones">
                  <button 
                    onClick={() => {
                      handleEditar(usuario._id);
                      setVista('editar');
                    }}
                    className="btn-editar"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleEliminar(usuario._id)}
                    className="btn-borrar"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {(vista === 'crear' || vista === 'editar') && (
      <div className="formulario-usuario">
          <h2>{vista === 'crear' ? 'Nuevo Usuario' : 'Editar Usuario'}</h2>
          <form onSubmit={vista === 'editar' ? handleActualizar : handleCrear} className="form-usuario">
          <input
              className="input-titulo"
              type="text"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
          />
          
          <input
              className="input-titulo"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
          />

          <input
              className="input-titulo"
              type="password"
              placeholder={vista === 'crear' ? "Contraseña" : "Nueva contraseña (opcional)"}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required={vista === 'crear'}
          />

          <select
              className="input-rol"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
          >
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
          </select>

          <div className="form-buttons">
              <button type="submit" className="btn-guardar">
              {vista === 'editar' ? 'Actualizar' : 'Crear Usuario'}
              </button>
              <button 
              type="button"
              className="btn-cancelar"
              onClick={() => {
                  setVista('lista');
                  setFormData({ name: '', email: '', password: '', role: 'user' });
              }}
              >
              Cancelar
              </button>
          </div>
          </form>
      </div>
      )}

    </div>
  );
};
