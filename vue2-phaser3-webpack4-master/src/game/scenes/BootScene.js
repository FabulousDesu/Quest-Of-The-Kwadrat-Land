import {Scene} from 'phaser'
import sky from '@/game/assets/sky.png';
import bomb from '@/game/assets/bomb.png';
import tauler from '@/game/assets/tauler.png';
import carta_base from '@/game/assets/card_base.png';
import enemic_base from '@/game/assets/enemic_base.png';
import base_fitxa from '@/game/assets/fitxes/fitxe_quadrat.png';
import boto_robar from '@/game/assets/boto_robarCarta.png';
import boto_finalitzar from '@/game/assets/boto_finalTurn.png';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('sky', sky)
        this.load.image('bomb', bomb)
        this.load.image('tauler', tauler)
        this.load.image('carta', carta_base)
        this.load.image('enemic', enemic_base)
        this.load.image('boto_robar', boto_robar)
        this.load.image('boto_final', boto_finalitzar)
        this.load.spritesheet('fitxa', base_fitxa, { frameWidth: 32, frameHeight: 32 });
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() {
        this.scene.start('FightScene')
    }
}
