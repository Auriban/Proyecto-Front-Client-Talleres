import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {  obtenerUsuarios,  crearUsuario,  actualizarUsuario,  eliminarUsuario} from '../helpers/llamadafetch';

/**
 * Hook para gestionar usuarios desde el admin.
 *
 * - Carga la lista de usuarios.
 * - Permite crear, editar, actualizar y eliminar usuarios.
 * - Usa SweetAlert2 para mensajes
 */
export const useUsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Formulario (crear / editar)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [editandoId, setEditandoId] = useState(null);

  // Carga la lista de usuarios
  const connection = async () => {
    setCargando(true);
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data || []);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
      setUsuarios([]);
    } finally {
      setCargando(false);
    }
  };

  // Crear usuario (POST)
  const handleCrear = async (e) => {
    e.preventDefault();

    // validación simple
    if (!formData.name || !formData.email || !formData.password) {
      return Swal.fire('Atención', 'Nombre, email y contraseña son obligatorios', 'info');
    }

    try {
      setCargando(true);
      await crearUsuario(formData);
      await connection(); // recargar lista
      setFormData({ name: '', email: '', password: '', role: 'user' });
      Swal.fire('Creado', 'Usuario creado correctamente', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', err.message || 'No se pudo crear el usuario', 'error');
    } finally {
      setCargando(false);
    }
  };

  // Preparar edición > cargar datos en el form
  const handleEditar = (id) => {
    const u = usuarios.find(x => x._id === id);
    if (!u) {
      return Swal.fire('Error', 'Usuario no encontrado', 'error');
    }
    setFormData({
      name: u.name || '',
      email: u.email || '',
      password: '', 
      role: u.role || 'user'
    });
    setEditandoId(id);
  };

  // Actualizar usuario (PUT)
  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!editandoId) {
      return Swal.fire('Error', 'No hay usuario seleccionado', 'error');
    }

    try {
      setCargando(true);
      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };
      // enviar la contraseña solo si se indicó
      if (formData.password) payload.password = formData.password;

      await actualizarUsuario(editandoId, payload);
      await connection();
      setFormData({ name: '', email: '', password: '', role: 'user' });
      setEditandoId(null);
      Swal.fire('Actualizado', 'Usuario actualizado correctamente', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', err.message || 'No se pudo actualizar el usuario', 'error');
    } finally {
      setCargando(false);
    }
  };

  // Eliminar usuario
  const handleEliminar = async (id) => {
    const usuario = usuarios.find(u => u._id === id);
    const email = usuario?.email || '';

    const result = await Swal.fire({
      title: '¿Eliminar este usuario?',
      text: `Se eliminará al usuario: ${email}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!result.isConfirmed) return;

    try {
      setCargando(true);
      await eliminarUsuario(id);
      // actualizar la lista localmente para evitar otra petición
      setUsuarios(prev => prev.filter(u => u._id !== id));
      Swal.fire('Eliminado', 'El usuario fue eliminado', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    connection();
  }, []);

  return {
    usuarios,
    cargando,
    formData,
    setFormData,
    handleCrear,
    handleEditar,
    handleActualizar,
    handleEliminar,
    editandoId,
    setEditandoId,
    connection
  };
};