import {Scene} from 'phaser'
import sky from '@/game/assets/sky.png';
import bomb from '@/game/assets/bomb.png';
import mapa from '@/game/assets/mapa1.png';
import casella from '@/game/assets/casella.png';
import casellaT from '@/game/assets/casellaT.png';
import player from '@/game/assets/player.png';
import enemic from '@/game/assets/enemic.png';
import enemy from '@/game/assets/enemic.png';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('sky', sky)
        this.load.image('bomb', bomb)
        this.load.image('mapa1', mapa)
        this.load.image('casella', casella)
        this.load.image('casellaT', casellaT)
        this.load.spritesheet('player', player, {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('enemic', enemic, {frameWidth: 32, frameHeight: 32})
        this.load.image('enemy', enemy)
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() {
        this.scene.start('TestScene')
    }
}
