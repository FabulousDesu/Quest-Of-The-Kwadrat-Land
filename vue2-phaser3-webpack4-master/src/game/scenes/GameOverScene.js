import { Scene } from 'phaser';
import { Globals } from './Globals.js'

export default class GameOverScene extends Scene {
  init(args){
    this.victoria = args[0];
  }
  constructor () {
    super({ key: 'GameOverScene' });
  }

  create () {

    let imatge;
    if (this.victoria){
      imatge = 'afterlife';
      this.sound.play('so_victoria_final');
    }else{
      imatge = 'gameover';
      this.sound.play('so_game_over');
    }

    let gameover = this.add.image(400, 300, imatge).setInteractive();
    gameover.setScale(2);
    var that = this
    gameover.on('pointerdown', function (event) {
      that.scene.launch('MainMenuScene');
      if (!this.victoria){
        that.scene.stop('FightScene');
      }else{
        that.sound.play('so_final_joc');
      }
      //this.scene.stop("ShopScene");
      that.scene.stop();
    }, this);
  }
  update () {
  }
}
