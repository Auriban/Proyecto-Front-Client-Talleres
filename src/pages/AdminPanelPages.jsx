import { useTalleresAdmin } from '../hooks/useTalleresAdmin';
import { useState } from 'react';
import './AdminPanelPages.css';

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
  } = useTalleresAdmin();

  if (cargando) return <p>Cargando...</p>;

    // Formatea de la fecha para mostrarla legible 
    const formatDate = (value) => {
      if (!value) return 'Fecha no disponible';
      const d = (value instanceof Date) ? value : new Date(value);
      if (Number.isNaN(d)) return 'Fecha no disponible';
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    };

  return (
    <div className="admin-panel">
      <h1>Admin Talleres</h1>

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
            <p>
              No hay talleres.
              <button onClick={() => setVista('crear')}>
                Crear el primero
              </button>
            </p>
          ) : (
            <div className="tabla-talleres">
              {talleres.map(taller => {
                const fechaLegible = formatDate(taller.fecha);
                return (
                  <div key={taller._id} className="taller-item">
                    <img
                      src={`${BASE_URL}${taller.imgTaller}`}
                      alt={taller.titulo}
                      width="50"
                    />

                    <div>
                      <strong>{taller.titulo}</strong><br />
                      {taller.categoria} • {fechaLegible} • €{taller.precio}
                      <br />
                      <small>{taller?.localizacion?.direccion}</small>
                    </div>

                    <div className="acciones">
                      <button
                        className="btn-editar"
                        onClick={() => {
                          handleEditar(taller._id);
                          setVista('editar');
                        }}
                      >
                        Editar
                      </button>

                      <button
                        className="btn-borrar"
                        onClick={() => handleEliminar(taller._id)}
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {(vista === 'crear' || vista === 'editar') && (
        <div className="formulario-taller">
          <h2>{vista === 'crear' ? '+ Nuevo Taller' : 'Editar Taller'}</h2>

          <form
            className="form-taller"
            onSubmit={vista === 'editar' ? handleActualizar : handleCrear}
          >
            <input
              type="text"
              placeholder="Título del taller"
              value={formData.titulo}
              onChange={e =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Descripción completa"
              rows="4"
              value={formData.descripcion}
              onChange={e =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              required
            />

            <div className="form-row">
              <input
                type="number"
                placeholder="Precio (€)"
                value={formData.precio}
                onChange={e =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                required
              />

              <input
                type="date"
                value={formData.fecha}
                onChange={e =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
                required
              />
            </div>

            <input
              type="text"
              placeholder="Categoría (ej: Arte, Deporte...)"
              value={formData.categoria}
              onChange={e =>
                setFormData({ ...formData, categoria: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Dirección (ej: Plaza Mayor, Salamanca)"
              value={formData.direccion}
              onChange={e =>
                setFormData({ ...formData, direccion: e.target.value })
              }
              required
            />

            <div className="form-row">
              <input
                type="number"
                step="any"
                placeholder="Latitud"
                value={formData.lat}
                onChange={e =>
                  setFormData({ ...formData, lat: e.target.value })
                }
                required
              />

              <input
                type="number"
                step="any"
                placeholder="Longitud"
                value={formData.lng}
                onChange={e =>
                  setFormData({ ...formData, lng: e.target.value })
                }
                required
              />
            </div>

            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={e => {
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
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
