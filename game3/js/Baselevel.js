var sessiontext;
var background;
var recycle;
var player;
var platforms;
var cursors;
var player;
var waste;
var bin;
var levelText;
var startLevel;
var score;
var scoreText;
var scoreUpdateText;
var scoreImage;
var totalScore;
var totalScoreText;
var totalScoreImage;
var totalScorePrompt;
var timedEvent;
var timerText;
var timerImage;
var level;
var playLevel;
var dialogueBox;
var play;
var replay;
var resume;
var submit;
var home;
var info;
var instructions;
var playNext;
var reload;
var loseLevelText;
var winLevelText;
var addTotal;
var achievement;
var achievementText;

var Baselevel = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function Baselevel() {
    Phaser.Scene.call(this, { key: 'Baselevel' });
  },

  preload: function () {
    this.loadAssets();
  },

  create: function () {
    this.setUp();
  },

  loadAssets: function () {
    this.load.image('home', 'assets/common/icon_home.png');
    this.load.image('info', 'assets/common/icon_info.png');
    this.load.image('instructions', 'assets/common/instructions.png');
    this.load.image('background', 'assets/common/background.png');
    this.load.image('ground', 'assets/common/ground.png');
    this.load.image('recycle', 'assets/common/recycle_badge.png');
    this.load.image('bin', 'assets/common/bin.png');
    this.load.image('platform_long', 'assets/common/platform_long.png');
    this.load.image('platform_medium', 'assets/common/platform_medium.png');
    this.load.image('platform_short', 'assets/common/platform_short.png');
    this.load.image('score', 'assets/common/score.png');
    this.load.image('timer', 'assets/common/timer.png');
    this.load.image('playNext', 'assets/common/play_next.png');
    this.load.image('play', 'assets/common/play.png');
    this.load.image('resume', 'assets/common/resume.png');
    this.load.image('replay', 'assets/common/replay.png');
    this.load.image('reload', 'assets/common/reload.png');
    this.load.image('submit', 'assets/common/submit_score.png');
    this.load.image('totalScore', 'assets/common/total_score.png');
    this.load.image('dialogueBox', 'assets/common/dialogue_box.png');
    this.load.spritesheet('girl',
      'assets/common/girl.png',
      { frameWidth: 130, frameHeight: 240 }
    );
  },

  setUp: function () {
    startLevel = false;
    background = this.add.image(0, 0, 'background').setOrigin(0);
    home = this.add.image(15, 15, 'home').setOrigin(0);
    info = this.add.image(115, 15, 'info').setOrigin(0);
    this.goHome();
    this.showInfo();
    cursors = this.input.keyboard.createCursorKeys();
    addTotal = true;
    playLevel = true;
  },

  setUpCollision: function () {
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(waste, platforms);
    this.physics.add.collider(bin, platforms);
    this.physics.add.collider(recycle, platforms);
    this.physics.add.overlap(player, waste, this.collectWaste, null, this);
    this.physics.add.collider(player, bin, this.hitBin, null, this);
    this.physics.add.overlap(player, recycle, this.collectRecycleBonus, null, this);
  },

  createPlatforms: function () {
    platforms = this.physics.add.staticGroup();
    platforms.create(960, 850, 'ground');
    platforms.create(1600, 600, 'platform_long');
    platforms.create(200, 550, 'platform_medium');
    platforms.create(950, 450, 'platform_short');
    platforms.create(700, 300, 'platform_short');
  },

  createPlayer: function () {
    player = this.physics.add.sprite(850, 600, 'girl');
    player.setVisible(false);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'girl', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('girl', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  },

  createBin: function (num) {
    bin = this.physics.add.group({
      key: 'bin',
      repeat: num,
      setXY: { x: 280, y: 0, stepX: 400 }
    });

    bin.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

    });
  },

  createRecycleBonus: function (num) {
    recycle = this.physics.add.group({
      key: 'recycle',
      repeat: num,
      setXY: { x: 120, y: 0, stepX: 350 }
    });

    recycle.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

    });
  },

  showScore: function () {
    scoreImage = this.add.image(1650, 70, 'score');
    timerImage = this.add.image(1650, 180, 'timer');

    scoreText = this.add
      .text(1705, 40, score, { font: '40px Arial Black', fill: '#fff' })
      .setStroke('#ffc812', 16)
      .setShadow(2, 2, '#333333', 2, true, true);
    timerText = this.add
      .text(1705, 160, '00:00', { font: '40px Arial Black', fill: '#fff' })
      .setStroke('#ffc812', 16)
      .setShadow(2, 2, '#333333', 2, true, true);
  },

  updateBonusTimer: function () {
    if (timedEvent.repeatCount == 0) {
      playLevel = false;
    }

    timerText.setText('00:' + timedEvent.repeatCount);
  },

  update: function () {
    if (playLevel == true) {
      if (startLevel == true) {
        if (waste.countActive(true) === 0) {
          this.levelUp();
        } else {
          this.updateBonusTimer();
        }
      }
    }
    else {
      this.loseLevel();
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-200);

      player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(200);

      player.anims.play('right', true);
    }
    else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-400);
    }
  },

  updateScore: function (update) {
    score += update;
    scoreText.setText(score);

    scoreUpdateText = this.add
      .text(900, 250, update, { font: '40px Arial Black', fill: '#fff' })
      .setStroke('#ffc812', 16)
      .setShadow(2, 2, '#333333', 2, true, true);
    var tween = this.tweens.add({
      targets: scoreUpdateText,
      y: 300,
      ease: 'Power1',
      duration: 1500,
      alpha: 0,
      onComplete: () => {
        scoreUpdateText.destroy();
      }
    });
  },

  collectWaste: function (player, waste) {
    waste.disableBody(true, true);
    this.updateScore(100);
  },

  collectRecycleBonus: function (player, recycle) {
    recycle.disableBody(true, true);
    this.updateScore(50);
  },

  hitBin: function (player, bin) {
    bin.disableBody(true, true);
    this.updateScore(-50);
    player.anims.play('turn');
  },

  startLevel: function (level) {
    play.setInteractive({ useHandCursor: true }).on(
      'pointerup',
      function () {
        dialogueBox.setVisible(false);
        play.setVisible(false);
        openingText.setVisible(false);
        levelText.setVisible(false);
        startLevel = true;
        timedEvent = this.time.addEvent({ delay: 1000, repeat: 30 });
        player.setVisible(true);
        this.createBin(3);
        this.createRecycleBonus(5);
        this.createWaste();
        this.setUpCollision();
        this.showScore();
      },
      this
    );
  },

  replayLevel: function (level) {
    replay.setInteractive({ useHandCursor: true }).on(
      'pointerup',
      function () {
        totalScore -= score;
        this.scene.start(level);
        replay.disableInteractive();
      },
      this
    );
  },

  playNextLevel: function (level) {
    playNext.setInteractive({ useHandCursor: true }).on(
      'pointerup',
      function () {
        this.scene.start(level);
        replay.disableInteractive();
        playNext.disableInteractive();
      },
      this
    );
  },

  reloadGame: function () {
    reload.setInteractive({ useHandCursor: true }).on(
      'pointerup',
      function () {
        this.scene.start('Level1');
      },
      this
    );
  },

  setLevelUp: function (winText) {
    player.setVisible(false);
    info.disableInteractive();

    if (addTotal) {
      totalScore += score;
      addTotal = false;
    }

    dialogueBox = this.add.image(1000, 450, 'dialogueBox');
    dialogueBox.setScale(0.7)
    replay = this.add.image(850, 620, 'replay');
    playNext = this.add.image(1150, 620, 'playNext');
    winLevelText = this.add
      .text(810, 230, winText, {
        font: '40px Arial Black',
        fill: '#fff'
      })
      .setStroke('#665705', 5)
      .setShadow(2, 2, '#333333', 2, true, true);

    totalScorePrompt = this.add
      .text(830, 300, 'Total Score: ' + totalScore, {
        font: '40px Arial Black',
        fill: '#fff'
      })
      .setStroke('#665705', 5)
      .setShadow(2, 2, '#333333', 2, true, true);


    if (score <= 1200) {
      totalScoreImage = this.add.image(1020, 440, 'totalScore');
      achievement = 'Beginner';
    }
    if (score > 1200 && score <= 2000) {
      totalScoreImage = this.add.image(970, 440, 'totalScore');
      totalScoreImage = this.add.image(1060, 440, 'totalScore');
      achievement = 'Medium';
    } if (score > 2000) {
      totalScoreImage = this.add.image(920, 440, 'totalScore');
      totalScoreImage = this.add.image(1015, 440, 'totalScore');
      totalScoreImage = this.add.image(1110, 440, 'totalScore');
      achievement = 'Expert';
    }

    achievementText = this.add
      .text(790, 500, 'Your Level: ' + achievement, { font: '40px Arial Black', fill: '#fff' })
      .setStroke('#665705', 5)
      .setShadow(2, 2, '#333333', 2, true, true);
  },

  setLoseLevel: function () {
    player.setVisible(false);
    info.disableInteractive();
    dialogueBox = this.add.image(1000, 450, 'dialogueBox');
    dialogueBox.setScale(0.7)
    replay = this.add.image(1000, 500, 'replay');
    loseLevelText = this.add
      .text(900, 350, 'You failed!', { font: '40px Arial Black', fill: '#fff' })
      .setStroke('#665705', 5)
      .setShadow(2, 2, '#333333', 2, true, true);
  },

  goHome: function () {
    home.setInteractive({ useHandCursor: true }).on(
      'pointerup',
      function () {
        window.open('/index.html', "_self");
      },
      this
    );
  },

  showInfo: function () {
    info.setInteractive({ useHandCursor: true }).on(
      'pointerup',
      function () {
        instructions = this.add.image(1000, 450, 'instructions');
        resume = this.add.image(1000, 750, 'resume');
        this.resumeGame();
      },
      this
    );
  },

  resumeGame: function () {
    resume.setInteractive({ useHandCursor: true }).on(
      'pointerup',
      function () {
        instructions.setVisible(false);
        resume.setVisible(false);
      },
      this
    );
  },

  submitScore: function () {
    submit.setInteractive({ useHandCursor: true }).on(
      'pointerup',
      function () {
        window.open('/score.php?score=' + totalScore + "&game=3", '_self');
      },
      this
    );
  },
});
