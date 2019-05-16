import { Scene } from 'phaser';

export default class GameOverScene extends Scene {
  init(args){
    this.victoria = args[0];
    console.log(args[0]);
  }
  constructor () {
    super({ key: 'GameOverScene' });
  }

  create () {

    let imatge;
    if (this.victoria){
      imatge = 'afterlife';
    }else{
      imatge = 'gameover';
    }

    let gameover = this.add.image(400, 300, imatge).setInteractive();
    gameover.setScale(2);
    var that = this
    gameover.on('pointerdown', function (event) {
      that.scene.launch('MainMenuScene');
      if (!this.victoria){
        that.scene.stop('FightScene');
      }
      that.scene.stop();
    }, this);
  }
  update () {
  }
}
