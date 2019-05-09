import { Scene } from 'phaser';
import { Carta } from './Card.js';
import { Globals } from './Globals.js';

var graphics;
var rect;

export default class FightScene extends Scene {
  constructor () {
    super({ key: 'FightScene' });
  }

  create () {
    //Zones
    graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 }});
    rect = new Phaser.Geom.Rectangle(200, 500, 400, 100);

    //Tauler
    this.tauler = this.add.image(200, 200, 'tauler');
    this.tauler.scaleX = 3;
    this.tauler.scaleY = 3;

    this.children.add(new Tauler(this, 200, 200));
    this.children.add(new Carta(this, 400, 400));
    this.children.add(new Peca(this, 350, 500, 1, "fire"));
    this.children.add(new Enemy(this, 600, 200));

    //zone = this.add.zone(200, 200, 300, 300).setRectangleDropZone(300, 300);
  }

  update () {
    graphics.clear();
    graphics.strokeRectShape(rect);
  }
}

export class Enemy extends Phaser.GameObjects.Sprite{
  constructor (scene, x, y) {
    super(scene, x, y, 'enemic');
    this.health = 20;
    this.shield = 0;
    this.rang_accio = [[1, 5], [1, 5]] // 0 = Attack 1 = Shield
  }
}

export class Tauler extends Phaser.GameObjects.Grid{
  constructor (scene, x, y){
    super(scene, x, y, 300, 300, 50, 50, 0x00b9f2).setAltFillStyle(0x016fce);
    this.mida = 6;
    this.matriu = [[0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0]];
    //Buida = 0, Foc = 1, Gel = 2, Veri = 3 i Extra = 4

    console.log(this.matriu);
    this.valors = {"foc": 0, "gel": 0, "veri": 0, "extra": 0}
    }

}

export class Peca extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, val, type){
    var a = super(scene, x, y, 'carta');
    this.val = [[0,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,0]]; // = random figure with val valors
    this.type = type;
    this.fitxa = [];

    for(var i = -2; i < 2; i++){
      for(var j = -2; j < 2; j++){
        if(this.val[j+2][i+2] == 1){
          this.fitxa.push(scene.add.sprite(x+16*i,y+16*j,'fitxa', 3));
          this.fitxa[this.fitxa.length-1].scaleX = 0.5
          this.fitxa[this.fitxa.length-1].scaleY = 0.5
        }
      }

    }

    this.punt_clau = [2,2];
    this.setInteractive();
    scene.input.setDraggable(this);

    var that = this;
    this.on('dragstart', function (pointer) {

      that.setTint(0xff0000);

    });

    this.on('drag', function (pointer, dragX, dragY) {

      that.x = dragX;
      that.y = dragY;

    });

    this.on('dragend', function (pointer) {

      that.clearTint();

    });
  }
}
