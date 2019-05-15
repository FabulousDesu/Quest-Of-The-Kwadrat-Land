import { Scene } from 'phaser';
import { Carta } from './Card.js';
import { Deck } from './Deck.js';
import { Globals } from './Globals.js';
import { Hud } from './Hud.js'

//CONSTANTS
const WAIT = 0;
const ATC_FOC = 1;
const DEF_GEL = 2;
const ATC_VERI = 3;
const ATC_ENEMIC = 4;
const FINAL_TORN = 5;
const NOU_TORN = 6;
const CURAR = 7;

export default class FightScene extends Scene {
  //CLASSE PRINCIPAL
  constructor () {
    super({ key: 'FightScene' });
  }

  create () {
    this.add.image(0,0, 'fons').setOrigin(0,0);
    this.deck = new Deck(this);
    this.tauler = new Tauler(this, 200, 200);
    this.children.add(this.tauler);
    this.ma = new Ma(this, 400, 500);
    this.children.add(this.ma);
    this.enemic = new Enemy(this, 585, 220)
    this.children.add(this.enemic);

    this.hud = new Hud(this);
    this.children.add(this.hud);
    this.botoRobar = new BotoRobar(this, 750, 525, this.ma);
    this.children.add(this.botoRobar);
    this.botoFinal = new BotoFinalTurn(this, 750, 400);
    this.children.add(this.botoFinal);

    //Inicialitzar turn
    this.ma.nouTorn();
    this.text = this.add.text(400, 300, "").setFontFamily('Arial').setFontSize(50).setColor('#ffffff');

    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

  }

  update () {
    this.tauler.update();

    if (Phaser.Input.Keyboard.JustDown(this.pause)){
      Globals.escena_ant = 'FightScene';
      this.scene.launch('PauseScene');
      this.scene.pause();
    }
  }
}

class Enemy extends Phaser.GameObjects.Sprite{
  //Enemic del jugador
  constructor (scene, x, y) {
    super(scene, x, y, 'enemic').setScale(2);
    this.scene = scene;
    this.vida = 20;
    this.escut = 0;
    this.veri = 0;
    this.rang_accio = [[1, 5], [1, 5]] // 0 = Attack 1 = Shield

    this.accioActual = [];

    this.textVida = scene.add.text(x-20, y+50, '').setFontFamily('Arial').setFontSize(20).setColor('#ffffff').setStroke('#000000', 7);
    this.textEscut = scene.add.text(x-20, y+75, '').setFontFamily('Arial').setFontSize(20).setColor('#ffffff').setStroke('#000000', 7);
    this.textIntencio = scene.add.text(x-50, y-75, '').setFontFamily('Arial').setFontSize(20).setColor('#ffffff').setStroke('#000000', 7);
    this.textVida.setDepth(1);
    this.textEscut.setDepth(1);
    this.textIntencio.setDepth(1);

    this.nouTorn();
  }

  crearAccio(){
    //Pre:-- Post: L'enemic ha decidit que fer en el seu torn
    this.accioActual[0] = Math.floor(Math.random() * (this.rang_accio[0][1] - this.rang_accio[0][0])) + this.rang_accio[0][0];
    this.accioActual[1] = Math.floor(Math.random() * (this.rang_accio[1][1] - this.rang_accio[1][0])) + this.rang_accio[1][0];

  }

  updateCounters(){
    //Pre:-- Post: Actualitzats els texts de l'enemic
    this.textVida.setText('Vida: ' + this.vida + ' (-' + this.veri + ')');
    this.textEscut.setText('Escut: ' + this.escut);
    this.textIntencio.setText(this.accioActual[0] + '/' + this.accioActual[1]);
  }

  heMort(){
    //Pre:-- Post: Executada l'accio morir si l'enemic ha mort
    if (this.vida < 1){
      console.log("ENEMIC MORT"); //----------------------------------------------------------------------
    }
  }

  golpejat(valor){
    //Pre:-- Post: L'enemic ha sigut golpejat per un atac de dany <valor>
    this.escut -= valor;
    if (this.escut < 0){
      this.vida += this.escut;
      this.escut = 0;
    }

    this.updateCounters();
    this.heMort();
  }

