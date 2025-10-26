import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders the map container', () => {
        render(<App />);
        
        const mapContainer = screen.getByTestId('map-container');
        expect(mapContainer).toBeInTheDocument();
        expect(mapContainer).toHaveAttribute('id', 'map');
    });

    it('has full-screen styling', () => {
        render(<App />);
        
        const mapContainer = screen.getByTestId('map-container');
        expect(mapContainer).toHaveStyle({
            width: '100vw',
            height: '100vh',
            margin: '0px',
            padding: '0px',
        });
    });
});
