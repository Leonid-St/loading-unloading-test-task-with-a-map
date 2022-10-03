import { IOrder } from './IOrder';
import { LatLngExpression } from 'leaflet';

export interface IOrdersState {
  items: IOrder[];
  selectedOrder: IOrder | null;
  points: LatLngExpression[][] | null;
}
