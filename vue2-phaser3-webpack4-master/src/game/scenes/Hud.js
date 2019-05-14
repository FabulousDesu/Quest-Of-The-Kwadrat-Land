import { Globals } from './Globals.js';

export class Hud extends Phaser.GameObjects.Sprite{
  //Hud de la pantalla del jugador
  constructor(scene){
    super(scene,40,500,'cor');
    this.setOrigin(0,0);
    this.scene = scene;
    this.setDepth(0);

    this.textVida = scene.add.text(40,508,'', {}).setFontFamily('Arial').setFontSize(22).setColor('#ffffff');
    this.textVida.setStroke('#000000', 5);
    this.textVida.setDepth(1);

    this.spriteMonedes = scene.add.sprite(30,570, 'moneda');
    this.textMonedes = scene.add.text(50,570,'').setFontFamily('Arial').setFontSize(15).setColor('#ffffff').setStroke('#000000', 5);
    this.textMonedes.setDepth(1);

    this.spriteEscut = scene.add.sprite(69, 485, 'escut').setDepth(1);
    this.textEscut = scene.add.text(60,475,'').setFontFamily('Arial').setFontSize(22).setColor('#ffffff');
    this.textEscut.setStroke('#000000', 5);
    this.textEscut.setDepth(2);

    this.updateCounter();
  }

  updateCounter(){
    //Pre:-- Post: Valors Actualitzats i mostrats per pantalla.
    this.textVida.setText(Globals.vida + '/' + Globals.vidaMaxima);
    if (Globals.escut == 0){
      this.textEscut.setText("");
      this.spriteEscut.setVisible(false);
    }else{
      this.spriteEscut.setVisible(true);
      this.textEscut.setText(Globals.escut);
    }

    this.textMonedes.text = "x " + Globals.monedes;
  }
}
