import { Carta } from './Card.js';
import { Globals } from './Globals.js';

export class Deck{
  constructor(scene){
    this.scene = scene;
    this.cartes = [];

    let that = this;
    //Crear copia deck globals
    Globals.deck.forEach(function(element){
      that.cartes.push(element);
    })

    this.barrejar();
  }

  barrejar(){
    //barrejar cartes seguint algorisme de Fisher-Yates
    var j, x, i;
    for (i = this.cartes.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.cartes[i];
      this.cartes[i] = this.cartes[j];
      this.cartes[j] = x;
    }
  }

  pucRobarCarta(){
    if (this.cartes.length == 0){
      console.log("No pots robar, deck buit");
      return false;
    }else{
      console.log("Pots robar");
      return true;
    }
  }

  robarCarta(){
    if (this.cartes.length == 0){
      this.barrejar();
    }

    let ret = this.cartes.pop();
    //that.cartesUsades.push(ret);
    return new Carta(this.scene, 0,0, ret.type, ret.forma);
  }

  cartaUsada(carta){
    this.cartes.push({type: carta.type, forma: carta.val})
  }
}
