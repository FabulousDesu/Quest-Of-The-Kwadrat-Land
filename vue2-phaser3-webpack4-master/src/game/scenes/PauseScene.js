import { Scene } from 'phaser';
import { Globals } from './Globals.js';
export default class PauseScene extends Scene {
  constructor () {
    super({ key: 'PauseScene' });
    this.regular = false
  }

  create () {
    let base = this.add.image(400, 300, 'basepause');
    let base_volum = this.add.image(400, 300, 'volum');
    let b_volum = this.add.image(Globals.pos_volum_x, 300, 'b_volum').setInteractive();
    this.input.setDraggable(b_volum);
    let boto_resume = this.add.sprite(400, 200, 'boto_resume', 0).setInteractive();
    let boto_options = this.add.sprite(400, 300, 'boto_options', 0).setInteractive();
    let boto_menu = this.add.sprite(400, 400, 'boto_menu', 0).setInteractive();
    let boto_enrere = this.add.sprite(62, 440, 'boto_enrere', 0).setInteractive();

    base.setScale(2);
    base_volum.setScale(2);
    b_volum.setScale(2);
    base_volum.setVisible(false)
    b_volum.setVisible(false)
    boto_enrere.setVisible(false);
    boto_resume.setScale(2);
    boto_options.setScale(2);
    boto_menu.setScale(2);
    boto_enrere.setScale(2);
    var that = this
    boto_resume.on('pointerover', function () {
        this.setFrame(1);
    });
    boto_resume.on('pointerout', function () {
        this.setFrame(0);
    });
    boto_resume.on('pointerdown', function (event) {
      that.scene.resume(Globals.escena_ant);
      that.scene.stop();
    }, this);
    boto_options.on('pointerover', function () {
        this.setFrame(1);
    });
    boto_options.on('pointerout', function () {
        this.setFrame(0);
    });
    boto_options.on('pointerdown', function (event) {
      boto_resume.setVisible(false);
      boto_options.setVisible(false);
      boto_menu.setVisible(false);
      base_volum.setVisible(true);
      b_volum.setVisible(true);
      boto_enrere.setVisible(true);
      this.regular = true
    }, this);

    b_volum.on('dragstart', function (pointer) {
    })
    b_volum.on('drag', function (pointer, dragX, dragY) {
      if (dragX > 96 && dragX < 702){
        Globals.pos_volum_x = dragX
        this.x = Globals.pos_volum_x
      }
    })
    b_volum.on('dragend', function (pointer) {
      Globals.sound.volume = (this.x-96) / (702-96)
    })

    boto_menu.on('pointerover', function () {
        this.setFrame(1);
    });
    boto_menu.on('pointerout', function () {
        this.setFrame(0);
    });
    boto_menu.on('pointerdown', function (event) {
      var that = this
      that.scene.launch('MainManuScene');
      this.scene.stop();
    }, this);
    boto_enrere.on('pointerover', function () {
        this.setFrame(1);
    });
    boto_enrere.on('pointerout', function () {
        this.setFrame(0);
    });
    boto_enrere.on('pointerdown', function (event) {
      boto_resume.setVisible(true);
      boto_options.setVisible(true);
      boto_menu.setVisible(true);
      base_volum.setVisible(false);
      b_volum.setVisible(false);
      boto_enrere.setVisible(false);
      this.regular = false
    }, this);
    
    this.input.keyboard.on('keydown-' + 'ESC', function (event) {
      console.log("passa")
      that.scene.resume(Globals.escena_ant);
      that.scene.stop();
    }, this);
  }
  update () {

  }
}
