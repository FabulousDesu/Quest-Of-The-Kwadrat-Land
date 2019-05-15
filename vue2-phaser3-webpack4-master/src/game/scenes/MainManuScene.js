import { Scene } from 'phaser';
import { Globals } from './Globals.js';

export default class MainManuScene extends Scene {
  constructor () {
    super({ key: 'MainManuScene' });
  }

  create () {
    var that = this
    let sky = this.add.image(400, 300, 'sky');
    let boto_play = this.add.sprite(400, 450, 'boto_play', 0).setInteractive();
    let mascara = this.add.sprite(400, 150, 'mascara');
    let titoljoc = this.add.sprite(405, 300, 'titoljoc');
    titoljoc.setScale(0.5)
    boto_play.setScale(2);
    let sound = this.sound.add('sound');
    sound.play({
      loop: true
    })
    Globals.sound = sound
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
      that.scene.launch('PlayScene');
      that.scene.stop();
    }, this);
  }
  update () {
  }
}
