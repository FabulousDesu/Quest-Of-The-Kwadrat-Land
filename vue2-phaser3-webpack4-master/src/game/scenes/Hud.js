import { Globals } from './Globals.js';

export class Hud extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y){
    super(scene,x,y,'hud');
    this.setOrigin(0,0);
    this.scene = scene;
    this.setDepth(0);

    this.textVida = scene.add.text(x+6,y+5,'').setFontFamily('Arial').setFontSize(15).setColor('#000000');
    this.textVida.setDepth(1);
    this.textMonedes = scene.add.text(x+6,y+40,'').setFontFamily('Arial').setFontSize(15).setColor('#000000');
    this.textMonedes.setDepth(1);

    this.textEscut = scene.add.text(x+6,y+22.5,'').setFontFamily('Arial').setFontSize(15).setColor('#000000');
    this.textEscut.setDepth(1);

    let that = this;
    this.updateCounter = function(){
      this.textVida.text = 'Vida: ' + Globals.vida + '/' + Globals.vidaMaxima;
      this.textEscut.text = 'Escut: ' + Globals.escut;
      this.textMonedes.text = 'Monedes: ' + Globals.monedes;
    }

    this.updateCounter();
  }
}
