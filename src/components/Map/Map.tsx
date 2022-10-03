import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { FC, useEffect } from 'react';

import { selectSelectedOrder } from '../../store/orders/orders';
import { useAppDispatch, useAppSelector } from '../../store';
import { DEFAULT_CENTER, DEFAULT_ZOOM, HEIGHT_PADDING, MAP_URL } from './settings';
import { RouteLine } from './PolyLineRoute';
import { FETCH_ROUTING_ACTION } from '../../store/orders/sagas';
import { ScaleControl } from 'react-leaflet';
import useWindowDimensions from '../../hooks/useWindowDemension';
import { Map as leafletMan } from 'leaflet';

type Props = {
  sizes?: { width: number; height: number };
  setMap: ((map: leafletMan) => void) | undefined;
};

export const Map: FC<Props> = ({ sizes, setMap }) => {
  const dispatch = useAppDispatch();
  const routingPoints = useAppSelector((state) => state.orders.points);
  const selectedOrder = useAppSelector(selectSelectedOrder);
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if (selectedOrder) {
      dispatch({ type: FETCH_ROUTING_ACTION, payload: selectedOrder });
    }
  }, [dispatch, selectedOrder]);

  return (
    <div style={{ width: width, height: height - HEIGHT_PADDING * 1.5 }}>
      <MapContainer className="map" center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} zoomControl={false}
        whenCreated={setMap}
      >
        <ScaleControl />
        <TileLayer url={MAP_URL} />
        <RouteLine points={routingPoints} />
        <ZoomControl position='topright' />
      </MapContainer>
    </div>
  );
};
