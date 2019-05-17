import { Scene } from 'phaser';
import { Globals } from './Globals.js';
import { Carta } from './Card.js';
import { Hud } from './Hud.js';

//VARIABLES
var bombFollow; //seguidor del path
var speed = 0.2; //velocitat del player
var posicioYEnemics = 7; //pixels a restar a l'Y de la posicio dels enemics respecte la casella on es situa
var posicioXEnemics = 2; //pixels a restar a l'X de la posicio dels enemics respecte la casella on es situa
var posicioYCaselles = 4; //pixels a sumar a l'Y de la posicio de la casella
var tipusCasella = ["enemic_mapa", "event", "normal", "taverna", "botiga", "final"]; //array per guardar els diferents tipus de caselles que hi ha,
var actuar = true;                                                //
var un_cop = false;
//---tecles---
var up;
var down;
var left;
var right;

var entrar;

//---paths---
var path = [
  new Phaser.Curves.Path(15, 313).lineTo(15, 313), //punt inicial i punt final
  new Phaser.Curves.Path(15, 313).lineTo(224, 313),
  new Phaser.Curves.Path(224, 313).lineTo(288, 313),
  new Phaser.Curves.Path(288, 313).lineTo(288, 154),
  new Phaser.Curves.Path(288, 154).lineTo(432, 154),
  new Phaser.Curves.Path(224, 313).lineTo(224, 407),
  new Phaser.Curves.Path(224, 407).lineTo(372, 407),
  new Phaser.Curves.Path(536, 407).lineTo(608, 407),
  new Phaser.Curves.Path(608, 407).lineTo(608, 313),
  new Phaser.Curves.Path(608, 313).lineTo(784, 313),
  new Phaser.Curves.Path(784, 313).lineTo(608, 313),
  new Phaser.Curves.Path(608, 313).lineTo(608, 407),
  new Phaser.Curves.Path(608, 407).lineTo(536, 407),
  new Phaser.Curves.Path(372, 407).lineTo(224, 407),
  new Phaser.Curves.Path(224, 407).lineTo(224, 313),
  new Phaser.Curves.Path(432, 154).lineTo(288, 154),
  new Phaser.Curves.Path(288, 154).lineTo(288, 313),
  new Phaser.Curves.Path(288, 313).lineTo(224, 313),
  new Phaser.Curves.Path(224, 313).lineTo(15, 313),
  new Phaser.Curves.Path(372, 407).lineTo(536, 407),
  new Phaser.Curves.Path(536, 407).lineTo(372, 407)
];

//CASELLA
export class Casella extends Phaser.GameObjects.Sprite {
  constructor (num, up, down, left, right, scene, x, y, casella, tipus) {
    super(scene, x, y, casella);
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.num = num;
    this.tipus = tipus;
    this.EscenaPare = scene;

    if (this.tipus == "enemic_mapa"){
      this.EscenaPare.anims.create({
        key: "enemic_mapa",
        frameRate: 2,
        repeat: -1,
        frames: this.EscenaPare.anims.generateFrameNumbers('enemic_mapa', {
          frames: [0,1]
        })
      })
      this.enemySprite = this.EscenaPare.add.sprite(x - posicioXEnemics, y - posicioYEnemics, 'enemic_mapa');
      this.enemySprite.play("enemic_mapa");
      this.enemySprite.setDepth(1);
    }else if (this.tipus == "event"){
      this.activada = false;
    }

  }
  setSeg (upSeg, downSeg, leftSeg, rightSeg) {
    //Pre: upSeg: casella seguent en clicar up, downSeg: casella seguent en clicar down, leftSeg: casella seguent en clicar left
    //     rightSeg: casella seguent en clicar right
    //Post: Estableix quines son les caselles seguents segons el boto que es cliqui
    this.upSeg = upSeg;
    this.downSeg = downSeg;
    this.leftSeg = leftSeg;
    this.rightSeg = rightSeg;
  }
  activarCasella () {
    //Pre:-- Post: Activa la casella dels jugadors
    //Activa les diferents funcions segons el tipus de casella
    if (this.tipus === tipusCasella[0]) {
      //si la casella es de tipus combat, et porta a l'escena del combat
      this.EscenaPare.scene.launch('FightScene');
      this.EscenaPare.scene.bringToTop('FightScene');
      this.EscenaPare.scene.pause();
      this.tipus = tipusCasella[2];
      this.enemySprite.destroy();

    } else if (this.tipus === tipusCasella[1]) {
      //si la casella es de tipus event, activa l'event
      if (! this.activada){
        this.event = new Event(this.EscenaPare);
        this.EscenaPare.children.add(this.event);
        this.activada = true;
        this.actuar = false;
      }

    }else if (this.tipus === tipusCasella[5]){
      this.EscenaPare.scene.launch('GameOverScene', [true]);
      if (this.EscenaPare.scene.isSleeping('ShopScene'))
        this.EscenaPare.scene.stop('ShopScene');
      this.EscenaPare.scene.stop();
    }
  }
}

