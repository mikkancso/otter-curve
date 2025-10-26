import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { MapRenderer } from './map/MapRenderer';

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const App: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRendererRef = useRef<MapRenderer | null>(null);

  useEffect(() => {
    const accessToken = process.env['MAPBOX_ACCESS_TOKEN'];

    if (!accessToken) {
      console.error('MAPBOX_ACCESS_TOKEN is not defined');
      return;
    }

    if (!mapContainerRef.current) {
      console.error('Map container element not found');
      return;
    }

    try {
      // Initialize the map renderer
      mapRendererRef.current = new MapRenderer(
        mapContainerRef.current,
        accessToken
      );
      mapRendererRef.current.initialize();
    } catch (error) {
      console.error('Failed to initialize map:', error);
    }

    // Cleanup on unmount
    return () => {
      if (mapRendererRef.current) {
        mapRendererRef.current.dispose();
        mapRendererRef.current = null;
      }
    };
  }, []);

  return (
    <MapContainer ref={mapContainerRef} data-testid="map-container">
      {/* Mapbox map will be rendered here */}
    </MapContainer>
  );
};

export default App;
