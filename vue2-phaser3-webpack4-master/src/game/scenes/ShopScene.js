import { Scene } from 'phaser';
import { Carta } from './Card.js';
import { Globals } from './Globals.js';
import { Hud } from './Hud.js';

export default class ShopScene extends Scene {
  //CLASSE BOTIGA
  constructor () {
    super({ key: 'ShopScene' });
  }

  create () {
    this.children.add(this.add.sprite(0,0,'botiga').setOrigin(0,0).setScale(2));

    this.botiguer = this.add.sprite(400,0,'botiguer').setScale(2);
    this.botiguer.rotation += Math.PI/2;
    this.movimentBotiguer = 0;

    this.hud = new Hud(this);
    this.children.add(this.hud);

    this.cartesVendre = [
      {carta: new Carta(this, 200, 250, 1, [[0,0,0,0],[0,0,0,0],[0,1,1,0],[0,0,0,0]], true), preu: 0},
      {carta: new Carta(this, 400, 250, 1, [[0,0,0,0],[0,0,0,0],[0,1,1,0],[0,0,0,0]], true), preu: 0},
      {carta: new Carta(this, 600, 250, 2, [[0,0,0,0],[0,0,0,0],[0,1,1,0],[0,0,0,0]], true), preu: 0},
      {carta: new Carta(this, 200, 400, 2, [[0,0,0,0],[0,0,0,0],[0,1,1,0],[0,0,0,0]], true), preu: 0},
      {carta: new Carta(this, 400, 400, 3, [[0,0,0,0],[0,0,0,0],[0,1,1,0],[0,0,0,0]], true), preu: 0},
      {carta: new Carta(this, 600, 400, 4, [[0,0,0,0],[0,0,0,0],[0,1,1,0],[0,0,0,0]], true), preu: 0},
    ];

    let that = this;
    this.cartesVendre.forEach(function(element){that.children.add(element.carta)});
  }

  update (){
    this.movimentBotiguer += 0.05;
    this.botiguer.y = 20 + (Math.sin(this.movimentBotiguer)+1)*20
    if (this.movimentBotiguer >= 2*Math.PI)
    this.movimentBotiguer = 0;

  }
}
