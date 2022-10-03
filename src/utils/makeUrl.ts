import { LatLngTuple } from 'leaflet';


export const makeUrl = (apiUrl: string, loadLocation: LatLngTuple, unloadLocation: LatLngTuple) => {
  const url = new URL(apiUrl);
  url.pathname += `${loadLocation[1]},${loadLocation[0]};${unloadLocation[1]},${unloadLocation[0]}`;
  url.searchParams.append('overview', 'false');
  url.searchParams.append('alternatives', 'false');
  url.searchParams.append('steps', 'true');
  url.searchParams.append('geometries', 'geojson');
  return url.toString();
};
