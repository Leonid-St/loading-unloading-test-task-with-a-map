import { IOrder } from '../interfaces/IOrder';
import { IResponseRoute } from '../interfaces/IResponseRoute';
import { LOAD_POINTS, UNLOAD_POINTS } from '../store/orders/mock.data';
import { makeUrl } from '../utils/makeUrl';

const API_URL = 'https://routing.openstreetmap.de/routed-car/route/v1/driving/';

export const Api = {
  fetchRoutingApi: async (order: IOrder): Promise<IResponseRoute> => {
    const { loadPoint, unloadPoint } = order;
    const { location: loadLocation } = LOAD_POINTS.find((x) => x.id === loadPoint)!;
    const { location: unloadLocation } = UNLOAD_POINTS.find((x) => x.id === unloadPoint)!;
    const url = makeUrl(API_URL, loadLocation, unloadLocation);
    const response = await fetch(url);
    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData);
    return responseData;
  },
};
