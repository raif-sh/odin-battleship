# Battleship

An implementation of the classic Battleship board game, built with vanilla JavaScript as part of [The Odin Project](https://www.theodinproject.com/) curriculum. This project demonstrates clean architecture, comprehensive testing, and modern web development practices without relying on frameworks.

## Features

- **Two Game Modes**: Player vs Player (PvP) and Player vs AI
- **Interactive Ship Placement**: Manual placement with rotation support or random placement
- **Turn-Based Combat**: Clear visual feedback for hits, misses, and sunk ships
- **Modern UI**: Dark theme with ocean-inspired colors and smooth animations
- **Responsive Design**: Works on desktop and mobile browsers

## Tech Stack

- **JavaScript**: ES6+ with modules, classes, and modern syntax
- **Testing**: Jest with 100% coverage of core game logic
- **Build Tools**: Babel for ES6 module transpilation
- **Styling**: Pure CSS3 with Grid layout and CSS transitions
- **No Frameworks**: Built entirely with vanilla JavaScript

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

## What I Learned

Building this project strengthened my understanding of:

- **Object-Oriented Design**: Creating clean, modular classes with single responsibilities
- **State Management**: Managing complex game state without external libraries
- **Test-Driven Development**: Writing comprehensive unit tests before implementation
- **DOM Manipulation**: Efficient event handling and dynamic UI updates
- **CSS Grid**: Building responsive layouts without frameworks
- **Module Systems**: Organizing code with ES6 modules

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
