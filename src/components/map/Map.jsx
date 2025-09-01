import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { CommonContext } from "../../context/commonContext";
import CardWrapper from "../cardWrapper/CardWrapper";
import 'leaflet/dist/leaflet.css';
import s from "./Map.module.scss";
import mapPin from "../../assets/img/mapPin.svg";

const FlyTo = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 10, { animate: true, duration: 1.5 });
  }
  return null;
};

export default function Map() {
  const { data } = useContext(CommonContext);

  let position = [50.4333, 30.5167];
  let cityName = "Київ";

  const pinIcon = L.icon({
    iconUrl: mapPin,
    iconSize: [36, 36],
    iconAnchor: [18, 34],
    popupAnchor: [0, -28],
  });

  if (data) {
    if (data.coord) {
      position = [data.coord.lat, data.coord.lon]
      cityName = data.name
    }
    else {
      position = [data.city.coord.lat, data.city.coord.lon]
      cityName = data.city.name
    }
  }

  return (
    <CardWrapper title="Погода на карті">
      <div className={s.mapContainer}>
        <MapContainer center={position} zoom={10} className={s.mapInner}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={pinIcon}>
            <Popup>
              <h2>{cityName}</h2>
            </Popup>
          </Marker>
          <FlyTo position={position} />
        </MapContainer>
      </div>
    </CardWrapper>
  );
}
