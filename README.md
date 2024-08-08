# Apple Catcher Game

Welcome to Apple Catcher, a fun and interactive game where you catch falling
apples with a basket. Built using JavaScript, VITE, and the Phaser library, this
game combines engaging gameplay with smooth graphics and sounds.

## Features

- **Catch Falling Apples:** Use the basket to catch falling apples and score
  points.
- **Dynamic Difficulty:** The falling speed of apples increases with each
  successful catch.
- **Customizable Settings:** Choose your target score and game duration.
- **Sound Effects:** Enjoy immersive audio with background music and sound
  effects.

## Getting Started

To run the Apple Catcher game on your local machine, follow these steps:

### Prerequisites

Ensure you have Node.js and npm installed.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Dragon2000v/Apple-Catcher
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd apple-catcher
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   This will start the VITE development server, and you can open the game in
   your browser at [http://localhost:3000](http://localhost:3000).

## Game Overview

### Game Mechanics

- **Objective:** Catch falling apples with the basket. Each successful catch
  increases your score.
- **Controls:** Use the left and right arrow keys to move the basket.
- **Scoring:** Your score increases with each apple caught. The game ends when
  you reach the target score or run out of time.

### Phaser Library Integration

The game utilizes the Phaser library to manage game scenes, physics, and
rendering. Here’s a brief overview of how Phaser is used in the game:

#### Configuration

The game is configured with Phaser’s WEBGL renderer and arcade physics:

```javascript
const config = {
  type: Phaser.WEBGL,
  width: size.width,
  height: size.height,
  canvas: document.querySelector('#gameCanvas'),
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: speedDown },
      debug: false,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
```

## Game Scene

The `GameScene` class manages game elements including the player (basket),
falling targets (apples), and UI updates:

```javascript
class GameScene extends Phaser.Scene {
  constructor() {
    super('scene-game');
    // Initialize game properties
  }

  preload() {
    // Load assets
  }

  create() {
    // Set up game objects and physics
  }

  update() {
    // Update game state
  }
}
```

## Physics and Collisions

- **Player:** The basket is a static object with physics enabled, allowing it to
  move left and right but not affected by gravity.
- **Target:** Apples fall from the top of the screen and reset when they reach
  the bottom. The player catches them by overlapping with the basket.

```javascript
this.physics.add.overlap(this.target, this.player, this.targetHit, null, this);
```

## Physics and Collisions

- **Player:** The basket is a static object with physics enabled, allowing it to
  move left and right but not affected by gravity.
- **Target:** Apples fall from the top of the screen and reset when they reach
  the bottom. The player catches them by overlapping with the basket.

```javascript
this.physics.add.overlap(this.target, this.player, this.targetHit, null, this);
```

## Sound Effects

- **Background Music:** Plays continuously throughout the game.
- **Coin Sound:** Played when an apple is successfully caught.

```javascript
this.coinMusic = this.sound.add('coin', { volume: 0.1 });
this.bgMusic = this.sound.add('bgMusic', { volume: 0.01 });
```

## How to Play

1. **Start the Game:** Enter your desired target score and time limit, then
   click "Start".
2. **Control the Basket:** Use the left and right arrow keys to move the basket.
3. **Catch Apples:** Aim to catch as many falling apples as possible before time
   runs out or you reach your target score.

## License

This project is licensed under the MIT License. See the LICENSE file for
details.

Feel free to customize or expand upon this README to better fit your needs!
