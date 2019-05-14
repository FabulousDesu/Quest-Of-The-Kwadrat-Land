import { Globals } from './Globals.js';

const midaFitxa = 32;

export class Carta extends Phaser.GameObjects.Sprite{
  //Classe per crear una carta del joc
  constructor(scene, x, y, type, forma = [[0,0,0,0],[0,0,0,0],[0,0,1,0],[0,0,0,0]], obtenir = false, relacioScale = 1){
    super(scene, x, y, 'carta');
    this.setScale(relacioScale);

    //Dibuixar la Peca sobre la Carta
    this.setDepth(0);
    this.scene = scene;
    this.val = forma; // = random figure with val valors
    this.type = type;          // 1= foc; 2 = gel 3= veri 4= extra
    this.fitxa = [];
    this.inicialPos = [x,y];

    let that = this;


    this.dibuixarPeces(0.4*relacioScale);

    //Fer que sigui draggable
    this.setInteractive();
    if (! obtenir)
      scene.input.setDraggable(this);
    else { //OBTENCIO
      this.on('pointerdown', function (event) {
        that.scene.intentDObtencio(that);
      }, this);
    }

    this.lastPos = [this.x, this.y];
    this.on('pointerover', function () {
        that.setScale(1.5*relacioScale);
        that.dibuixarPeces(0.7*relacioScale);
    });

    this.on('pointerout', function () {
      this.setScale(1*relacioScale);
      that.dibuixarPeces(0.4*relacioScale);
    });

    this.on('dragstart', function (pointer) {
      that.setVisible(false);
      that.dibuixarPeces(1.6*relacioScale, 2,true);

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
      that.setVisible(true);
      that.dibuixarPeces(0.4*relacioScale);
      if(that.scene.tauler.colocarCarta(that)){
        //that.fitxa.forEach(function(element){element.destroy()});
        that.fitxa.forEach(function(element, index){that.fitxa[index].destroy()});
        that.destroy();
      }else{
        that.x = that.inicialPos[0];
        that.y = that.inicialPos[1];
        that.dibuixarPeces(0.4);
        that.fitxa.forEach(function(element, index){that.fitxa[index].setDepth(1)});
      }
    });

  }

  desplacarA(novaPos) {
    //Pre:-- Post: Desplaca la carta a la nova pos <novaPos>
    this.inicialPos[0] = novaPos[0];
    this.inicialPos[1] = novaPos[1];
    this.x = this.inicialPos[0];
    this.y = this.inicialPos[1];
    this.dibuixarPeces(0.5*relacioScale);
  }

  dibuixarPeces(escala, depth = 1, marcada = false){
    //Pre:-- Post: Dibuixada la peca que te aquesta carta
    let that = this;
    this.fitxa.forEach(function(element, index){that.fitxa[index].destroy()});
    this.fitxa = [];

    let offset = midaFitxa * escala;
    let nova_x = that.x
    let nova_y = that.y;
    if (marcada){
      nova_x = that.scene.input.mousePointer.x - offset/2;
      nova_y = that.scene.input.mousePointer.y - offset/2;
    }

    for(let i = -2; i < 2; i++){
      for(let j = -2; j < 2; j++){
        if(that.val[j+2][i+2] == 1){
          that.fitxa.push(this.scene.add.sprite(nova_x+offset/2+offset*i,nova_y+offset/2+offset*j,'fitxa', that.type-1).setScale(escala).setDepth(depth));
          //that.fitxa[this.fitxa.length-1].setScale(escala);
          //that.fitxa[this.fitxa.length-1].setDepth(depth);
        }
      }
    }
  }

  getMatriuPeca(){
    //Pre:-- Post: Retornada la matriu de la peca
    return this.val;
  }

  morir(){
    //Pre:-- Post: Carta eliminada satisfactoriament
    console.log("morir");
    this.fitxa.forEach(function(element){element.destroy()});
    this.fitxa = [];
    this.destroy();
  }

}
