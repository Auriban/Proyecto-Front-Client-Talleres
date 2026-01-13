import { useTalleresAdmin } from '../hooks/useTalleresAdmin';
import { useState } from 'react';
import './AdminPanelPages.css';

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000'; 

/**
 * Página de administración de talleres.
 *
 * - Muestra lista, formulario de crear y formulario de editar.
 * - Usa el hook useTalleresAdmin para obtener datos y handlers.
 */
export const AdminPanelPages = () => {
  const [vista, setVista] = useState('lista');

  // Extraemos todo lo necesario del hook que maneja la lógica CRUD
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

  // Mientras se cargan los talleres
  if (cargando) return <p>Cargando...</p>;

  /**
   * formatea la fecha para que se vea legible en la lista..
   */
  const formatDate = (value) => {
    if (!value) return 'Fecha no disponible';
    const d = (value instanceof Date) ? value : new Date(value);
    if (Number.isNaN(d)) return 'Fecha no disponible';
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="admin-panel">
      <h1>Admin Talleres</h1>

      {/* Pestañas para cambiar entre lista y formulario */}
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
              {/* Botón rápido para cambiar a la vista de crear */}
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
                    {/* Mostrar imagen; BASE_URL se añade porque el backend devuelve ruta relativa */}
                    <img
                      src={`${BASE_URL}${taller.imgTaller}`}
                      alt={taller.titulo}
                      width="50"
                    />

                    <div>
                      <strong>{taller.titulo}</strong><br />
                      {/* Datos resumidos: categoría, fecha y precio */}
                      {taller.categoria} • {fechaLegible} • €{taller.precio}
                      <br />
                      {/* Dirección si existe */}
                      <small>{taller?.localizacion?.direccion}</small>
                    </div>

                    <div className="acciones">
                      {/* Editar: rellena el formulario (handleEditar) y cambia a la vista 'editar' */}
                      <button
                        className="btn-editar"
                        onClick={() => {
                          handleEditar(taller._id);
                          setVista('editar');
                        }}
                      >
                        Editar
                      </button>

                      {/* Borrar: confirma y elimina (el hook maneja confirmación y recarga) */}
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

          {/* El onSubmit depende de si estamos editando o creando */}
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

            {/* Lat/Lng: se piden como números (step="any" para decimales) */}
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

            {/* Subida de imagen: guardamos el File en formData.imgTaller */}
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  // Guardar el archivo para enviarlo con FormData en el hook
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
                  // Volver a la lista y limpiar el formulario localmente
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