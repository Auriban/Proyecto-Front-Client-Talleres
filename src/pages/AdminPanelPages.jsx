import { useTalleresAdmin } from '../hooks/useTalleresAdmin';
import { useState } from 'react';
import './AdminPanelPages.css'

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000'; 

export const AdminPanelPages = () => {
  const [vista, setVista] = useState('lista');
  const {
    talleres,
    cargando,
    formData,
    setFormData,
    handleCrear,
    handleEditar,
    handleActualizar,
    handleEliminar,
    editandoId,
    connection
  } = useTalleresAdmin();

  if (cargando) return <p>Cargando...</p>;

  return (
    <div className="admin-panel">
      <h1> Admin Talleres</h1>

      <div className="tabs">
        <button 
          className={vista === 'lista' ? 'active' : ''} 
          onClick={() => setVista('lista')}
        >
          Lista Talleres
        </button>
        <button 
          className={vista === 'crear' ? 'active' : ''} 
          onClick={() => setVista('crear')}
        >
          + Nuevo Taller
        </button>
      </div>

      {vista === 'lista' && (
        <div className="lista-talleres">
          <h2>Actualmente hay {talleres.length} talleres</h2>
          
          {talleres.length === 0 ? (
            <p>No hay talleres. <button onClick={() => setVista('crear')}>Crear el primero</button></p>
          ) : (
            <div className="tabla-talleres">
              {talleres.map(taller => (
                <div key={taller._id} className="taller-item">
                  <img 
                  src={`${BASE_URL}${taller.imgTaller}`} 
                  alt={taller.titulo} 
                  width="50" 
                />

                  <div>
                    <strong>{taller.titulo}</strong><br />
                    {taller.categoria} • {taller.fecha} • €{taller.precio}
                  </div>
                  <div className="acciones">
                    <button 
                      onClick={() => {
                        handleEditar(taller._id);
                        setVista('editar');
                      }}
                      className="btn-editar"
                    >
                    Editar
                    </button>
                    <button 
                      onClick={() => handleEliminar(taller._id)}
                      className="btn-borrar"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}


    {(vista === 'crear' || vista === 'editar') && (
      <div className="formulario-taller">
        <h2>{vista === 'crear' ? '+ Nuevo Taller' : 'Editar Taller'}</h2>
        
        <form onSubmit={vista === 'editar' ? handleActualizar : handleCrear} className="form-taller">
          <input
            className="input-titulo"
            type="text"
            placeholder="Título del taller"
            value={formData.titulo}
            onChange={e => setFormData({ ...formData, titulo: e.target.value })}
            required
          />
          
          <textarea
            className="textarea-descripcion"
            placeholder="Descripción completa"
            value={formData.descripcion}
            onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
            rows="4"
            required
          />
          
          <div className="form-row">
            <input
              className="input-precio"
              type="number"
              placeholder="Precio (€)"
              value={formData.precio}
              onChange={e => setFormData({ ...formData, precio: e.target.value })}
              required
            />
            <input
              className="input-fecha"
              type="date"
              value={formData.fecha}
              onChange={e => setFormData({ ...formData, fecha: e.target.value })}
              required
            />
          </div>
          
          <input
            className="input-categoria"
            type="text"
            placeholder="Categoría (ej: Deporte, Creatividad...)"
            value={formData.categoria}
            onChange={e => setFormData({ ...formData, categoria: e.target.value })}
            required
          />
          
          <input
            className="input-imagen"
            type="file"                    
            accept="image/jpeg,image/jpg,image/png"      
            onChange={(e) => {                   
              const file = e.target.files[0];
              if (file) {
                setFormData({ ...formData, imgTaller: file });  
              }
            }}
          />

          <div className="form-buttons">
            <button type="submit" className="btn-guardar">
              {vista === 'editar' ? 'Actualizar' : 'Crear'}
            </button>
            <button 
              type="button" 
              className="btn-cancelar"
              onClick={() => {
                setVista('lista');
                setFormData({ titulo: '', descripcion: '', precio: '', fecha: '', categoria: '', imgTaller: '' });
              }}
            >
              x Cancelar
            </button>
          </div>
        </form>
      </div>
    )}

    </div>
  );
};
