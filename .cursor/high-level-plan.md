# Otter Curve - Implementation Plan

## Milestone 1: Interactive Map Foundation

**Goal:** Render interactive map of Germany with emphasis on bodies of water. Users can pan, zoom, and explore Germany's geography including water bodies, cities, and regional borders.

### 1.1 Project Setup

- Initialize TypeScript project with Webpack build system
- Install dependencies: Mapbox GL JS, TypeScript, webpack, webpack-dev-server
- Configure tsconfig.json for strict type checking
- Set up basic HTML/CSS structure with map container
- Configure Mapbox access token (environment variable)

### 1.2 Basic Map Rendering

- Create main TypeScript entry point
- Initialize Mapbox GL map centered on Germany (lat: 51.1657, lng: 10.4515)
- Configure map style with emphasis on water features
- Set appropriate zoom level and bounds to focus on Germany

### 1.3 Geographic Data Layers

- Add Germany water bodies layer from OpenStreetMap data (Overpass API)
- Style water bodies with prominent colors/emphasis
- Add cities layer with labels (major German cities)
- Add regional borders (Bundesländer) with subtle styling
- Implement custom layer styling to emphasize water features

### 1.4 Interactive Controls

- Implement smooth pan and zoom controls (built-in Mapbox controls)
- Add navigation controls UI
- Set min/max zoom levels for optimal UX
- Test interaction performance with all layers active

**Deliverable:** A polished, interactive map where users can explore Germany's geography with water bodies visually emphasized.

---

## Milestone 2: Water Body Data Extraction

**Goal:** Extract water body geometries, store their boundaries, and prepare them for game mechanics.

### 2.1 Data Processing Pipeline

- Create TypeScript interfaces for water body data structures (id, name, geometry, bounding box)
- Implement GeoJSON parser for water body geometries
- Extract and store coordinate arrays for each water body
- Build water body registry with metadata (name, location, size category)

### 2.2 Shape Rendering System

- Implement shape contour extraction from GeoJSON polygons
- Create isolated shape renderer (separate container for displaying water body outlines)
- Normalize coordinates for centered display in isolation view
- Add rotation capability for displaying shapes at different orientations

### 2.3 Click Detection

- Implement point-in-polygon algorithm for boundary checking
- Add click event handlers on map water bodies
- Test click detection accuracy on various water body sizes
- Handle edge cases (very small bodies, complex shapes)

**Deliverable:** System that can extract water body geometries, render them in isolation, and detect clicks within boundaries.

---

## Milestone 3: Core Game Mechanics

**Goal:** Transform the map viewer into an interactive game with challenges and scoring.

### 3.1 Challenge Generation

- Select random water body from dataset as target
- Display target shape in isolated view (separate container outside map)
- Optionally randomize orientation for added difficulty
- Store correct answer (water body id and boundary polygon)

### 3.2 Player Interaction & Validation

- Implement click/tap handler on map
- Check if clicked point is inside target water body boundary
- Provide immediate visual feedback (success/failure indication)
- Highlight correct water body location after guess

### 3.3 Game Loop & Scoring

- Implement round-based game structure
- Track player score (correct guesses, streak, accuracy)
- Add optional timer for time-based challenges
- Show feedback messages and transition to next round
- Implement "next challenge" flow

### 3.4 UI/UX Implementation

- Design clean game interface (challenge panel, isolated shape view, score display)
- Add animations for transitions and feedback
- Create hint system (show nearby city, zoom to region, show size category)
- Add difficulty selection (easy: large/distinctive bodies, hard: small/similar bodies)

**Deliverable:** Fully playable game where users identify water bodies by clicking their location on the map.

---

## Milestone 4: Enhanced Features & Polish

**Goal:** Add variety, difficulty progression, and performance improvements for production-ready game.

### 4.1 Difficulty System

- Categorize water bodies by size and complexity
- Implement easy mode (large, well-known bodies: Rhine, Danube, Bodensee)
- Implement medium mode (medium-sized rivers and lakes)
- Implement hard mode (small lakes, river segments)
- Add progressive difficulty that adapts to player performance

### 4.2 Additional Challenge Variations

- Partial shape display (show only a segment of the water body)
- Rotated/flipped shapes to increase difficulty
- Time pressure mode (limited time per guess)
- Multi-choice hints (show 3 possible locations)

### 4.3 Performance & Data Optimization

- Optimize water body data loading (lazy load by region)
- Implement efficient spatial lookup for click detection
- Reduce memory footprint for large polygon datasets
- Ensure smooth map interaction during gameplay

### 4.4 Testing & Polish

- Write unit tests for point-in-polygon algorithm
- Test edge cases (boundary clicks, very small bodies)
- Cross-browser testing
- Final UI/UX refinements and animations

**Deliverable:** Polished, performant game with multiple difficulty levels and smooth gameplay.

---

## Technical Architecture Notes

**Key Files Structure:**

```
src/
  index.ts                 # Entry point
  map/
    MapRenderer.ts         # Mapbox initialization & layer management
    DataLoader.ts          # OSM data fetching via Overpass API
  geometry/
    ShapeRenderer.ts       # Isolated shape rendering
    GeometryUtils.ts       # Point-in-polygon, coordinate transforms
  game/
    GameController.ts      # Game loop & state management
    ChallengeGenerator.ts  # Random water body selection
    ScoreTracker.ts        # Scoring system
    DifficultyManager.ts   # Difficulty categorization
  types/
    interfaces.ts          # Core TypeScript interfaces
```

**Data Flow:**

1. OSM data (GeoJSON) → DataLoader → Water body registry
2. ChallengeGenerator → Select random body → Render isolated shape
3. Player click → GeometryUtils.pointInPolygon() → Success/Fail
4. Result → ScoreTracker → UI update → Next challenge

**Performance Targets:**

- Map rendering: 60 FPS
- Click detection: < 50ms
- Challenge generation: < 100ms
- Initial data load: < 3s for Germany water bodies