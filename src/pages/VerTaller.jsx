import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTallerDetalle } from '../hooks/useTallerDetalle';
import { useInscripciones } from '../hooks/useInscripciones'; 
import Swal from 'sweetalert2'; 
import './VerTaller.css';

const BASE_URL = import.meta.env.VITE_URL || 'http://localhost:3000';

export const VerTaller = () => {
    const { id } = useParams();
    const { taller, cargando, error } = useTallerDetalle(id); 
    const { inscribirse, cargando: cargandoInscripcion } = useInscripciones(); 
    const { usuario } = useAuth(); 
    
    if (cargando) return <div className="loading">Cargando...</div>; 
    if (error || !taller) return <div className="error">Taller no encontrado</div>;

    const handleInscribirse = async () => {
        if (!usuario) {
            Swal.fire({
                title: '🔐 Login requerido',
                text: 'Debes iniciar sesión para inscribirte',
                icon: 'info',
                confirmButtonColor: '#A84628'
            });
            return;
        }

        const resultado = await inscribirse(taller._id);
        
        if (resultado.ok) {
            // INSCRITO 
            Swal.fire({
                title: '¡Inscrito correctamente!',
                icon: 'success',
                draggable: true,  
                confirmButtonColor: '#10b981',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            if (resultado.msg.includes('Ya estás inscrito')) {
                // YA INSCRITO
                Swal.fire({
                    icon: 'error',
                    title: '¡Ya estás inscrito!',
                    text: 'Ya tienes este taller en Mis Talleres',
                    footer: 'Revisa tu lista de talleres'
                });
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: resultado.msg || 'Error al inscribir',
                });
            }
        }
    };

    return (
        <section className="taller-detalle">
            <div className="taller-info">
                <h1>{taller.titulo}</h1>
                <p>{taller.descripcion}</p>
                <p><strong>FECHA:</strong> {taller.fecha}</p>
                <p><strong>PRECIO:</strong> {taller.precio}€</p>
                
                {!usuario ? (
                    <div className="login-requerido">
                        <button className="btn-login" disabled>
                            🔐 Inicia sesión para inscribirte
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={handleInscribirse}
                        disabled={cargandoInscripcion}
                        className="btn-inscribirse"
                    >
                        {cargandoInscripcion 
                            ? 'Inscribiendo...' 
                            : 'Inscribirse'
                        }
                    </button>
                )}
                
            </div>
            <div className="taller-imagen">
                <img src={`${BASE_URL}${taller.imgTaller}`} alt={taller.titulo} />
            </div>
        </section>
    );
};
