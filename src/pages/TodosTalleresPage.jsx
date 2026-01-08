import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useTalleres } from '../hooks/useTalleres';
import './TodosTalleresPage.css';

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

export const TodosTalleresPage = () => {
  const { talleres, loading, error, recargar } = useTalleres();
  const [searchParams] = useSearchParams();
  const [categoriaActiva, setCategoriaActiva] = useState(
    searchParams.get('categoria') || ''
  );

  if (loading) return <div className="loading">Cargando talleres...</div>;
  
  if (error) return (
    <div className="error">
      <h2>Error al cargar</h2>
      <button onClick={recargar}>Reintentar</button>
    </div>
  );

  const talleresFiltrados = categoriaActiva 
    ? talleres.filter(taller => taller.categoria === categoriaActiva)
    : talleres;

  return (
    <div className="public-talleres">
      <header className="page-header">
        <h1>TODOS NUESTROS TALLERES</h1>
        <p>Explora todos nuestros talleres disponibles</p>
      </header>

      <div className="talleres-categorias">
        <div 
          className={`categoria-card ${categoriaActiva === '' ? 'active' : ''}`}
          onClick={() => setCategoriaActiva('')}
        >
          Todas
        </div>
        <div 
          className={`categoria-card ${categoriaActiva === 'creatividad' ? 'active' : ''}`}
          onClick={() => setCategoriaActiva('creatividad')}
        >
          Creatividad
        </div>
        <div 
          className={`categoria-card ${categoriaActiva === 'desconexion' ? 'active' : ''}`}
          onClick={() => setCategoriaActiva('desconexion')}
        >
          Desconexión
        </div>
        <div 
          className={`categoria-card ${categoriaActiva === 'deporte' ? 'active' : ''}`}
          onClick={() => setCategoriaActiva('deporte')}
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
                <button className="btn-ver-taller">
                  <Link to={`/talleres/${taller._id}`}>Ver Taller</Link> 
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
