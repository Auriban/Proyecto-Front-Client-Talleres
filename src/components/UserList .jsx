/**
 * Lista de usuarios con botones para editar y eliminar.
 *
 * Renderiza el total y una fila por usuario con nombre, rol y email.
 *
 * @param {Object} props
 * @param {Array<{_id: string, name: string, email: string, role?: string}>} [props.usuarios=[]] - Array de usuarios.
 * @param {(user: Object) => void} props.onEdit - Función llamada con el usuario al editar.
 * @param {(id: string) => void} props.onDelete - Función llamada con el id al eliminar.
 * @returns {JSX.Element}
 */
export const UserList = ({ usuarios = [], onEdit, onDelete }) => {
  return (
    <div className="lista-usuarios">
      <h2>Total: {usuarios.length} usuarios</h2>

      <div className="tabla-usuarios">
        {usuarios.map(usuario => (
          <div key={usuario._id} className="usuario-item">
            <div className="usuario-info">
              <div className="usuario-nombre">
                <strong>{usuario.name}</strong>
                {/* Mostrar rol en mayúsculas si existe */}
                <span className="badge-rol">{usuario.role?.toUpperCase()}</span>
              </div>

              <div className="usuario-detalles">
                <span className="email">{usuario.email}</span>
              </div>
            </div>

            <div className="acciones">
              <button
                onClick={() => onEdit(usuario)}
                className="btn-editar"
                type="button"
              >
                Editar
              </button>

              <button
                onClick={() => onDelete(usuario._id)}
                className="btn-borrar"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};