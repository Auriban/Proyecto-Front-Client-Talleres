import { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, LayerGroup, LayersControl, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const { BaseLayer, Overlay } = LayersControl;

/**
 * Espera una prop `localizacion` con al menos:
 *  - localizacion.coordinates: [lng, lat] 
 *  - localizacion.direccion: string
 * @param {Object} props
 * @param {{ coordinates: [number, number], direccion?: string }} props.localizacion 
 * @returns {JSX.Element|null} Componente mapa o null si no hay localizacion.
 */
export const Map = ({ localizacion }) => {
  // Si no hay localización, no renderizar nada.
  if (!localizacion) return null;

  // Se asume [lng, lat] en los datos; aquí se asignan y luego se invierten.
  const [lng, lat] = localizacion.coordinates;

  return (
    <MapContainer
      center={[lat, lng]} // Leaflet necesita [lat, lng]
      zoom={16}
      className="leaflet-container"
    >
      {/* Mosaico base de OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marcador en la localización con un popup que muestra la dirección */}
      <Marker position={[lat, lng]}>
        <Popup>
          <strong>{localizacion.direccion}</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
};