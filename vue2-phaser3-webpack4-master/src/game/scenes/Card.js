import { Globals } from './Globals.js';

export class Carta extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, type, forma = [[0,0,0,0],[0,0,0,0],[0,0,1,0],[0,0,0,0]]){
    super(scene, x, y, 'carta');

    //Dibuixar la Peca sobre la Carta
    this.setDepth(0);
    this.val = forma; // = random figure with val valors
    this.type = type;          // 1= foc; 2 = gel 3= veri 4= extra
    this.fitxa = [];
    this.inicialPos = [x,y];

    const midaFitxa = 32;

    var that = this;
    this.dibuixarPeces = function(escala, marcada = false){
      that.fitxa.forEach(function(element){element.destroy()});
      let offset = midaFitxa * escala;
      let nova_x = that.x
      let nova_y = that.y;
      if (marcada){
        nova_x = scene.input.mousePointer.x - offset/2;
        nova_y = scene.input.mousePointer.y - offset/2;
      }

      for(let i = -2; i < 2; i++){
        for(let j = -2; j < 2; j++){
          if(that.val[j+2][i+2] == 1){
            that.fitxa.push(scene.add.sprite(nova_x+offset/2+offset*i,nova_y+offset/2+offset*j,'fitxa', that.type-1));
            that.fitxa[this.fitxa.length-1].setScale(escala);
            that.fitxa[this.fitxa.length-1].setDepth(1);
          }
        }
      }
    }

    this.dibuixarPeces(0.5);

    //Fer que sigui setDraggable
    this.setInteractive();
    scene.input.setDraggable(this);

    this.lastPos = [this.x, this.y];
    this.on('pointerover', function () {
      if (!Globals.mouseOnCard){
        that.setScale(1.5);
        that.dibuixarPeces(0.75);
        //that.fitxa.forEach(function(element){element.setDepth(2)});
        Globals.mouseOnCard = true;
      }
    });

    this.on('pointerout', function () {
      this.setScale(1);
      that.dibuixarPeces(0.5);
    });

    this.on('dragstart', function (pointer) {
      that.setVisible(false);
      that.dibuixarPeces(1.6, true);
    });

    this.on('drag', function (pointer, dragX, dragY) {
      that.lastPos[0] = that.x;
      that.lastPos[1] = that.y;
      that.x = dragX;
      that.y = dragY;

      that.fitxa.forEach(function(element) {
        element.x -= that.lastPos[0] - that.x;
        element.y -= that.lastPos[1] - that.y;
      })

    });

    this.on('dragend', function (pointer) {
      Globals.mouseOnCard = false;
      that.setVisible(true);
      that.dibuixarPeces(0.5);
      if(that.scene.tauler.colocarCarta(that)){
        that.fitxa.forEach(function(element){element.destroy()});
        that.destroy();
      }else{
        that.x = that.inicialPos[0];
        that.y = that.inicialPos[1];
        that.dibuixarPeces(0.5);
      }
    });

    //EXTRES
    this.getMatriuPeca = function(){
      return this.val;
    }
  }
}
