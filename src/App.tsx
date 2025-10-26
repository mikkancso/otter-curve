import React from 'react';
import styled from '@emotion/styled';

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const App: React.FC = () => {
  return (
    <MapContainer id="map">
      {/* Mapbox will be initialized here in Milestone 1.2 */}
    </MapContainer>
  );
};

export default App;
