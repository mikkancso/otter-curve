# Otter Curve - Geographic Pattern Matching Game

## 🎯 Project Overview

**Otter Curve** is a TypeScript-based geographic pattern matching game that challenges players to identify water bodies (rivers, lakes) on an interactive map of Germany. The game presents a water body outside the map context, and players must locate it by recognizing its unique geometric shape.

## 🧮 Core Algorithmic Challenges

This project focuses on **custom geometric algorithms** rather than well-known solutions:

### 1. **Geographic Shape Fingerprinting**
- Create unique "signatures" for water bodies that are invariant to scale/rotation
- Develop metrics for shape characteristics: perimeter, area, compactness, coastline complexity
- Implement fractal dimension calculations for coastline complexity

### 2. **Multi-Scale Pattern Matching**
- Match geographic patterns at different zoom levels
- Normalize shapes for consistent comparison across scales
- Handle coordinate transformations between geographic and screen space

### 3. **Fuzzy Geographic Matching**
- Implement "close enough" matching algorithms
- Calculate similarity scores between target and player selection
- Handle partial matches and edge cases

### 4. **Real-time Spatial Indexing**
- Efficiently search through hundreds of water bodies
- Implement spatial data structures for fast geographic queries
- Optimize for interactive performance

## 🎮 Game Mechanics

- **Interactive Map**: Zoom, pan, and explore Germany's geography
- **Water Body Focus**: Rivers and lakes are prominently displayed
- **Shape Recognition**: Players identify water bodies by their unique geometric properties
- **Progressive Difficulty**: Challenges adapt based on player performance
- **Multiple Challenge Types**:
  - Complete shape matching
  - Partial pattern recognition
  - Multi-scale challenges
  - Distorted shape recognition

## 🛠 Technical Stack

- **Language**: TypeScript
- **3D/2D Graphics**: Three.js (for 2D map rendering and interaction)
- **Geographic Data**: OpenStreetMap, Natural Earth, or similar
- **Build System**: Modern TypeScript toolchain
- **Testing**: Unit tests for geometric algorithms

## 🎯 Learning Objectives

1. **2D/3D Geometric Algorithms**: Implement custom algorithms for shape analysis
2. **Geographic Data Processing**: Work with real-world spatial data
3. **Interactive Graphics**: Build responsive map interfaces
4. **Algorithm Optimization**: Create efficient spatial indexing and matching
5. **Pattern Recognition**: Develop custom similarity metrics for geographic shapes

## 🚀 Development Phases

### Phase 1: Foundation
- Set up TypeScript + Three.js project
- Acquire and process Germany's water body data
- Build basic map renderer with water bodies highlighted

### Phase 2: Core Algorithms
- Implement shape fingerprinting algorithms
- Build pattern matching engine
- Add interactive selection and comparison

### Phase 3: Game Mechanics
- Implement game loop and scoring
- Add progressive difficulty
- Create multiple challenge types

### Phase 4: Polish & Optimization
- Performance optimization
- UI/UX improvements
- Advanced geometric challenges

## 🧪 Custom Algorithm Examples

```typescript
interface WaterBodyFingerprint {
  perimeter: number;
  area: number;
  compactness: number; // How "round" vs "elongated"
  coastlineComplexity: number; // Fractal dimension
  majorAxis: Vector2;
  minorAxis: Vector2;
}

interface PatternMatcher {
  matchAtScale(target: WaterBody, candidate: WaterBody, scale: number): number;
  normalizeForScale(shape: WaterBody, targetScale: number): WaterBody;
}
```

## 🎯 Success Criteria

- Players can successfully identify water bodies by shape
- Game provides engaging geometric challenges
- Algorithms are custom and not based on well-known solutions
- Performance is smooth for interactive gameplay
- Code demonstrates advanced TypeScript and geometric programming skills

## 🌟 Why This Project Matters

This project combines **real-world geography** with **custom algorithmic challenges**, creating a unique learning experience that goes beyond typical game development. The geometric pattern matching problems are largely unexplored, making this a genuinely innovative approach to geographic data analysis.

---

*Note: This project emphasizes custom geometric algorithms over well-known solutions. The focus is on learning and implementing novel approaches to geographic pattern matching.*