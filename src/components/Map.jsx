import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, LayerGroup, LayersControl, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const { BaseLayer, Overlay } = LayersControl;


export const Map = ({ localizacion }) => {
  if (!localizacion) return null;

  const [lng, lat] = localizacion.coordinates;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      className="leaflet-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lng]}>
        <Popup>
          <strong>{localizacion.direccion}</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

