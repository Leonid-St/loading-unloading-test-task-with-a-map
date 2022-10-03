import { Polyline, Marker, Popup } from 'react-leaflet';
import { FC } from 'react';
import { LatLngExpression } from 'leaflet';

const redOptions = { color: 'red' };

type Props = {
  points: LatLngExpression[][] | null;
};
export const RouteLine: FC<Props> = ({ points }) => {
  if (!points) return null;
  const loadPoint = points[0][0];
  const unloadPoint = points[points.length - 1][points[points.length - 1].length - 1];
  return (
    <>
      <Polyline pathOptions={redOptions} positions={points} />
      <Marker position={loadPoint}>
        <Popup>Точка загрузки</Popup>
      </Marker>
      <Marker position={unloadPoint}>
        <Popup>Точка разгрузки</Popup>
      </Marker>
    </>
  );
};
