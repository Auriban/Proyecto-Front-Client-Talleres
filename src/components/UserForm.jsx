/**
 * Formulario para crear o editar un usuario.
 *
 * @param {Object} props
 * @param {'crear'|'editar'} props.vista - Modo del formulario, afecta textos y validación.
 * @param {Object} props.formData - Datos del formulario ({ name, email, password, role }).
 * @param {Function} props.setFormData - Setter para actualizar formData.
 * @param {Function} props.onSubmit - Handler submit del formulario.
 * @param {Function} props.onCancel - Handler para cancelar.
 * @returns {JSX.Element}
 */
export const UserForm = ({ vista, formData, setFormData, onSubmit, onCancel }) => {
  return (
    <div className="formulario-usuario">
      <h2>{vista === 'crear' ? 'Nuevo Usuario' : 'Editar Usuario'}</h2>
      <form onSubmit={onSubmit} className="form-usuario">
        <input
          className="input-titulo"
          type="text"
          placeholder="Nombre completo"
          value={formData.name || ''}
          // mantiene el resto de campos al actualizar name
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
          // sólo es obligatoria al crear
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