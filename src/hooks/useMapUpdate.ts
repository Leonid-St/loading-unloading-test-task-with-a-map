import { useEffect, useRef } from 'react';
import { LatLngExpression, Map } from 'leaflet';

export const useMapUpdate = (sizes: { width: number; height: number }, center: LatLngExpression) => {
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    if (mapRef?.current) {
      mapRef.current.setView(center, mapRef.current.getZoom());
    }
  }, [center]);

  useEffect(() => {
    if (mapRef?.current) {
      mapRef.current.invalidateSize();
    }
  }, [sizes]);

  return mapRef;
};