//---caselles---

var casella0, casella1, casella2, casella3, casella4, casella5, casella6, casella7, casella8, casella9, casella10;

//JUGADOR
var jugador = {
  sprite: undefined,
  casella: undefined,
}

class Event extends Phaser.GameObjects.Sprite{
  constructor(scene){
    super(scene, 400, 300, 'event').setScale(2).setInteractive().setDepth(3);
    this.EscenaPare = scene;
    this.EscenaPare.event = this;
    this.cartesEliminades = [];

    for (let i = 0; i < 4; i++){
      let aux = Phaser.Math.Between(0, Globals.deck.length-1);
      this.cartesEliminades.push({type: Globals.deck[aux].type, forma: Globals.deck[aux].forma});

      Globals.deck.splice(aux,1);
    }

    this.cops = 0;
    this.on('pointerdown', function (event) {
      let that = this;
      if (this.cops == 0){
        this.cartesEliminades.forEach(function(element, index){
          that.cartesEliminades[index] = new Carta(that.EscenaPare, 160 + 160*index, 300, that.cartesEliminades[index].type,  that.cartesEliminades[index].forma, true, 2, 4);
          that.EscenaPare.children.add(that.cartesEliminades[index]);
        });
        this.cops++;
      }else if (this.cops == 1){
        this.morir();
        this.cops++;
      }
    }, this);
  }

  morir(){
    //Pre:-- Post: Elimina les cartes de la ma.
    this.cartesEliminades.forEach(function(element){element.morir()});
    this.cartesEliminades = [];
    actuar = true;
    this.destroy();
  }
}

export default class MapScene extends Scene {
  constructor () {
    super({ key: 'MapScene' });
    this.pause
  }

