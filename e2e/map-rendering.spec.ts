import { test, expect } from '@playwright/test';

test.describe('Map Rendering', () => {
    test('should render map with basic functionality', async ({ page }) => {
        // Navigate to the application
        await page.goto('/');

        // Wait for the page to load without errors
        await expect(page).toHaveTitle(
            'Otter Curve - Geographic Pattern Matching Game'
        );

        // Verify map container is visible
        const mapContainer = page.locator('[data-testid="map-container"]');
        await expect(mapContainer).toBeVisible();

        // Wait for Mapbox canvas element to be rendered
        const mapboxCanvas = page.locator('.mapboxgl-canvas');
        await expect(mapboxCanvas).toBeVisible();

        // Verify map container has proper dimensions
        const mapContainerBox = await mapContainer.boundingBox();
        expect(mapContainerBox?.width).toBeGreaterThan(0);
        expect(mapContainerBox?.height).toBeGreaterThan(0);

        // Wait for map to be fully loaded (tiles loaded)
        await page.waitForFunction(() => {
            const canvas = document.querySelector('.mapboxgl-canvas');
            return canvas && canvas.getAttribute('width') !== '0';
        });

        // Verify map controls are present
        const zoomInButton = page.locator('.mapboxgl-ctrl-zoom-in');
        const zoomOutButton = page.locator('.mapboxgl-ctrl-zoom-out');
        await expect(zoomInButton).toBeVisible();
        await expect(zoomOutButton).toBeVisible();

        // Test zoom functionality
        await zoomInButton.click();
        await page.waitForTimeout(500); // Wait for zoom animation

        await zoomOutButton.click();
        await page.waitForTimeout(500); // Wait for zoom animation

        // Verify no console errors occurred
        const logs: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                logs.push(msg.text());
            }
        });

        // Wait a bit to catch any delayed errors
        await page.waitForTimeout(1000);

        // Filter out known Mapbox warnings that don't affect functionality
        const criticalErrors = logs.filter(
            log =>
                !log.includes('mapbox-gl') &&
                !log.includes('WebGL') &&
                !log.includes('deprecated')
        );

        expect(criticalErrors).toHaveLength(0);
    });

    test('should handle map interaction', async ({ page }) => {
        await page.goto('/');

        // Wait for map to load
        await page.waitForSelector('.mapboxgl-canvas');
        await page.waitForFunction(() => {
            const canvas = document.querySelector('.mapboxgl-canvas');
            return canvas && canvas.getAttribute('width') !== '0';
        });

        // Test panning by dragging
        const mapContainer = page.locator('[data-testid="map-container"]');
        const mapContainerBox = await mapContainer.boundingBox();

        if (mapContainerBox) {
            const centerX = mapContainerBox.x + mapContainerBox.width / 2;
            const centerY = mapContainerBox.y + mapContainerBox.height / 2;

            // Perform a drag gesture
            await page.mouse.move(centerX, centerY);
            await page.mouse.down();
            await page.mouse.move(centerX + 50, centerY + 50);
            await page.mouse.up();

            // Wait for pan animation
            await page.waitForTimeout(500);

            // Verify map is still responsive
            await expect(mapContainer).toBeVisible();
        }
    });
});
