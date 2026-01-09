import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHomeContent } from "../hooks/useHomeContent";
import "./HomePage.css";

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

export const HomePage = () => {
  const { fetchHome } = useHomeContent();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchHome();
        setContent(data);
      } catch (error) {
        console.error('Error cargando home:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [fetchHome]);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>{content.titulo}</h1>
          <div className="hero-buttons">
            <Link to="/talleres" className="btn-secondary">
              Explorar Talleres →
            </Link>
          </div>
        </div>
        {content.portada && (
          <img src={content.portada} alt="Portada" className="hero-bg" />
        )}
      </section>

      <section className="talleres">
        <h2>ELIGE EL TALLER</h2>
        <div className="talleres-grid">
          <Link to="/talleres?categoria=desconexion">
            <div className="taller-public">
              <img 
                src={`${BASE_URL}${content.card1_imagen}`}  
                alt={content.card1_titulo}
              />
              <p>{content.card1_titulo}</p>
            </div>
          </Link>
          
          <Link to="/talleres?categoria=creatividad">
            <div className="taller-public">
              <img 
                src={`${BASE_URL}${content.card2_imagen}`} 
                alt={content.card2_titulo}
              />
              <p>{content.card2_titulo}</p>
            </div>
          </Link>
          
          <Link to="/talleres?categoria=deporte">
            <div className="taller-public">
              <img 
                src={`${BASE_URL}${content.card3_imagen}`}  
                alt={content.card3_titulo}
              />
              <p>{content.card3_titulo}</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};
