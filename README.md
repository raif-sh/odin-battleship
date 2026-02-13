# Battleship

A fully-featured implementation of the classic Battleship board game, built with vanilla JavaScript as part of [The Odin Project](https://www.theodinproject.com/) curriculum. This project demonstrates clean architecture, **test-driven development**, and modern web development practices without relying on frameworks.

![Game Preview](docs/screenshot.png) *[Add a screenshot of your game]*

## Features

- **Two Game Modes**: Player vs Player (PvP) and Player vs AI
- **Interactive Ship Placement**: Manual placement with rotation support or random placement
- **Turn-Based Combat**: Clear visual feedback for hits, misses, and sunk ships
- **Modern UI**: Dark theme with ocean-inspired colors and smooth animations
- **Responsive Design**: Works on desktop and mobile browsers

## Test-Driven Development

This project was built using **Test-Driven Development (TDD)** methodology. All core game logic was developed by writing tests first, then implementing functionality to make those tests pass.

### Testing Approach
- **26 unit tests** covering all core game logic (Ship, Gameboard, Player)
- **100% test coverage** of business logic - no untested code paths
- Tests run on every change using Jest's watch mode
- Edge cases validated: boundary checks, overlap detection, duplicate attack prevention, sunk ship tracking

### Running Tests
```bash
# Run all tests once
npm test

# Run tests in watch mode (recommended during development)
npm test -- --watch
```

### Why TDD?
- Catches bugs early before they reach the UI
- Serves as living documentation of how the code works
- Makes refactoring safer - tests catch regressions immediately
- Encourages modular, testable code design

## Tech Stack

| Area | Technology |
|------|------------|
| **Language** | JavaScript (ES6+ modules, classes) |
| **Testing** | Jest (26 tests, 100% coverage of core logic) |
| **Build** | Babel for ES6 module transpilation |
| **Styling** | Pure CSS3 with Grid layout |
| **Runtime** | Vanilla JavaScript - no frameworks

## Architecture

This project follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│         UI Layer (gameplay.js)      │  ← DOM manipulation, event handling
├─────────────────────────────────────┤
│       Player Abstraction Layer      │  ← Player type, turn management
│            (player.js)              │
├─────────────────────────────────────┤
│      Game Logic Layer (modules)     │
│  ┌──────────────────────────────┐   │
│  │ Ship    │ Gameboard │ Player │   │  ← Core game entities
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Key Technical Decisions

**Dual Grid System**
- `grid[]` stores Ship objects for placement tracking
- `hits[]` tracks attack results independently
- This preserves Ship object references across all occupied cells, enabling sunk ship tracking across the entire fleet

**Event Delegation Pattern**
- Uses dataset attributes (`data-row`, `data-col`, `data-player`) for coordinate tracking
- Dynamic event listener attachment/detachment for turn management
- Clean DOM manipulation without inline handlers

**Composition Over Inheritance**
- Player class composes Gameboard functionality rather than extending it
- Each module has a single, well-defined responsibility

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- A modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/raif-sh/odin-battleship.git
cd odin-battleship

# Install dependencies
npm install
```

### Running the Game

```bash
# Start a local server (required for ES6 modules)
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000` (or the appropriate port) in your browser.

### Running Tests

```bash
npm test
```

## Project Structure

```
odin-battleship/
├── src/
│   ├── app.js              # Entry point
│   ├── gameplay.js         # Main game loop and UI logic
│   └── modules/
│       ├── ship.js         # Ship entity with hit tracking
│       ├── gameboard.js    # 10x10 grid with attack processing
│       ├── player.js       # Player abstraction (real/ai)
│       ├── ship.test.js    # Ship unit tests
│       └── gameboard.test.js  # Gameboard unit tests
├── index.html              # Main HTML
├── style.css               # Game styling
├── package.json            # Dependencies and scripts
└── babel.config.js         # Babel configuration
```

*Note: Test files are co-located with implementation files - a TDD best practice that keeps tests close to the code they verify.*

## What I Learned

Building this project strengthened my understanding of:

- **Test-Driven Development**: Writing failing tests first, then implementing features - this radically changed how I approach problem-solving and led to more modular, testable code
- **Object-Oriented Design**: Creating clean, modular classes with single responsibilities that are easy to test and maintain
- **State Management**: Managing complex game state without external libraries using a dual-grid system
- **DOM Manipulation**: Efficient event handling using delegation and dynamic listener management
- **CSS Grid**: Building responsive, game-board layouts without frameworks
- **Module Systems**: Organizing code with ES6 modules for better separation of concerns

## Future Enhancements

- [ ] Smart AI opponent with probability-based targeting
- [ ] Sound effects and animations for attacks
- [ ] Game statistics and move history
- [ ] Online multiplayer with WebSocket support
- [ ] Multiple ship placement strategies

## License

ISC

---

**Built with ❤️ as part of The Odin Project**
