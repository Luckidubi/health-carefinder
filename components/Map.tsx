import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

interface MapProps {
  lat: number;
  lng: number;
  name: string;
}
const icon = L.icon({ iconUrl: "/marker-icon.png" });
const Map: React.FC<MapProps> = ({ lat, lng , name}) => {
  const [position, setPosition] = useState<LatLngExpression>([lat, lng]);



  return (
    <MapContainer center={[lat, lng]} zoom={16} style={{ height: "50vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker key={lat} position={position} icon={icon}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
