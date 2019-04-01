import {Scene} from 'phaser'
import sky from '@/game/assets/sky.png';
import bomb from '@/game/assets/bomb.png';
import tauler from '@/game/assets/tauler.png';
import carta_base from '@/game/assets/card_base.png';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('sky', sky)
        this.load.image('bomb', bomb)
        this.load.image('tauler', tauler)
        this.load.image('carta', carta_base)
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() {
        this.scene.start('FightScene')
    }
}
