import { Scene } from 'phaser';
export default class GameOverScene extends Scene {
  constructor () {
    super({ key: 'GameOverScene' });
  }

  create () {
    let gameover = this.add.image(400, 300, 'gameover').setInteractive();
    gameover.setScale(2);
    var that = this
    gameover.on('pointerdown', function (event) {
      that.scene.launch('MainMenuScene');
      that.scene.remove('FightScene');
      that.scene.stop();
    }, this);
  }
  update () {
  }
}
