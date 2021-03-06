var trash1;
var trash2;
var trash3;
var trash4;
var trash5;

var Level2 = new Phaser.Class({
  Extends: Baselevel,

  initialize: function Level2() {
    Phaser.Scene.call(this, { key: 'Level2' });
  },

  preload: function() {
    this.loadAssets();
    this.load.image('level2_background', 'assets/Level2/level2_background.png');
    this.load.image('trash1', 'assets/Level2/trash1.png');
    this.load.image('trash2', 'assets/Level2/trash2.png');
    this.load.image('trash3', 'assets/Level2/trash3.png');
    this.load.image('trash4', 'assets/Level2/trash4.png');
    this.load.image('trash5', 'assets/Level2/trash5.png');
  },

  create: function() {
    level = 2;
    this.setUp();
    level2Bg = this.add.image(0, 650, 'level2_background').setOrigin(0);
    trash2 = this.add.image(100, 700, 'trash2').setVisible(false);
    trash2 = this.add.image(100, 810, 'trash2');
    trash3 = this.add.image(370, 750, 'trash3');
    trash4 = this.add.image(680, 790, 'trash4');
    trash5 = this.add.image(1150, 880, 'trash1');
    this.setOpening();
  },

  updateQuestion: function() {
    if (counter < 5) {
      this.setUpQuestion();
      questionText.setText(questions.levels[1].level2[counter].question);
      answerText.setText(questions.levels[1].level2[counter].answer);
      wrongText1.setText(questions.levels[1].level2[counter].choice1);
      wrongText2.setText(questions.levels[1].level2[counter].choice2);
      wrongText3.setText(questions.levels[1].level2[counter].choice3);
      this.removeTrash(counter + 1);
      counter++;
    } else {
      this.levelUp();
    }
  },

  removeTrash: function(num) {
    switch (num) {
      case 2:
        trash2.setVisible(false);
        break;
      case 3:
        trash3.setVisible(false);
        break;
      case 4:
        trash4.setVisible(false);
        break;
      case 5:
        trash5.setVisible(false);
        break;
    }
  },

  setOpening: function () {
    dialogueBox = this.add.image(1000, 450, 'dialogueBox');
    dialogueBox.setScale(0.8)
    play = this.add.image(1020, 680, 'play');
    levelText = this.add
    .text(810, 250, 'Level 2 - School Ground', { font: '35px Arial Black', fill: '#fff' })
    .setStroke('#665705', 5)
    .setShadow(2, 2, '#333333', 2, true, true);
    openingText = this.add
      .text(750, 350, 'Welcome to the School Ground!\nHelp Nina Answer Questions\n   And Remove the Waste!\n', { font: '35px Arial Black', fill: '#fff' })
      .setStroke('#665705', 5)
      .setShadow(2, 2, '#333333', 2, true, true);
    this.startLevel();
  },

  levelUp: function () {
    this.setLevelUp('Level 2 Complete');
    this.replayLevel('Level2');
    this.playNextLevel('Level3');
  },

  loseLevel: function () {
    this.setLoseLevel();
    this.replayLevel('Level2');
  }
});
