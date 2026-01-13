import { useState, useEffect } from 'react';
import { obtenerTalleres, crearTaller, actualizarTaller, eliminarTaller } from '../helpers/llamadafetch';
import Swal from 'sweetalert2';

/**
 * Hook para gestionar talleres desde el área de admin.
 * - Carga la lista de talleres.
 * - Crear, editar, actualizar y eliminar.
 *
 * Devuelve estados y handlers para usar en el componente administrador.
 */
export const useTalleresAdmin = () => {
  const [talleres, setTalleres] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    fecha: '',
    categoria: '',
    imgTaller: '',
    direccion: '',
    lat: '',
    lng: ''
  });

  const [editandoId, setEditandoId] = useState(null);

  // Carga la lista de talleres
  const connection = async () => {
    setCargando(true);
    try {
      const data = await obtenerTalleres();
      setTalleres(data || []);
    } catch (error) {
      console.error('Error cargando talleres:', error);
      setTalleres([]);
    } finally {
      setCargando(false);
    }
  };

  // Crear nuevo taller
  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      await crearTaller(formData);
      await connection(); // refrescar lista
      setFormData({
        titulo: '',
        descripcion: '',
        precio: '',
        fecha: '',
        categoria: '',
        imgTaller: '',
        direccion: '',
        lat: '',
        lng: ''
      });
      Swal.fire({
        title: 'Creado',
        text: 'Taller creado correctamente',
        icon: 'success',
        timer: 1400,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error creando taller:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo crear el taller',
        icon: 'error'
      });
    } finally {
      setCargando(false);
    }
  };

  // Rellenar formulario para editar
  const handleEditar = (id) => {
    const taller = talleres.find(t => t._id === id);
    if (!taller) return;

    setFormData({
      titulo: taller.titulo || '',
      descripcion: taller.descripcion || '',
      precio: taller.precio ?? '',
      fecha: taller.fecha ? new Date(taller.fecha).toISOString().split('T')[0] : '',
      categoria: taller.categoria || '',
      imgTaller: '',
      direccion: taller.localizacion?.direccion || '',

      lat: (taller.localizacion?.coordinates && taller.localizacion.coordinates[1]) ?? '',
      lng: (taller.localizacion?.coordinates && taller.localizacion.coordinates[0]) ?? ''
    });

    setEditandoId(id);
  };

  // Actualizar taller existente
  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!editandoId) return;

    try {
      setCargando(true);
      await actualizarTaller(editandoId, formData);
      await connection();
      setEditandoId(null);
      setFormData({
        titulo: '',
        descripcion: '',
        precio: '',
        fecha: '',
        categoria: '',
        imgTaller: '',
        direccion: '',
        lat: '',
        lng: ''
      });
      Swal.fire({
        title: 'Actualizado',
        text: 'Taller actualizado correctamente',
        icon: 'success',
        timer: 1400,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error actualizando taller:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el taller',
        icon: 'error'
      });
    } finally {
      setCargando(false);
    }
  };

  // Eliminar taller con popup
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
      await eliminarTaller(id);

      // refrescar lista de talleres
      const nuevosTalleres = await obtenerTalleres();
      setTalleres(nuevosTalleres || []);

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

  // Construye la localización usando los campos del formulario
  const localizacion = {
    type: 'Point',
    coordinates: [
      Number(formData.lng), // LONGITUD
      Number(formData.lat)  // LATITUD
    ],
    direccion: formData.direccion
  };

  // Carga inicial
  useEffect(() => {
    connection();
  }, []);

  return {
    localizacion,
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