  enverinar(valor){
    //Pre:-- Post: L'enemic ha estat enverinat per un veri de poder <valor>
    this.veri += Math.floor(valor/2);
    this.heMort();
    this.updateCounters();
  }

  executarAccio(){
    //Pre:-- Post: L'enemic ha atacat el jugador i s'ha posat escut
    if (this.veri > 0){
      this.efecteVeri();
    }

    this.escut = 0;
    this.escut += this.accioActual[1];
    Globals.escut -= this.accioActual[0];
    if (Globals.escut < 0){
      Globals.vida += Globals.escut;
      Globals.escut = 0;
    }

    this.updateCounters();
    this.scene.hud.updateCounter();

    if(Globals.vida <= 0){
      console.log("MORT") //----------------------------------------------------------------------
    }

  }

  efecteVeri(){
    //Pre:-- Post: L'enemic ha rebut l'efecte del veri
    this.vida -= this.veri;
    this.veri--;
  }

  nouTorn(){
    //Pre:-- Post:Nou torn de l'enemic creat
    this.crearAccio();
    this.updateCounters();
  }
}

class Ma extends Phaser.GameObjects.Sprite{
  //Ma de cartes del jugador
  constructor (scene, x, y) {
    super(scene, x, y, 'bomb');
    this.scene = scene;
    this.accions = 4;
    this.accionsSprite = [];
    this.cartes = [];

    this.cartes.forEach(function(element){
      scene.children.add(element);
    })
  }

  dibuixarAccions(value){
    //Pre:-- Post: Accions que li queden al jugador dibuixades per pantalla
    if (value < this.accions){
      while(value < this.accions){
        this.accionsSprite[this.accionsSprite.length-1].destroy();
        this.accionsSprite.pop();
        this.accions -= 1;
      }
    }
    else{
      let aux = [667, 65];
      while(this.accionsSprite.length < 4){
        if(this.accionsSprite.length != 0){
          aux[0] = this.accionsSprite[this.accionsSprite.length-1].x + 25;
        }
        let nou = this.scene.add.sprite(aux[0], aux[1], 'accio');
        this.scene.children.add(nou);
        this.accionsSprite.push(nou);
      }
    }
  }

  ordenarCartes(){
    //Pre:-- Post: Colocades les cartes de Ma de manera organitzada
    let aux = 0;
    let mida = this.cartes.length;
    let that = this;
    this.cartes.forEach(function(element, index){
      element.desplacarA([that.x + (index + 0.5 - mida/2) * 82, that.y]);
    })
  };

  robarCarta(){
    //Pre:-- Post: La ma ha extret una carta de deck i l'ha afegit
    this.cartes.push(this.scene.deck.robarCarta());
    this.scene.children.add(this.cartes[this.cartes.length-1]);
    this.ordenarCartes();
  }

  nouTorn(){
    //Pre:-- Post:Nou torn del jugador creat
    this.dibuixarAccions(4)
    this.accions = 4;
    Globals.escut = 0;
    this.scene.hud.updateCounter();
    while(this.cartes.length < 4){
      this.robarCarta();
    }

  }
}

class Tauler extends Phaser.GameObjects.Sprite{
  //Tauler que apareix per pantalla
  constructor (scene, x, y, ){
    super(scene, x, y, 'tauler');
    this.mida = 6;
    //this.fitxesTauler = [[[],[],[],[],[]],[[],[],[],[],[]]];
    this.fitxesTauler = {
      util: [[],[],[],[],[]],
      inutil: [[],[],[],[],[]]
    }
    this.matriu = [[0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0],
                   [0,0,0,0,0,0]];
    //Buida = 0, Foc = 1, Gel = 2, Veri = 3 i Extra = 4

    this.valors = [0,0,0,0,0];
    this.cartesUsades = [];

    this.scene = scene;

    //Funcio per colocar carta, retorna cert si l'ha pogut colocar4
    this.estat = WAIT;
    this.executatUnCop = false;
    this.temps = 0;
    this.tempsEspera = 0;
  }

