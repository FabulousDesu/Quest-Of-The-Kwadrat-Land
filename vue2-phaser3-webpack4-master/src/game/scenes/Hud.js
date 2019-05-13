import { Globals } from './Globals.js';

export class Hud extends Phaser.GameObjects.Sprite{
  //Hud de la pantalla del jugador
  constructor(scene, x, y){
    super(scene,x,y,'cor');
    this.setOrigin(0,0);
    this.scene = scene;
    this.setDepth(0);

    this.textVida = scene.add.text(x,y+8,'', {}).setFontFamily('Arial').setFontSize(22).setColor('#ffffff');
    this.textVida.setStroke('#000000', 5);
    this.textVida.setDepth(1);

    this.textMonedes = scene.add.text(x-35,y+80,'').setFontFamily('Arial').setFontSize(12).setColor('#000000');
    this.textMonedes.setDepth(1);

    this.spriteEscut = scene.add.sprite(x+29,y - 15, 'escut').setDepth(1);
    this.textEscut = scene.add.text(x+20,y - 25,'').setFontFamily('Arial').setFontSize(22).setColor('#ffffff');
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

    this.textMonedes.text = 'Monedes: ' + Globals.monedes;
  }
}
