import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useTalleres } from '../hooks/useTalleres';
import './TodosTalleresPage.css';

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

/**
 * Página pública con todos los talleres.
 *
 * - Usa el hook useTalleres (devuelve { talleres, cargando }).
 * - Permite filtrar por categoría 
 */
export const TodosTalleresPage = () => {
  // Obtener talleres y estado de carga desde el hook
  const { talleres, cargando } = useTalleres();

  // Leer ?categoria=... de la URL al montar
  const [searchParams] = useSearchParams();
  const [categoriaActiva, setCategoriaActiva] = useState(
    searchParams.get('categoria') || ''
  );

  if (cargando) return <div className="loading">Cargando talleres...</div>;

  // Filtrar según la categoría activa (si hay)
  const talleresFiltrados = categoriaActiva
    ? talleres.filter(taller => taller.categoria === categoriaActiva)
    : talleres;

  return (
    <div className="public-talleres">
      <header className="page-header">
        <h1>TODOS NUESTROS TALLERES</h1>
        <p>Explora todos los talleres disponibles</p>
      </header>

      <div className="talleres-categorias">
        <div
          className={`categoria-card ${categoriaActiva === '' ? 'active' : ''}`}
          onClick={() => setCategoriaActiva('')}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          Todas
        </div>

        <div
          className={`categoria-card ${categoriaActiva === 'creatividad' ? 'active' : ''}`}
          onClick={() => setCategoriaActiva('creatividad')}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          Creatividad
        </div>

        <div
          className={`categoria-card ${categoriaActiva === 'desconexion' ? 'active' : ''}`}
          onClick={() => setCategoriaActiva('desconexion')}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          Desconexión
        </div>

        <div
          className={`categoria-card ${categoriaActiva === 'deporte' ? 'active' : ''}`}
          onClick={() => setCategoriaActiva('deporte')}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          Deporte
        </div>
      </div>

      <section className="talleres-seccion">
        <div className="talleres-grid">
          {talleresFiltrados.map((taller) => (
            <article key={taller._id} className="taller-public">
              <img
                src={`${BASE_URL}${taller.imgTaller}`}
                alt={taller.titulo}
                width="50"
              />
              <div className="taller-content">
                <h3>{taller.titulo}</h3>
                <p>{taller.descripcion}</p>
                <Link to={`/talleres/${taller._id}`} className="btn-ver-taller">
                  Ver Taller
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};