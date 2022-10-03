import { LatLngTuple } from 'leaflet';

export interface IOrderPoint {
  id: number;
  title: string;
  location: LatLngTuple;
}
