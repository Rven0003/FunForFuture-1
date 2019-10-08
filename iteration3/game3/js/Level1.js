var fish1;
var fish2;
var fish3;
var fish4;
var fish5;

var Level1 = new Phaser.Class({
  Extends: Baselevel,

  initialize: function Level1() {
    Phaser.Scene.call(this, { key: 'Level1' });
  },

  preload: function() {
    this.loadAssets();
    // this.load.image('fish1', 'assets/Level1/fish1.png');
    // this.load.image('fish2', 'assets/Level1/fish2.png');
    // this.load.image('fish3', 'assets/Level1/fish3.png');
    // this.load.image('fish4', 'assets/Level1/fish4.png');
    // this.load.image('fish5', 'assets/Level1/fish5.png');
  },

  create: function() {
    level = 1;
    score = 0;

    this.setUp();
    platform_1 = this.add.image(1250, 550, 'platform_long').setOrigin(0);
    platform_2 = this.add.image(0, 150, 'platform_medium').setOrigin(0);
    platform_3 = this.add.image(550, 400, 'platform_short').setOrigin(0);
    platform_4 = this.add.image(900, 300, 'platform_short').setOrigin(0);
  },

  levelUp: function() {
    this.scene.start('Level2');
  }
});
