import { Scene } from 'phaser';
export default class GameOverScene extends Scene {
  constructor () {
    super({ key: 'GameOverScene' });
  }

  create () {
    let gameover = this.add.image(400, 300, 'gameover').setInteractive();
    gameover.setScale(2);
    gameover.on('pointerdown', function (event) {
      var that = this
      that.scene.launch('MainManuScene');
      this.scene.stop();
    }, this);
  }
  update () {
  }
}
