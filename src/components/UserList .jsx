const UserList = ({ usuarios = [], onEdit, onDelete }) => {
  return (
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
                onClick={() => onEdit(usuario)}
                className="btn-editar"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(usuario._id)}
                className="btn-borrar"
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

export default UserList;