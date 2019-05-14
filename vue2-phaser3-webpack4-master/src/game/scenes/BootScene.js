import {Scene} from 'phaser'
import sky from '@/game/assets/sky.png';
import bomb from '@/game/assets/bomb.png';
import tauler from '@/game/assets/tauler.png';
import carta_base from '@/game/assets/card_base.png';
import enemic_base from '@/game/assets/enemic_base.png';
import base_fitxa from '@/game/assets/fitxes/fitxe_quadrat.png';
import boto_robar from '@/game/assets/robar_carta.png';
import boto_finalitzar from '@/game/assets/next_turn.png';
import hud from '@/game/assets/hud.png';
import cor from '@/game/assets/cor.png';
import escut from '@/game/assets/escut.png';
import moneda from '@/game/assets/moneda.png';
import accio from '@/game/assets/accio.png';
import fonsCombat from '@/game/assets/fonsCombat.png';
import fonsBotiga from '@/game/assets/botiga.png';
import botiguer from '@/game/assets/botiga_botiguer.png';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('sky', sky);
        this.load.image('bomb', bomb);
        this.load.image('tauler', tauler);
        this.load.image('carta', carta_base);
        this.load.image('enemic', enemic_base);
        this.load.image('hud', hud);
        this.load.image('accio', accio);
        this.load.image('fons', fonsCombat);
        this.load.image('cor', cor);
        this.load.image('escut', escut);
        this.load.image('moneda', moneda);
        this.load.image('botiga', fonsBotiga);
        this.load.image('botiguer', botiguer);
        this.load.spritesheet('fitxa', base_fitxa, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('boto_robar', boto_robar, { frameWidth: 30, frameHeight: 44 });
        this.load.spritesheet('boto_final', boto_finalitzar, { frameWidth: 35, frameHeight: 20 });
        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])
    }

    create() {

        this.scene.start('VictoryScene');
    }
}
