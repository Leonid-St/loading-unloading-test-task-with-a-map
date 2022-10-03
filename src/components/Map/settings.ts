import L, { LatLngTuple } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export const HEIGHT_PADDING = 64;
export const DEFAULT_ZOOM = 5;
export const DEFAULT_CENTER: LatLngTuple = [55.750839, 37.615612];
export const MAP_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

L.Marker.prototype.options.icon = DefaultIcon;
