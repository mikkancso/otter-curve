import mapboxgl from 'mapbox-gl';

export class MapRenderer {
  private map: mapboxgl.Map | null = null;

  constructor(
    private container: HTMLElement,
    private accessToken: string
  ) {
    if (!container) {
      throw new Error('Container element is required');
    }
    if (!accessToken) {
      throw new Error('Mapbox access token is required');
    }
  }

  initialize(): void {
    // Set Mapbox access token
    mapboxgl.accessToken = this.accessToken;

    // Create custom style emphasizing water features
    const customStyle: mapboxgl.Style = {
      version: 8,
      sources: {
        'mapbox-streets': {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        },
      },
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: {
            'background-color': '#f8f9fa',
          },
        },
        {
          id: 'landcover',
          type: 'fill',
          source: 'mapbox-streets',
          'source-layer': 'landcover',
          paint: {
            'fill-color': '#e9ecef',
            'fill-opacity': 0.8,
          },
        },
        {
          id: 'water',
          type: 'fill',
          source: 'mapbox-streets',
          'source-layer': 'water',
          paint: {
            'fill-color': '#4A90E2',
            'fill-opacity': 0.9,
          },
        },
        {
          id: 'water-outline',
          type: 'line',
          source: 'mapbox-streets',
          'source-layer': 'water',
          paint: {
            'line-color': '#2E5BBA',
            'line-width': 1,
          },
        },
      ],
    };

    // Initialize the map
    this.map = new mapboxgl.Map({
      container: this.container,
      style: customStyle,
      center: [10.4515, 51.1657], // Germany center (lng, lat)
      zoom: 4,
      minZoom: 4,
      maxZoom: 12,
      maxBounds: [
        [0, 40.0], // Southwest corner
        [25.0, 80.0], // Northeast corner
      ],
    });

    // Add navigation controls
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }

  dispose(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  getMap(): mapboxgl.Map | null {
    return this.map;
  }
}
