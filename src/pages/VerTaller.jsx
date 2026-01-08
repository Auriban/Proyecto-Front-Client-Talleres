import { useParams } from 'react-router-dom';
import { useTallerDetalle } from '../hooks/useTallerDetalle';
import './VerTaller.css';

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

export const VerTaller = () => {
    const { id } = useParams();
    //console.log('ID de la URL', id);
    
    const { taller, cargando, error } = useTallerDetalle(id); 
    
    //console.log('el hok', { taller, cargando, error });
    
    if (cargando) return <div className="loading">Cargando...</div>; 
    if (error || !taller) return <div className="error">Taller no encontrado</div>;

    return (
        <section className="taller-detalle">
            <div className="taller-info">
                <h1>{taller.titulo}</h1>
                <p>{taller.descripcion}</p>
                <p><strong>FECHA:</strong> {taller.fecha}</p>
                <p><strong>PRECIO:</strong> {taller.precio}€</p>
                <button className="btn-inscribirse">Inscribirse</button>
            </div>
            <div className="taller-imagen">
                <img src={`${BASE_URL}${taller.imgTaller}`} alt={taller.titulo} />
            </div>
        </section>
    );
};
