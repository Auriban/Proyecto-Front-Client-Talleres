import { useState, useEffect } from 'react';
import {useHomeContent} from '../hooks/useHomeContent';
import './AdminPanelPages.css';

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000'; 

export const HomeContentAdmin = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    card1_titulo: 'Creatividad',
    card2_titulo: 'Desconexión', 
    card3_titulo: 'Deporte'
  });
  const [images, setImages] = useState({
    portada: null,
    card1_imagen: null,
    card2_imagen: null,
    card3_imagen: null
  });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/home/public`); 
      const data = await res.json();
      if (data.ok && data.data) {
        setFormData({
          titulo: data.data.titulo || '',
          card1_titulo: data.data.card1_titulo || '',
          card2_titulo: data.data.card2_titulo || '',
          card3_titulo: data.data.card3_titulo || ''
        });
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setCargando(false);
    }
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) setImages({ ...images, [field]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    
    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('card1_titulo', formData.card1_titulo);
    formDataToSend.append('card2_titulo', formData.card2_titulo);
    formDataToSend.append('card3_titulo', formData.card3_titulo);

    if (images.portada) formDataToSend.append('portada', images.portada);
    if (images.card1_imagen) formDataToSend.append('card1_imagen', images.card1_imagen);
    if (images.card2_imagen) formDataToSend.append('card2_imagen', images.card2_imagen);
    if (images.card3_imagen) formDataToSend.append('card3_imagen', images.card3_imagen);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/home/`, { 
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      });

    } catch (err) {
      alert('Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <div className="admin-panel"><h1>Cargando...</h1></div>;

return (
  <div className="admin-panel">
    <h1>Editar Home</h1>
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
    </form>
  </div>
);

};
