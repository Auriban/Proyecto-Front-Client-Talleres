import { useState, useEffect } from 'react';
import './AdminPanelPages.css';

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

/**
 * Componente para editar el contenido de la página Home desde el admin.
 * - Permite cambiar textos y subir imágenes.
 * - Envía todo con FormData al backend (PUT).
 *
 * @returns {JSX.Element}
 */
export const HomeContentAdmin = () => {
  // Campos de texto del formulario (título y títulos de las 3 cards)
  const [formData, setFormData] = useState({
    titulo: '',
    card1_titulo: 'Creatividad',
    card2_titulo: 'Desconexión',
    card3_titulo: 'Deporte'
  });

  // Archivos seleccionados para portada y cards
  const [images, setImages] = useState({
    portada: null,
    card1_imagen: null,
    card2_imagen: null,
    card3_imagen: null
  });

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Función que carga el contenido actual del backend.
  // Se declara antes del useEffect para evitar errores de referencia.
  const fetchHome = async () => {
    setCargando(true);
    try {
      const res = await fetch(`${BASE_URL}/api/home/public`);
      const data = await res.json();
      // Si el backend devolvió datos, los ponemos en el formulario
      if (data?.ok && data.data) {
        setFormData({
          titulo: data.data.titulo || '',
          card1_titulo: data.data.card1_titulo || '',
          card2_titulo: data.data.card2_titulo || '',
          card3_titulo: data.data.card3_titulo || ''
        });
      }
    } catch (err) {
      console.error('Error cargando contenido Home:', err);
      setError('Error cargando contenido');
    } finally {
      setCargando(false);
    }
  };

  // Al montar > pedir los datos del home
  useEffect(() => {
    fetchHome();
  }, []);

  // Maneja cuando el usuario selecciona un archivo para cualquiera de los campos de imagen
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setImages(prev => ({ ...prev, [field]: file }));
    }
  };

  // Enviar el formulario al backend usando FormData (imágenes + textos)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    const formDataToSend = new FormData();
    // Campos de texto
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('card1_titulo', formData.card1_titulo);
    formDataToSend.append('card2_titulo', formData.card2_titulo);
    formDataToSend.append('card3_titulo', formData.card3_titulo);

    // Añadir archivos solo si el admin seleccionó uno nuevo
    if (images.portada) formDataToSend.append('portada', images.portada);
    if (images.card1_imagen) formDataToSend.append('card1_imagen', images.card1_imagen);
    if (images.card2_imagen) formDataToSend.append('card2_imagen', images.card2_imagen);
    if (images.card3_imagen) formDataToSend.append('card3_imagen', images.card3_imagen);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/home/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Error al actualizar Home');
      }

      // Si todo bien refrescar los datos desde el servidor
      await fetchHome();
      // limpiar selección de archivos para evitar re-subida 
      setImages({ portada: null, card1_imagen: null, card2_imagen: null, card3_imagen: null });
      alert('Home actualizado correctamente');
    } catch (err) {
      console.error('Error guardando Home:', err);
      alert('Error de conexión o al guardar');
      setError('Error al guardar');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <div className="admin-panel"><h1>Cargando...</h1></div>;

  return (
    <div className="admin-panel">
      <h1>Editar Home</h1>

      {/* Formulario principal */}
      <form onSubmit={handleSubmit} className="form-taller">
        <div className="form-group">
          <label className="label-titulo">Título Principal:</label>
          <input
            className="input-titulo"
            type="text"
            placeholder="Título hero"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="label-archivo">Portada:</label>
          <input
            className="input-imagen"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'portada')}
          />
          {/* Si hay archivo seleccionado mostramos su nombre */}
          {images.portada && <small className="archivo-seleccionado">{images.portada.name}</small>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label-card">Card 1:</label>
            <input
              className="input-card-titulo"
              type="text"
              placeholder="Título Card 1"
              value={formData.card1_titulo}
              onChange={(e) => setFormData({ ...formData, card1_titulo: e.target.value })}
            />
            <input
              className="input-imagen"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'card1_imagen')}
            />
            {images.card1_imagen && <small className="archivo-seleccionado">{images.card1_imagen.name}</small>}
          </div>

          <div className="form-group">
            <label className="label-card">Card 2:</label>
            <input
              className="input-card-titulo"
              type="text"
              placeholder="Título Card 2"
              value={formData.card2_titulo}
              onChange={(e) => setFormData({ ...formData, card2_titulo: e.target.value })}
            />
            <input
              className="input-imagen"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'card2_imagen')}
            />
            {images.card2_imagen && <small className="archivo-seleccionado">{images.card2_imagen.name}</small>}
          </div>
        </div>

        <div className="form-group">
          <label className="label-card">Card 3:</label>
          <input
            className="input-card-titulo"
            type="text"
            placeholder="Título Card 3"
            value={formData.card3_titulo}
            onChange={(e) => setFormData({ ...formData, card3_titulo: e.target.value })}
          />
          <input
            className="input-imagen"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'card3_imagen')}
          />
          {images.card3_imagen && <small className="archivo-seleccionado">{images.card3_imagen.name}</small>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-guardar" disabled={cargando}>
            {cargando ? 'Guardando...' : 'Actualizar Home'}
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};