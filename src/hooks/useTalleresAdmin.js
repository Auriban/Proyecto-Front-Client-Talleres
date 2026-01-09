import { useState, useEffect } from 'react';
import { obtenerTalleres, crearTaller, actualizarTaller, eliminarTaller } from '../helpers/llamadafetch';
import Swal from 'sweetalert2';

export const useTalleresAdmin = () => {

  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);
  
   const [formData, setFormData] = useState({
    titulo: '', descripcion: '', precio: '', fecha: '', categoria: '', imgTaller: ''
  });
  const [editandoId, setEditandoId] = useState(null);

  /*
   * connection() = CARGA lista de talleres
   * Se ejecuta al cargar página Y después de cada CRUD
   */
  const connection = async () => {
    setCargando(true);
    try {
      const data = await obtenerTalleres();
      setTalleres(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setCargando(false);
  };

  /*
   * handleCrear() = POST nuevo taller
   */
  const handleCrear = async (e) => {
    e.preventDefault();
    await crearTaller(formData);
    connection(); // Recarga lista
    setFormData({ titulo: '', descripcion: '', precio: '', fecha: '', categoria: '', imgTaller: '' });
  };

  /*
   * handleEditar(id) = LLENA formulario con datos existentes
   */
  const handleEditar = async (id) => {
    const taller = talleres.find(t => t._id === id);
    setFormData(taller);
    setEditandoId(id);
  };

  /*
   * handleActualizar() = PUT taller existente
   */
  const handleActualizar = async (e) => {
    e.preventDefault();
    await actualizarTaller(editandoId, formData);
    connection(); // Recarga lista
    setEditandoId(null);
    setFormData({ titulo: '', descripcion: '', precio: '', fecha: '', categoria: '', imgTaller: '' });
  };

  /*
   * handleEliminar(id) = DELETE taller
   */
  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Seguro que quieres eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      const resultado = await eliminarTaller(id);
      console.log('Taller eliminado:', resultado);

      // Refresca la lista
      const nuevosTalleres = await obtenerTalleres();
      setTalleres(nuevosTalleres);

      Swal.fire({
        title: 'Eliminado',
        text: 'El taller se eliminó correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

    } catch (error) {
      console.error('Error al eliminar:', error);

      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el taller',
        icon: 'error'
      });
    }
  };

  // CARGA inicial al montar componente
  useEffect(() => {
    connection();
  }, []);

  return {
    talleres, 
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
