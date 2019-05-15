import { Scene } from 'phaser';
import { Globals } from './Globals.js';

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' });
    this.pause
  }

  create () {
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    console.log("Starting PlayScene ...");
    let i = this.add.image(400, 300, 'sky');
    let robar = this.add.sprite(400, 300, 'robar_carta').setInteractive();
    console.log(i);
    robar.setScale(2);
    const bomb = this.physics.add.image(400, 200, 'bomb');
    bomb.scaleX = 2;
    bomb.scaleY = 2;
    bomb.setCollideWorldBounds(true);
    bomb.body.onWorldBounds = true; // enable worldbounds collision event
    bomb.setBounce(1);
    bomb.setVelocity(200, 20);

    robar.on('pointerover', function (event) {
        this.setFrame(1);
    });
    robar.on('pointerout', function (event) {
      this.setFrame(0);
    });
    robar.on('pointerdown', function (event) {
      this.setFrame(2);
    }, this);
  }

  update () {
      if (Phaser.Input.Keyboard.JustDown(this.pause)){
        Globals.escena_ant = 'PlayScene'
        this.scene.launch('PauseScene');
        this.scene.pause();
      };
  }
}
