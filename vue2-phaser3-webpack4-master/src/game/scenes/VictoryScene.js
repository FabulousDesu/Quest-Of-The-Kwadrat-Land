import { Scene } from 'phaser';
import { Carta } from './Card.js';
import { Globals } from './Globals.js';

export default class VictoryScene extends Scene {
  constructor(){
    super({ key: 'VictoryScene' });
  }

  create(){
    this.cartes = [];
    this.spawnCartesVictoria();
    this.escollida = false;

  }

  spawnCartesVictoria(){
    this.cartes.push(new Carta(this, 200, 300, Phaser.Math.Between(1,3), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true, 2));
    this.cartes.push(new Carta(this, 400, 300, Phaser.Math.Between(1,3), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true, 2));
    this.cartes.push(new Carta(this, 600, 300, Phaser.Math.Between(1,3), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true, 2));

    let that = this;
    this.cartes.forEach(function(element){
      that.children.add(element);
      element.generarPecaAleatoria(Phaser.Math.Between(1, 7));
    });
  }

  intentDObtencio(carta){
    if (! this.escollida){
      Globals.deck.push({type: carta.type, forma: carta.getMatriuPeca()});
      carta.morir();
      this.escollida = true;
      let that = this;
      this.time.addEvent({delay: 0.5, repeat: 0, callback: that.sortir, args:[that]});
    }
  }

  sortir(escena){
    escena.scene.resume('MapScene');
    escena.scene.stop();
  }
}
