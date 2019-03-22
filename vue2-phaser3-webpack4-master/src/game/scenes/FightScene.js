import { Scene } from 'phaser';

export default class FightScene extends Scene {
  constructor () {
    super({ key: 'FightScene' });
  }

  create () {
    console.log("Starting FightScene ...");
    let i = this.add.image(200, 200, 'tauler')
    i.scaleX = 3
    i.scaleY = 3
    console.log(i);

    const bomb = this.physics.add.image(400, 200, 'bomb');
    bomb.scaleX = 2;
    bomb.scaleY = 2;
    bomb.setCollideWorldBounds(true);
    bomb.body.onWorldBounds = true; // enable worldbounds collision event
    bomb.setBounce(1);
    bomb.setVelocity(200, 20);
  }

  update () {
  }
}
