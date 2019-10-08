var solid_1;
var solid_2;
var solid_3;
var solid_4;
var solid_5;

var Level1 = new Phaser.Class({
  Extends: Baselevel,

  initialize: function Level1() {
    Phaser.Scene.call(this, { key: 'Level1' });
  },

  preload: function () {
    this.loadAssets();
    this.load.image('solid_1', 'assets/Level1/solid_1.png');
    this.load.image('solid_2', 'assets/Level1/solid_2.png');
    this.load.image('solid_3', 'assets/Level1/solid_3.png');
    this.load.image('solid_4', 'assets/Level1/solid_4.png');
    this.load.image('solid_5', 'assets/Level1/solid_5.png');
    this.load.image('solid_6', 'assets/Level1/solid_6.png');
    this.load.image('solid_7', 'assets/Level1/solid_7.png');
    this.load.image('solid_8', 'assets/Level1/solid_8.png');
    this.load.image('solid_9', 'assets/Level1/solid_9.png');
    this.load.image('solid_10', 'assets/Level1/solid_10.png');
  },

  create: function () {
    level = 1;
    score = 0;
    totalScore = 0;

    this.setUp();
    this.createPlatforms();
    this.createPlayer();
    this.createWaste();
    this.createBin(3);
    this.createRecycleBonus(10);
    this.setUpCollision();
  },

  createWaste: function () {
    waste = this.physics.add.group({
      key: ['solid_1', 'solid_2', 'solid_3', 'solid_4', 'solid_5', 'solid_6', 'solid_7', 'solid_8', 'solid_9', 'solid_10'],
      setXY: { x: 50, y: 0, stepX: 200 }
    });

    waste.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

    });
  },

  levelUp: function () {
    this.setLevelUp();
    this.replayLevel('Level1');
    this.playNextLevel('Level2');
  },

  loseLevel: function () {
    this.setLoseLevel();
    this.replayLevel('Level1');
  }
});
