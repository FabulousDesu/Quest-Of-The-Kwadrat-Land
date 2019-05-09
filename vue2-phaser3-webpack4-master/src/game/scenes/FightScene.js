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
    this.tauler2 = this.add.image(200, 200, 'tauler');
    this.tauler2.setScale(3);

    this.tauler = new Tauler(this, 200, 200);
    this.children.add(this.tauler);
    this.ma = new Ma(this, 400, 500)
    this.children.add(this.ma);
    this.children.add(new Enemy(this, 600, 200));
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

class Ma extends Phaser.GameObjects.Sprite{
  constructor (scene, x, y) {
    super(scene, x, y, 'bomb');
    this.scene = scene;
    this.accions = 0;

    this.cartes = [new Carta(scene, 0, 0, 2, [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]),
                   new Carta(scene, 0, 0, 3, [[0,0,1,0],[0,0,1,0],[0,1,1,0],[0,1,0,0]]),
                   new Carta(scene, 0, 0, 4, [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]),
                   new Carta(scene, 0, 0, 1, [[0,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]])];

    this.cartes.forEach(function(element){
      scene.children.add(element);
    })

    let that = this;
    this.ordenarCartes = function(){
      let aux = 0;
      let mida = that.cartes.length;
      that.cartes.forEach(function(element, index){
        element.desplacarA([that.x + (index + 0.5 - mida/2) * 75, that.y]);
      })
    };

    this.ordenarCartes();

    this.afegirCartes = function(type, forma = [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]){
      that.cartes.push(new Carta(that.scene, 0,0, type, forma));
      that.scene.children.add(that.cartes[that.cartes.length-1]);
      that.ordenarCartes();
    };

    this.afegirCartes();
  }
}

export class Tauler extends Phaser.GameObjects.Grid{
  constructor (scene, x, y){
    super(scene, x, y, 300, 300, 50, 50, 0x00b9f2).setAltFillStyle(0x016fce);
    this.mida = 6;

    this.fitxesTauler = [];
    this.matriu = [[0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0]];
    //Buida = 0, Foc = 1, Gel = 2, Veri = 3 i Extra = 4

    this.valors = [0,0,0,0,0];

    this.scene = scene;

    let that = this;

    //Funcio per colocar carta, retorna cert si l'ha pogut colocar
    this.colocarCarta = function(carta){
      //PREGUNTAR VECTOR
      let mousePos = [that.scene.input.mousePointer.x, that.scene.input.mousePointer.y];

      if ( ! (mousePos[0] >= that.x - 150 && mousePos[0] <= that.x + 150 && mousePos[1] >= that.y - 150 && mousePos[1] <= that.y + 150)){
        return false;
      }

      let nou_mouse = [mousePos[0] - (that.x - 150), mousePos[1] - (that.y - 150)]
      let casellaSeleccionada = [Math.trunc(nou_mouse[0]/50), Math.trunc(nou_mouse[1]/50)];

      //Comprobar que cap
      for (let i = -2; i < 2; i++){
        for (let j = -2; j < 2; j++){
          //Existeix la peca
          if (carta.val[j+2][i+2] != 0){

            //La peca cap dintre els bordes
            if (casellaSeleccionada[0] + i < 0 || casellaSeleccionada[0] + i >= 6 || casellaSeleccionada[1] + j < 0 || casellaSeleccionada[1] + j >= 6){
              return false;
            }

            //La pos no esta ocupada
            if (that.matriu[casellaSeleccionada[1] + j][casellaSeleccionada[0] + i] != 0){
              return false;
            }
          }
        }
      }

      //Colocar Peca
      let aux = 0;
      for (let i = -2; i < 2; i++){
        for (let j = -2; j < 2; j++){
          if (carta.val[j+2][i+2] != 0){
            aux++;
            that.matriu[casellaSeleccionada[1] + j][casellaSeleccionada[0] + i] = carta.type;
            let sprite_aux = that.scene.add.sprite((casellaSeleccionada[0] + i)*50 + (that.x - 150 + 25) , (casellaSeleccionada[1] + j)*50 + (that.x - 150 + 25), 'fitxa', carta.type -1);
            sprite_aux.setScale(1.6);
            that.fitxesTauler.push(sprite_aux);
          }
        }
      }
      that.valors[carta.type] += aux;
      aux = that.scene.ma.cartes.indexOf(carta);
      that.scene.ma.cartes.splice(aux, 1);
      that.scene.ma.ordenarCartes();
      return true;
    }

    this.buidarTauler = function(){
      that.fitxesTauler.forEach(function(element){element.destroy()});
      that.fitxesTauler = [];

    }
  }
}