  update(){
    if (this.estat == WAIT){

    }else if (this.estat == ATC_FOC) {
      if (! this.executatUnCop){
        this.tempsEspera = 0;
        this.temps = new Date();
        this.executatUnCop = true;

        if (this.valors[1] > 0){ //peces de foc
          this.scene.enemic.golpejat(this.valors[1]);
          this.buidarFitxesTauler(1);
          this.tempsEspera = 1000;
        }
      }

      if ((new Date()) - this.temps > this.tempsEspera){
        this.estat = DEF_GEL;
        this.executatUnCop = false;
      }

    }else if (this.estat == DEF_GEL) {
      if (! this.executatUnCop){
        this.tempsEspera = 0;
        this.temps = new Date();
        this.executatUnCop = true;

        if (this.valors[2] > 0){ //peces de gel
          Globals.escut += this.valors[2];
          this.scene.hud.updateCounter();
          this.buidarFitxesTauler(2);
          this.tempsEspera = 1000;
        }
      }

      if ((new Date()) - this.temps > this.tempsEspera){
        this.estat = ATC_VERI;
        this.executatUnCop = false;
      }

    }else if (this.estat == ATC_VERI) {
      if (! this.executatUnCop){
        this.tempsEspera = 0;
        this.temps = new Date();
        this.executatUnCop = true;

        if (this.valors[3] > 0){ //peces de gel
          this.scene.enemic.enverinar(this.valors[3]);
          this.tempsEspera = 1000;
          this.buidarFitxesTauler(3);
        }
      }

      if ((new Date()) - this.temps > this.tempsEspera){
        this.estat = CURAR;
        this.executatUnCop = false;
      }

    }else if (this.estat == CURAR) {
      if (! this.executatUnCop){
        this.tempsEspera = 0;
        this.temps = new Date();
        this.executatUnCop = true;

        if (this.valors[4] > 0){ //peces de gel
          this.buidarFitxesTauler(4);
          let val_curacio = Math.floor(this.valors[4]/4);
          if (val_curacio > 0){
            this.tempsEspera = 1000;
            Globals.vida += val_curacio;
            Globals.vida = Math.min(Math.max(0, Globals.vida), Globals.vidaMaxima); //Math.clamp(Globals.vida, 0, Globals.vidaMaxima);
            this.scene.hud.updateCounter();
          }
        }
      }

      if ((new Date()) - this.temps > this.tempsEspera){
        this.estat = ATC_ENEMIC;
        this.executatUnCop = false;
      }

    }else if (this.estat == ATC_ENEMIC) {
      if (! this.executatUnCop){
        this.tempsEspera = 1000;
        this.temps = new Date();
        this.executatUnCop = true;
        this.scene.enemic.executarAccio();
      }

      if ((new Date()) - this.temps > this.tempsEspera){
        this.estat = FINAL_TORN;
        this.executatUnCop = false;
      }

    }else if (this.estat == FINAL_TORN) {
      if (! this.executatUnCop){
        this.tempsEspera = 1000;
        this.temps = new Date();
        this.executatUnCop = true;
        this.buidarTauler();
      }

      if ((new Date()) - this.temps > this.tempsEspera){
        this.estat = NOU_TORN;
        this.executatUnCop = false;
      }
    }else{
      if (! this.executatUnCop){
        this.tempsEspera = 1000;
        this.temps = new Date();
        this.executatUnCop = true;

        this.scene.ma.nouTorn();
        this.scene.enemic.nouTorn();
        this.executatUnCop = true;
        this.scene.text.setText("NOU TORN");

      }

      if ((new Date()) - this.temps > this.tempsEspera){
        this.estat = WAIT;
        this.scene.text.setText("");
        this.executatUnCop = false;
      }
    }
  }

