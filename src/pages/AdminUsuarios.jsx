import { useState } from 'react';
import { useUsuariosAdmin } from '../hooks/useUsuariosAdmin';
import UserList from '../components/UserList ';
import UserForm from '../components/UserForm';
import './AdminPanelPages.css';

export const AdminUsuarios = () => {
  const [vista, setVista] = useState('lista');
  const {
    usuarios, cargando, formData, setFormData,
    handleCrear, handleEditar, handleActualizar, handleEliminar,
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
          onClick={() => {
            setVista('crear');
            setFormData({ name: '', email: '', password: '', role: 'user' });
          }}
        >
          + Nuevo Usuario
        </button>
      </div>

      {vista === 'lista' && (
        <UserList
          usuarios={usuarios}
          onEdit={(usuario) => {
            handleEditar(usuario._id);
            setVista('editar');
          }}
          onDelete={(id) => handleEliminar(id)}
        />
      )}

      {(vista === 'crear' || vista === 'editar') && (
        <UserForm
          vista={vista}
          formData={formData}
          setFormData={setFormData}
          onSubmit={vista === 'editar' ? handleActualizar : handleCrear}
          onCancel={() => {
            setVista('lista');
            setFormData({ name: '', email: '', password: '', role: 'user' });
          }}
        />
      )}
    </div>
  );
};

export default AdminUsuarios;