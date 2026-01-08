import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { obtenerUsuarios, eliminarUsuario } from '../helpers/llamadafetch';

export const useUsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar usuarios
  const connection = async () => {
    setCargando(true);
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
    setCargando(false);
  };

  const handleEliminar = async (id, email) => {
    const result = await Swal.fire({
      title: '¿Eliminar este usuario?',
      text: `Se eliminará al usuario: ${email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      await eliminarUsuario(id);
      setUsuarios(prev => prev.filter(u => u._id !== id));

      Swal.fire({
        title: 'Eliminado',
        text: 'El usuario fue eliminado correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el usuario',
        icon: 'error'
      });
    }
  };

  useEffect(() => {
    connection();
  }, []);

  return {
    usuarios,
    cargando,
    handleEliminar,
    connection
  };
};
