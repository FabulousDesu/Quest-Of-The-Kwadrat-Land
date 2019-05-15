import { Scene } from 'phaser';
import { Globals } from './Globals.js';

export default class MainMenuScene extends Scene {
  constructor () {
    super({ key: 'MainMenuScene' });
  }

  create () {
    var that = this
    let fonsMenu = this.add.image(400, 300, 'fonsMenu');
    let boto_play = this.add.sprite(400, 450, 'boto_play', 0).setInteractive();
    let mascara = this.add.sprite(400, 150, 'mascara');
    let titoljoc = this.add.sprite(405, 300, 'titoljoc');
    titoljoc.setScale(0.5)
    boto_play.setScale(2);
    let sound = this.sound.add('ost');
    sound.play({
      loop: true
    });
    Globals.ost = sound;

    this.restart();

    this.anims.create({
      key: "basicmove",
      frameRate: 6,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('mascara', {
        frames: [0,1,2,3]
      })
    })
    mascara.play("basicmove");

    boto_play.on('pointerover', function () {
        this.setFrame(1);
    });
    boto_play.on('pointerout', function () {
        this.setFrame(0);
    });
    boto_play.on('pointerdown', function (event) {
      that.scene.start('MapScene');
      that.scene.stop();
    }, this);
  }
  update () {
  }

  restart (){
    Globals.vida = 4;
    Globals.vidaMaxima= 10;
    Globals.escut= 0;
    Globals.monedes= 74;
    Globals.mouseOnCard= false;
    Globals.deck= [{type: 4, forma: [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]},
           {type: 3, forma: [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]},
           {type: 2, forma: [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]},
           {type: 1, forma: [[0,0,1,1],[0,1,1,1],[1,1,1,0],[1,1,0,0]]},
           {type: 2, forma: [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]},
           {type: 1, forma: [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]}]; //{type: 1; forma: [array]};
   Globals.escena_ant= '';
  }
}
