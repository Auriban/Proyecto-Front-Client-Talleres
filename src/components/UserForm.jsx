const UserForm = ({ vista, formData, setFormData, onSubmit, onCancel }) => {
  return (
    <div className="formulario-usuario">
      <h2>{vista === 'crear' ? 'Nuevo Usuario' : 'Editar Usuario'}</h2>
      <form onSubmit={onSubmit} className="form-usuario">
        <input
          className="input-titulo"
          type="text"
          placeholder="Nombre completo"
          value={formData.name || ''}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          className="input-titulo"
          type="email"
          placeholder="Email"
          value={formData.email || ''}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          className="input-titulo"
          type="password"
          placeholder={vista === 'crear' ? "Contraseña" : "Nueva contraseña (opcional)"}
          value={formData.password || ''}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          required={vista === 'crear'}
        />

        <select
          className="input-rol"
          value={formData.role || 'user'}
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
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;