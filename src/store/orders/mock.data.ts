import { IOrder } from '../../interfaces/IOrder';
import { IOrderPoint } from '../../interfaces/IOrderPoint';

export const LOAD_POINTS: IOrderPoint[] = [
  {
    id: 1,
    title: 'Москва',
    location: [55.751865, 37.611009],
  },
  {
    id: 2,
    title: 'Ярославль',
    location: [57.627091, 39.867153],
  },
  {
    id: 3,
    title: 'Великий Новгород',
    location: [58.527018, 31.241459],
  },
  {
    id: 4,
    title: 'Воронеж',
    location: [51.637617, 39.199716],
  },
];

export const UNLOAD_POINTS: IOrderPoint[] = [
  {
    id: 1,
    title: 'Москва',
    location: [55.751865, 37.611009],
  },
  {
    id: 2,
    title: 'Ярославль',
    location: [57.627091, 39.867153],
  },
  {
    id: 3,
    title: 'Великий Новгород',
    location: [58.527018, 31.241459],
  },
  {
    id: 4,
    title: 'Воронеж',
    location: [51.637617, 39.199716],
  },
];

export const ORDERS: IOrder[] = [
  {
    id: 1,
    name: 'Заказ 1',
    loadPoint: 1,
    unloadPoint: 2,
  },
  {
    id: 2,
    name: 'Заказ 2',
    loadPoint: 2,
    unloadPoint: 3,
  },
  {
    id: 3,
    name: 'Заказ 3',
    loadPoint: 4,
    unloadPoint: 2,
  },
];
