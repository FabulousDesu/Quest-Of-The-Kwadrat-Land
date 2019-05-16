import { Scene } from 'phaser';
import { Globals } from './Globals.js';
import { Hud } from './Hud.js';

export default class TavernScene extends Scene {
  constructor () {
    super({ key: 'TavernScene' });
    this.pause
    this.visible = false
  }

  create () {
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    let fonsmenu = this.add.image(400, 300, 'fmenu').setScale(2);
    let taverner =  this.add.sprite(150, 290, 'taverner2').setInteractive().setScale(2);
    let porta =  this.add.sprite(622, 336, 'porta').setInteractive().setScale(2);
    let dialeg = this.add.image(400, 400, 'dialeg_tabarner').setScale(2).setVisible(false);
    let yes =  this.add.sprite(660, 405, 'botoyes').setInteractive().setVisible(false).setScale(2);
    let no =  this.add.sprite(660, 455, 'botono').setInteractive().setVisible(false).setScale(2);
    this.hud = new Hud(this, 0,0);
    this.children.add(this.hud);

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
        that.scene.resume('MapScene');
        let aux = this.scene.get('MapScene');
        aux.hud.updateCounter();
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
        Globals.monedes -= 25;
        Globals.vida = Math.min(Math.max(0, Globals.vida), Globals.vidaMaxima);
        this.hud.updateCounter();
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