  colocarCarta(carta){
    //Pre:-- Post: Si es pot carta colocada en el tauler
    if (this.scene.ma.accions <= 0){
      return false;
    }

    //PREGUNTAR VECTOR
    let mousePos = [this.scene.input.mousePointer.x, this.scene.input.mousePointer.y];

    if ( ! (mousePos[0] >= this.x - 150 && mousePos[0] <= this.x + 150 && mousePos[1] >= this.y - 150 && mousePos[1] <= this.y + 150)){
      return false;
    }

    let nou_mouse = [mousePos[0] - (this.x - 150), mousePos[1] - (this.y - 150)]
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
          if (this.matriu[casellaSeleccionada[1] + j][casellaSeleccionada[0] + i] != 0){
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
          let frame = carta.type - 1 + 4;
          let util = false;
          if (!(casellaSeleccionada[1] + j == 0 || casellaSeleccionada[1] + j == 5 || casellaSeleccionada[0] + i == 0 || casellaSeleccionada[0] + i == 5)){
            aux++;
            frame -= 4;
            util = true;
          }

          this.matriu[casellaSeleccionada[1] + j][casellaSeleccionada[0] + i] = carta.type;
          let sprite_aux = this.scene.add.sprite((casellaSeleccionada[0] + i)*50 + (this.x - 150 + 25) , (casellaSeleccionada[1] + j)*50 + (this.x - 150 + 25), 'fitxa', frame);
          sprite_aux.setScale(1.6);
          if (util)
            this.fitxesTauler.util[carta.type].push(sprite_aux);
          else
            this.fitxesTauler.inutil[carta.type].push(sprite_aux);
        }
      }
    }

    this.valors[carta.type] += aux;
    aux = this.scene.ma.cartes.indexOf(carta);
    this.scene.ma.cartes.splice(aux, 1);
    this.scene.ma.ordenarCartes();
    this.cartesUsades.push(carta);
    this.scene.ma.dibuixarAccions(this.scene.ma.accions-1);
    return true;
  }

  buidarFitxesTauler(value){
    //Pre: 0 <= value < 5 Post: Esborrades les peces utils del tauler de tipus <value>
    this.fitxesTauler.util[value].forEach(function(element, index){
      //this.fitxesTauler[UTIL][value][index.destroy();
      element.destroy();
    })
    this.fitxesTauler.util[value] = [];
  }

  buidarTauler(){
    //Pre:-- Post: Esborrades totes les peces no utils del tauler
    this.fitxesTauler.inutil.forEach(function(element, index){
      //this.fitxesTauler[INUTIL][index].forEach(function(element, index2){
      element.forEach(function(element2, index2){
        //this.fitxesTauler[INUTIL][index][index2].destroy();
        element2.destroy();
      })
    })
    this.fitxesTauler.inutil = [[],[],[],[],[]];

    let that = this;
    this.cartesUsades.forEach(function(element){
      that.scene.deck.cartaUsada(element);
    })

    this.valors.forEach(function(element, index){ that.valors[index] = 0 });
    this.cartesUsades = [];

    this.scene.deck.barrejar();

    for(let i = 0; i < 6; i++){
      for(let j = 0; j < 6; j++){
        this.matriu[j][i] = 0;
      }
    }

  }

  finalTurn(){
    //Pre:-- Post: Gestionada la finalitzacio del turn
    let complet = true;
    comprobarQuadratComplet:
    for (let i = 1; i < 5; i++){
      for (let j = 1; j < 5; j++){
        if(this.matriu[j][i] == 0){
          complet = false;
          break comprobarQuadratComplet;
        }
      }
    }


    if (complet){
      let that = this;
      this.valors.forEach(function(element, index){ that.valors[index] *= 2; })
    }

    this.estat = ATC_FOC;
  }

}

class BotoRobar extends Phaser.GameObjects.Sprite{
  //Boto per robar cartes del deck
  constructor(scene, x, y, ma){
    super(scene, x, y, 'boto_robar');
    this.setScale(2);

    this.scene = scene;
    this.ma = ma;
    this.setInteractive();
      this.setFrame(0);


    var that = this;
    this.on('pointerover', function () {
        that.setFrame(1);
    });

    this.on('pointerout', function () {
      that.setFrame(0);
    });

    this.on('pointerdown', function (event) {
      if (that.ma.accions > 0 && that.ma.cartes.length < 7 && that.scene.deck.pucRobarCarta()){
        that.ma.robarCarta();
        this.ma.dibuixarAccions(that.ma.accions-1);
      }
    }, this);
  }


}

class BotoFinalTurn extends Phaser.GameObjects.Sprite{
  //Boto per finalitzar el torn
  constructor(scene, x, y){
    super(scene, x, y, 'boto_final');
    this.setScale(2);
    this.scene = scene;
    var that = this;
    this.setInteractive();

    this.on('pointerover', function () {
        that.setFrame(1);
    });

    this.on('pointerout', function () {
      that.setFrame(0);
    });

    this.on('pointerdown', function (event) {
      that.scene.tauler.finalTurn();
    }, this);
  }
}
