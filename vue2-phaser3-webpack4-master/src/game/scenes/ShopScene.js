import { Scene } from 'phaser';
import { Carta } from './Card.js';
import { Globals } from './Globals.js';
import { Hud } from './Hud.js';

export default class ShopScene extends Scene {
  //CLASSE BOTIGA
  constructor () {
    super({ key: 'ShopScene' });
    this.pause
  }

  create () {
    this.children.add(this.add.sprite(0,0,'botiga').setOrigin(0,0).setScale(2));

    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.exitButton = this.add.sprite(750, 550, 'boto_enrere').setScale(2).setDepth(2).setInteractive();
    this.botiguer = this.add.sprite(400,0,'botiguer').setScale(2).setDepth(2);
    this.botiguer.rotation += Math.PI/2;
    this.movimentBotiguer = 0;

    this.hud = new Hud(this);
    this.children.add(this.hud);

    this.cartesVendre = [
      {carta: new Carta(this, 200, 200, Phaser.Math.Between(1,4), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true, 1.3), preu: 2, preuSprite: undefined},
      {carta: new Carta(this, 400, 200, Phaser.Math.Between(1,4), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true, 1.3), preu: 3, preuSprite: undefined},
      {carta: new Carta(this, 600, 200, Phaser.Math.Between(1,4), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true, 1.3), preu: 4, preuSprite: undefined},
      {carta: new Carta(this, 200, 400, Phaser.Math.Between(1,4), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true, 1.3), preu: 5, preuSprite: undefined},
      {carta: new Carta(this, 400, 400, Phaser.Math.Between(1,4), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true, 1.3), preu: 6, preuSprite: undefined},
      {carta: new Carta(this, 600, 400, Phaser.Math.Between(1,4), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true, 1.3), preu: 7, preuSprite: undefined},
    ];
    let that = this;
    this.cartesVendre.forEach(function(element, index){
      element.carta.generarPecaAleatoria(element.preu);
      element.preu *= 2;
      that.cartesVendre[index].preuSprite =  new PreuCarta(that, that.cartesVendre[index]);
      that.children.add(element.preuSprite);
      that.children.add(element.carta);

    });

    this.exitButton.on('pointerover', function () {
        this.setFrame(1);
    });
    this.exitButton.on('pointerout', function () {
        this.setFrame(0);
    });
    this.exitButton.on('pointerdown', function (event) {
      that.scene.resume('MapScene');
      that.scene.get('MapScene').hud.updateCounter();
      that.scene.sleep();
    }, this);
  }

  update (){
    this.movimentBotiguer += 0.05;
    this.botiguer.y = 20 + (Math.sin(this.movimentBotiguer)+1)*20
    if (this.movimentBotiguer >= 2*Math.PI)
      this.movimentBotiguer = 0;

    if (Phaser.Input.Keyboard.JustDown(this.pause)){
      Globals.escena_ant = 'ShopScene';
      this.scene.launch('PauseScene');
      this.scene.pause();
    }
  }

  intentDObtencio(carta){
    let trobat = false;
    let i = 0;
    while( ! trobat && i < this.cartesVendre.length){
      if (carta === this.cartesVendre[i].carta){
        console.log("trobada");
        trobat = true;
      }else {
        i++;
      }
    }

    let esquemaEscollida = this.cartesVendre[i];
    console.log(esquemaEscollida);

    if (Globals.monedes >= esquemaEscollida.preu){
      Globals.monedes -= esquemaEscollida.preu;
      this.hud.updateCounter();

      Globals.deck.push({type: esquemaEscollida.carta.type, forma:esquemaEscollida.carta.getMatriuPeca()});
      console.log(Globals.deck);
      esquemaEscollida.preuSprite.morir();
      esquemaEscollida.carta.morir();
      this.cartesVendre.splice(i, 1);
    }
  }
}

class PreuCarta extends Phaser.GameObjects.Sprite{
  constructor(scene, cartaCompleta){
    super(scene, cartaCompleta.carta.x - 20, cartaCompleta.carta.y + 75, 'moneda').setScale(0.65).setDepth(4);
    this.scene = scene;
    this.cartaCompleta = cartaCompleta;
    this.text = this.scene.add.text(cartaCompleta.carta.x, cartaCompleta.carta.y + 65, 'x ' + cartaCompleta.preu).setFontFamily('Arial').setFontSize(15).setColor('#ffffff').setStroke('#000000', 4).setDepth(4);
  }

  morir(){
    this.text.destroy();
    this.destroy();
  }
}
