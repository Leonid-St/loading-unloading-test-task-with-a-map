import { Map as leafletMap } from 'leaflet';
import React, { useState } from 'react';
import { Map } from './components/Map/Map';
import SidebarComponent from './components/Map/SlidebarComponent';
function App() {
  const [map, setMap] = useState<leafletMap | null>(null);
  return (
    <div className="app">
      {map && <>
        <SidebarComponent map={map} />
      </>
      }
      <Map setMap={ setMap as ((map: leafletMap) => void) | undefined } />
    </div >
  );
}
export default App;
