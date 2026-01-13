import { useState } from 'react';
import { useUsuariosAdmin } from '../hooks/useUsuariosAdmin';
import { UserList } from '../components/UserList ';
import { UserForm } from '../components/UserForm';
import './AdminPanelPages.css';

/**
 * Página de administración de usuarios.
 *
 * - Muestra la lista de usuarios y un formulario para crear/editar.
 * - Usa el hook useUsuariosAdmin para la lógica (fetch, CRUD, swal...).
 *
 * @returns {JSX.Element}
 */
export const AdminUsuarios = () => {
  const [vista, setVista] = useState('lista');

  // Extraemos lo que necesitamos del hook de administración
  const {
    usuarios,
    cargando,
    formData,
    setFormData,
    handleCrear,
    handleEditar,
    handleActualizar,
    handleEliminar,
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
            // Al crear, limpiar el formulario y cambiar la vista
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
            // Al editar llamamos al handler que rellena el form en el hook
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
          // El submit depende de la vista actual
          onSubmit={vista === 'editar' ? handleActualizar : handleCrear}
          onCancel={() => {
            // Cancelar vuelve a la lista y limpia el form
            setVista('lista');
            setFormData({ name: '', email: '', password: '', role: 'user' });
          }}
        />
      )}
    </div>
  );
};