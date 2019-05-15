import { Scene } from 'phaser';
import { Globals } from './Globals.js';

export default class TavernScene extends Scene {
  constructor () {
    super({ key: 'TavernScene' });
    this.pause
    this.visible = false
  }

  create () {
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    let fonsmenu = this.add.image(400, 300, 'fmenu');
    let taverner =  this.add.sprite(150, 290, 'taverner2').setInteractive();
    let porta =  this.add.sprite(622, 336, 'porta').setInteractive();
    let dialeg = this.add.image(400, 300, 'dialeg_tabarner');
    let yes =  this.add.sprite(680, 460, 'botoyes').setInteractive();
    let no =  this.add.sprite(680, 500, 'botono').setInteractive();
    fonsmenu.setScale(2);
    taverner.setScale(2);
    porta.setScale(2);
    dialeg.setScale(2);
    yes.setScale(2);
    no.setScale(2);
    dialeg.setVisible(false);
    yes.setVisible(false);
    no.setVisible(false);

    this.anims.create({
      key: "clean",
      frameRate: 15,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('taverner2', {
        frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
      })
    })
    taverner.play("clean");
    //TAVERNER
    let that = this
    taverner.on('pointerover', function (event) {
      if (!that.visible){
        this.setTint(0x60902525);
      }
    });
    taverner.on('pointerout', function (event) {
      this.clearTint();
    });
    taverner.on('pointerdown', function (event) {
      dialeg.setVisible(true);
      that.visible = true
      yes.setVisible(true);
      no.setVisible(true);
    }, this);

    //PORTA
    porta.on('pointerover', function (event) {
      if (!that.visible){
        this.setTint(0x60902525);
      }
     });
    porta.on('pointerout', function (event) {
      this.clearTint();
    });
    porta.on('pointerdown', function (event) {
      if (!that.visible){
        var isVisible = that.scene.isVisible('PlayScene');
        if (!isVisible) {
          that.scene.resume('PlayScene');
        }
        else {
          that.scene.start('PlayScene');
        }
        that.scene.stop();
      }
    }, this);

    yes.on('pointerover', function () {
        this.setFrame(1);
    });
    yes.on('pointerout', function () {
        this.setFrame(0);
    });
    yes.on('pointerdown', function (event) {
      if (Globals.vida < Globals.vidaMaxima && Globals.monedes >= 25){
        Globals.vida += 2;
        Globals.vida = Math.min(Math.max(0, Globals.vida), Globals.vidaMaxima);
      }
      dialeg.setVisible(false);
      that.visible = false
      yes.setVisible(false);
      no.setVisible(false);
    }, this);
    no.on('pointerover', function () {
        this.setFrame(1);
    });
    no.on('pointerout', function () {
        this.setFrame(0);
    });
    no.on('pointerdown', function (event) {
      dialeg.setVisible(false);
      that.visible = false
      yes.setVisible(false);
      no.setVisible(false);
    }, this);
    //const helloButton = this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
      //helloButton.setInteractive();
  }

  update () {
    if (Phaser.Input.Keyboard.JustDown(this.pause)){
      Globals.escena_ant = 'TavernScene'
      this.scene.launch('PauseScene');
      this.scene.pause();
    };
  }
}
