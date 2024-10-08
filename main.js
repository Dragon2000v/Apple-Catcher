import './style.css';
import Phaser from 'phaser';

const size = {
  width: 500,
  height: 500,
};

const speedDown = 300;

const gameStartDiv = document.querySelector('#gameStartDiv');
const gameStartBtn = document.querySelector('#gameStartBtn');
const gameEndDiv = document.querySelector('#gameEndDiv');
const gameWinLoseSpan = document.querySelector('#gameWinLoseSpan');
const gameEndScoreSpan = document.querySelector('#gameEndScoreSpan');
const targetScoreInput = document.querySelector('#targetScoreInput');
const timeLimitInput = document.querySelector('#timeLimitInput');

class GameScene extends Phaser.Scene {
  constructor() {
    super('scene-game');
    this.player;
    this.cursor;
    this.playerSpeed = speedDown + 50;
    this.target;
    this.points = 0;
    this.textScore;
    this.textTime;
    this.timedEvent;
    this.remainingTime;
    this.coinMusic;
    this.bgMusic;
    this.emitter;
    this.fallSpeed = speedDown;
    this.targetScore = 10;
    this.timeLimit = 30;
  }

  preload() {
    this.load.image('bg', '/assets/bg.png');
    this.load.image('basket', '/assets/basket.png');
    this.load.image('apple', '/assets/apple.png');
    this.load.image('money', '/assets/money.png');

    this.load.audio('coin', '/assets/coin.mp3');
    this.load.audio('bgMusic', '/assets/bgMusic.mp3');
  }

  create() {
    this.scene.pause('scene-game');

    this.coinMusic = this.sound.add('coin', { volume: 0.1 });
    this.bgMusic = this.sound.add('bgMusic', { volume: 0.01 });
    this.bgMusic.play();

    this.add.image(0, 0, 'bg').setOrigin(0, 0);

    this.player = this.physics.add
      .image(0, size.height - 100, 'basket')
      .setOrigin(0, 0);
    this.player.setImmovable(true);
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);
    this.player
      .setSize(
        this.player.width - this.player.width / 4,
        this.player.height / 6
      )
      .setOffset(
        this.player.width / 10,
        this.player.height - this.player.height / 10
      );

    this.target = this.physics.add.image(0, 0, 'apple').setOrigin(0, 0);
    this.target.setMaxVelocity(0, this.fallSpeed);

    this.physics.add.overlap(
      this.target,
      this.player,
      this.targetHit,
      null,
      this
    );

    this.cursor = this.input.keyboard.createCursorKeys();

    this.textScore = this.add.text(
      size.width - 170,
      10,
      `Score: 0 / ${this.targetScore}`,
      {
        font: '25px Arial',
        fill: '#000000',
      }
    );

    this.textTime = this.add.text(10, 10, `Remaining Time: ${this.timeLimit}`, {
      font: '25px Arial',
      fill: '#000000',
    });

    this.timedEvent = this.time.delayedCall(
      this.timeLimit * 1000,
      this.gameOver,
      [],
      this
    );

    this.emitter = this.add.particles(0, 0, 'money', {
      speed: 100,
      gravityY: speedDown - 200,
      scale: 0.04,
      duration: 100,
      emitting: false,
    });

    this.emitter.startFollow(
      this.player,
      this.player.width / 2,
      this.player.height / 2,
      true
    );
  }

  update() {
    this.remainingTime = this.timedEvent.getRemainingSeconds();
    this.textTime.setText(
      `Remaining Time: ${Math.round(this.remainingTime).toString()}`
    );

    if (this.target.y >= size.height) {
      this.target.setY(0);
      this.target.setX(this.getRandomX());

      if (this.points > 0) {
        this.points--;
      }
      this.textScore.setText(`Score: ${this.points} / ${this.targetScore}`);
    }

    const { left, right } = this.cursor;

    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }

    this.target.setVelocityY(this.fallSpeed);
  }

  getRandomX() {
    return Math.floor(Math.random() * 480);
  }

  targetHit() {
    this.coinMusic.play();
    this.emitter.start();
    this.target.setY(0);
    this.target.setX(this.getRandomX());
    this.points++;
    this.textScore.setText(`Score: ${this.points} / ${this.targetScore}`);

    this.fallSpeed += 50;

    if (this.points >= this.targetScore) {
      this.gameOver();
    }
  }

  gameOver() {
    this.bgMusic.stop();
    this.sys.game.destroy(true);

    if (this.points >= this.targetScore) {
      gameEndScoreSpan.textContent = this.points;
      gameWinLoseSpan.textContent = 'Win !!!';
    } else {
      gameEndScoreSpan.textContent = this.points;
      gameWinLoseSpan.textContent = 'Lose !!!';
    }

    gameEndDiv.style.display = 'flex';
  }
}

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

gameStartBtn.addEventListener('click', () => {
  const targetScore = parseInt(targetScoreInput.value, 10);
  const timeLimit = parseInt(timeLimitInput.value, 10);

  game.scene.scenes[0].targetScore = targetScore;
  game.scene.scenes[0].timeLimit = timeLimit;

  gameStartDiv.style.display = 'none';
  game.scene.resume('scene-game');
});