  create () {
    //FONS
    let mapa1 = this.add.image(400, 300, 'mapa1');

    //SPRITE JUGADOR
    this.player = this.add.sprite(10, 313 - posicioYEnemics, 'player');
    this.hud = new Hud(this, 0,0);
    this.children.add(this.hud);

    //INICIALITZAR TECLES
    up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    entrar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    //INICIALITZAR CASELLES
    casella0 = this.add.existing(new Casella(0, undefined, undefined, undefined, path[1], this, 15, 313 + posicioYCaselles, 'casellaT', tipusCasella[2]));
    casella1 = this.add.existing(new Casella(1, undefined, path[5], path[18], path[2], this, 224, 313 + posicioYCaselles, 'casella', tipusCasella[0]));
    casella2 = this.add.existing(new Casella(2, path[3], undefined, path[17], undefined, this, 288, 313 + posicioYCaselles, 'casella', tipusCasella[2]));
    casella3 = this.add.existing(new Casella(3, undefined, path[16], undefined, path[4], this, 288, 154 + posicioYCaselles, 'casella', tipusCasella[0]));
    casella4 = this.add.existing(new Casella(4, undefined, undefined, path[15], undefined, this, 432, 154 + posicioYCaselles, 'casellaT', tipusCasella[3]));
    casella5 = this.add.existing(new Casella(5, path[14], undefined, undefined, path[6], this, 224, 407 + posicioYCaselles, 'casellaT', tipusCasella[4]));
    casella6 = this.add.existing(new Casella(6, undefined, undefined, path[20], path[7], this, 536, 407 + posicioYCaselles, 'casellaT', tipusCasella[2]));
    casella7 = this.add.existing(new Casella(7, path[8], undefined, path[12], undefined, this, 608, 407 + posicioYCaselles, 'casella', tipusCasella[2]));
    casella8 = this.add.existing(new Casella(8, undefined, path[11], undefined, path[9], this, 608, 313 + posicioYCaselles, 'casella', tipusCasella[0]));
    casella9 = this.add.existing(new Casella(9, undefined, undefined, path[10], undefined, this, 784, 313 + posicioYCaselles, 'casellaT', tipusCasella[5]));
    casella10 = this.add.existing(new Casella(10, undefined, undefined, path[13], path[19], this, 372, 407 + posicioYCaselles, undefined, tipusCasella[1]));

    //DEFINICIO CASELLES SEGUENTS
    casella0.setSeg(undefined, undefined, undefined, casella1);
    casella1.setSeg(undefined, casella5, casella0, casella2);
    casella2.setSeg(casella3, undefined, casella1, undefined);
    casella3.setSeg(undefined, casella2, undefined, casella4);
    casella4.setSeg(undefined, undefined, casella3, undefined);
    casella5.setSeg(casella1, undefined, undefined, casella10);
    casella6.setSeg(undefined, undefined, casella10, casella7);
    casella7.setSeg(casella8, undefined, casella6, undefined);
    casella8.setSeg(undefined, casella7, undefined, casella9);
    casella9.setSeg(undefined, undefined, casella8, undefined);
    casella10.setSeg(undefined, undefined, casella5, casella6);

    //ANIMACIONS
    //---player---
    this.anims.create({
      key: "player",
      frameRate: 7,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('player', {
        frames: [0,1,2,3]
      })
    })

    this.player.play("player");

    //casella inicial del player
    jugador.casella = casella0;

    //profunditat dels sprites
    this.player.setDepth(2);

    //POSICIO INICIAL
    bombFollow = this.add.follower(path[0], 0, 0, jugador.sprite);
    bombFollow.startFollow({
        positionOnPath: true, //seguir la linia
        duration: 3000, //duracio del seguiment
        yoyo: false, //anada i tornada
        repeat: 0, //repetir el cami
        rotateToPath: false, //rotar l'esprite respecte el path
        verticalAdjust: true
    });

    //Pausar el joc
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  update () {
    //moviment de l'sprite del player
    this.player.x = bombFollow.x;
    this.player.y = bombFollow.y - posicioYEnemics;

    if (actuar){
      //Pulsem tecla up
      if (Phaser.Input.Keyboard.JustDown(up)){
        if (jugador.casella.up !== undefined) { //Si hi ha path pel cual anar
          //calculem la distancia que s'ha de recorrer
          var dist = jugador.casella.y - jugador.casella.upSeg.y;
          let that = this;
          actuar = false;
          this.time.addEvent({delay: dist / speed, repeat: 0, callback: that.arribarACasella});
          bombFollow.startFollow({
              positionOnPath: true,
              duration: dist / speed, //canviem la duracio segons la distacia i la velocitat del player
              yoyo: false,
              repeat: 0,
              rotateToPath: false,
              verticalAdjust: true
          });

          //actualitzem el path a seguir
          bombFollow.setPath(jugador.casella.up);

          //actualitzem la casella actual
          jugador.casella = jugador.casella.upSeg;
        }
      }else if (Phaser.Input.Keyboard.JustDown(down)){
        if (jugador.casella.down !== undefined) { //Si hi ha path pel cual anar

          //calculem la distancia que s'ha de recorrer
          var dist = jugador.casella.downSeg.y - jugador.casella.y;
          let that = this;
          actuar = false;
          this.time.addEvent({delay: dist / speed, repeat: 0, callback: that.arribarACasella});
          bombFollow.startFollow({
              positionOnPath: true,
              duration: dist / speed, //canviem la duracio segons la distacia i la velocitat del player
              yoyo: false,
              repeat: 0,
              rotateToPath: false,
              verticalAdjust: true
          });

          //actualitzem el path a seguir
          bombFollow.setPath(jugador.casella.down);

          //actualitzem la casella actual
          jugador.casella = jugador.casella.downSeg;
        }
      }else if (Phaser.Input.Keyboard.JustDown(left)){
        if (jugador.casella.left !== undefined) { //Si hi ha path pel cual anar

          //Actulitzem l'escal X a -1 per a que l'esprite s'inverteixi i miri en la direccio a la que es dirigeix
          this.player.scaleX = -1;

          //calculem la distancia que s'ha de recorrer
          var dist = jugador.casella.x - jugador.casella.leftSeg.x;
          let that = this;
          actuar = false;
          this.time.addEvent({delay: dist / speed, repeat: 0, callback: that.arribarACasella});
          bombFollow.startFollow({
              positionOnPath: true,
              duration: dist / speed, //canviem la duracio segons la distacia i la velocitat del player
              yoyo: false,
              repeat: 0,
              rotateToPath: false,
              verticalAdjust: true
          });

          //actualitzem el path a seguir
          bombFollow.setPath(jugador.casella.left);

          //actualitzem la casella actual
          jugador.casella = jugador.casella.leftSeg;
        }
      }else if (Phaser.Input.Keyboard.JustDown(right)){
        if (jugador.casella.right !== undefined) { //Si hi ha path pel cual anar

          //Actulitzem l'escal X a 1 per a que l'esprite s'inverteixi i miri en la direccio a la que es dirigeix
          this.player.setScale(1);

          //calculem la distancia que s'ha de recorrer
          var dist = jugador.casella.rightSeg.x - jugador.casella.x;
          let that = this;
          actuar = false;
          this.time.addEvent({delay: dist / speed, repeat: 0, callback: that.arribarACasella});
          bombFollow.startFollow({
              positionOnPath: true,
              duration: dist / speed, //canviem la duracio segons la distacia i la velocitat del player
              yoyo: false,
              repeat: 0,
              rotateToPath: false,
              verticalAdjust: true
          });

          //actualitzem el path a seguir
          bombFollow.setPath(jugador.casella.right);

          //actualitzem la casella actual
          jugador.casella = jugador.casella.rightSeg;
        }
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.pause)){
      Globals.escena_ant = 'MapScene';
      this.scene.launch('PauseScene');
      this.scene.bringToTop('PauseScene');
      this.scene.pause();
    }

    if (Phaser.Input.Keyboard.JustDown(entrar)){
      if(jugador.casella.tipus == "botiga"){
        if (this.scene.isSleeping('ShopScene')){
          this.scene.wake('ShopScene');
        }else{
          this.scene.launch('ShopScene');
        }
        this.scene.bringToTop('ShopScene');
        this.scene.sendToBack('MapScene');
        this.scene.pause();
      }else if(jugador.casella.tipus == "taverna"){
        this.scene.launch('TavernScene');
        this.scene.bringToTop('TavernScene');
        this.scene.pause();

      }
    }
  }

  arribarACasella(){
    //Pre:-- Post: Activa la casella a la que es troba el jugador.
    jugador.casella.activarCasella();
    actuar = true;
  }

  intentDObtencio(carta){
    //Pre:-- Post: Eliminades les cartes de l'event.
    this.event.morir();
  }

}
