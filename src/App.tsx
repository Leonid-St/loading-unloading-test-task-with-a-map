import React, { useState } from 'react';
import { Map } from './components/Map/Map';
import SidebarComponent from './components/Map/SlidebarComponent';
function App() {
  const [map, setMap] = useState(null);
  return (
    <div className="app">
      {map && <>
        <SidebarComponent map={map} />
      </>
      }
      <Map setMap={setMap} />
    </div >
  );
}
export default App;
