import { Globals } from './Globals.js';

const midaFitxa = 32;

export class Carta extends Phaser.GameObjects.Sprite{
  //Classe per crear una carta del joc
  constructor(scene, x, y, type, forma = [[0,0,0,0],[0,0,0,0],[0,0,1,0],[0,0,0,0]], obtenir = false, relacioScale = 1, depth = 0){
    super(scene, x, y, 'carta');
    this.setScale(relacioScale);

    //Dibuixar la Peca sobre la Carta
    this.setDepth(depth);
    this.dep = depth;
    this.scene = scene;
    this.val = forma; // = random figure with val valors
    this.type = type;          // 1= foc; 2 = gel 3= veri 4= extra
    this.fitxa = [];
    this.inicialPos = [x,y];
    this.relacioScale = relacioScale;

    let that = this;

    this.dibuixarPeces(0.4*this.relacioScale, this.dep + 1);

    //Fer que sigui draggable
    this.setInteractive();
    if (! obtenir)
      that.scene.input.setDraggable(this);
    else { //OBTENCIO
      this.on('pointerdown', function (event) {
        that.scene.intentDObtencio(that);
      }, this);
    }

    this.lastPos = [this.x, this.y];
    this.on('pointerover', function () {
        that.setScale(1.5*this.relacioScale);
        that.scene.sound.play("so_carta");
        that.dibuixarPeces(0.7*this.relacioScale, this.dep + 1);
    });

    this.on('pointerout', function () {
      this.setScale(1*this.relacioScale);
      that.dibuixarPeces(0.4*this.relacioScale, this.dep + 1);
    });

    this.on('dragstart', function (pointer) {
      that.setVisible(false);
      that.dibuixarPeces(1.6*this.relacioScale, this.dep + 2,true);

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
      that.dibuixarPeces(0.4*this.relacioScale, this.dep + 1);
      if(that.scene.tauler.colocarCarta(that)){
        //that.fitxa.forEach(function(element){element.destroy()});
        that.fitxa.forEach(function(element, index){that.fitxa[index].destroy()});
        that.destroy();
      }else{
        that.x = that.inicialPos[0];
        that.y = that.inicialPos[1];
        that.dibuixarPeces(0.4,this.dep + 1);
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
    this.dibuixarPeces(0.5*this.relacioScale);
  }

  dibuixarPeces(escala, depth_fitxa = 1, marcada = false){
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
          that.fitxa.push(this.scene.add.sprite(nova_x+offset/2+offset*i,nova_y+offset/2+offset*j,'fitxa', that.type-1).setScale(escala).setDepth(depth_fitxa));
        }
      }
    }
  }

  getMatriuPeca(){
    //Pre:-- Post: Retornada la matriu de la peca
    return this.val;
  }

  desplacarEsquerra(){
    //Pre:-- Post: Desplaca tota la matriu de la peca una casella a la esquerra
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 4; j++){
        this.val[j][i] = this.val[j][i+1];
      }
    }
    for (let i = 0; i <= 3; i++){
      this.val[i][3] = 0;
    }
  }

  desplacarAdalt(){
    //Pre:-- Post: Desplaca tota la matriu de la peca una casella cap a dalt
    for (let j = 0; j < 3; j++){
      for (let i = 0; i < 4; i++){
        this.val[j][i] = this.val[j+1][i];
      }
    }
    for (let i = 0; i <= 3; i++){
      this.val[3][i] = 0;
    }
  }

  centrarPeca(){
    //Pre:-- Post: Centra la peca en la carta
    let valors_columna = [0,0,0,0];
    let valors_fila = [0,0,0,0];
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++){
        valors_columna[i] += this.val[j][i];
        valors_fila[j] += this.val[j][i];
      }
    }

    if (valors_columna[0] == 0 && valors_columna[1] == 0 && valors_columna[3] != 0){
      this.desplacarEsquerra();
    }

    if (valors_fila[0] == 0 && valors_fila[3] != 0){
      this.desplacarAdalt();
    }
  }

  generarPecaAleatoria(grandaria){
    //Pre:-- Crea una fitxa aleatoria amb <grandaria> peces
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < 4; j++){
        this.val[j][i] = 0;
      }
    }

    let aux = 1;
    let direccions = [[1,0], [-1,0], [0,-1], [0, 1]];
    let actual = [2, 2];

    let pos_pillades = [[2,2]];
    let nova_direccio = [];

    this.val[actual[1]][actual[0]] = 1;

    while (aux < grandaria){
      let mida = pos_pillades.length-1
      let novaPos = pos_pillades[Phaser.Math.Between(0, mida)];
      nova_direccio = direccions[Phaser.Math.Between(0, 3)];
      actual[0] = novaPos[0] + nova_direccio[0];
      actual[1] = novaPos[1] + nova_direccio[1];

      if (actual[0] >= 0 && actual[0] < 4 && actual[1] >= 0 && actual[1] < 4 && this.val[actual[1]][actual[0]] == 0){
          this.val[actual[1]][actual[0]] = 1;
          pos_pillades.push([actual[0],actual[1]]);
          aux++;
      }
      actual = [];
    }

    this.centrarPeca();

    this.dibuixarPeces(0.4*this.relacioScale);
  }

  morir(){
    //Pre:-- Post: Carta eliminada satisfactoriament
    this.fitxa.forEach(function(element){element.destroy()});
    this.fitxa = [];
    this.destroy();
  }

}
