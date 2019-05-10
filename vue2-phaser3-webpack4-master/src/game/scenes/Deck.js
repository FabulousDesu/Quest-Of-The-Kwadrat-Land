import { Carta } from './Card.js';
import { Globals } from './Globals.js';

export class Deck{
  constructor(scene){
    this.scene = scene;
    this.cartes = [];

    var that = this;
    //Crear copia deck globals
    Globals.deck.forEach(function(element){
      that.cartes.push(element);
    })

    this.barrejar = function(){
      //barrejar cartes seguint algorisme de Fisher-Yates
      var j, x, i;
      for (i = that.cartes.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = that.cartes[i];
        that.cartes[i] = that.cartes[j];
        that.cartes[j] = x;
      }

    }

    this.pucRobarCarta = function(){
      if (that.cartes.length == 0){
        console.log("No pots robar, deck buit");
        return false;
      }else{
        console.log("Pots robar");
        return true;
      }
    }

    this.robarCarta = function(){
      if (that.cartes.length == 0){
        that.barrejar();
      }

      let ret = that.cartes.pop();
      //that.cartesUsades.push(ret);
      return new Carta(that.scene, 0,0, ret.type, ret.forma);
    }

    this.cartaUsada = function(carta){
      that.cartes.push({type: carta.type, forma: carta.val})

    }
  }
}
