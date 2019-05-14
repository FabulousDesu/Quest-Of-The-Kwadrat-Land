import {Scene} from 'phaser'
import sky from '@/game/assets/sky.png';
import bomb from '@/game/assets/bomb.png';
import fmenu from '@/game/assets/taberna.png';
import taverner2 from '@/game/assets/taberner.png';
import porta from '@/game/assets/porta.png';
import basepause from '@/game/assets/pause.png';
import volum from '@/game/assets/pause_volum.png';
import b_volum from '@/game/assets/control_volum.png';
import boto_resume from '@/game/assets/boto_resume.png';
import boto_options from '@/game/assets/boto_options.png';
import boto_menu from '@/game/assets/boto_menu.png';
import boto_enrere from '@/game/assets/boto_enrere.png';
import dialeg_taberner from '@/game/assets/dialeg_taberner.png';
import botoyes from '@/game/assets/botoyes.png';
import botono from '@/game/assets/botono.png';
import gameover from '@/game/assets/gameover.png';
import mascara from '@/game/assets/mascara.png';
import titoljoc from '@/game/assets/titoljoc.png';
import boto_play from '@/game/assets/boto_play.png';
import robar_carta from '@/game/assets/robar_carta.png';

import sound from '@/game/assets/Sound/Loopster.ogg';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        this.load.image('sky', sky)
        this.load.image('bomb', bomb)
        this.load.image('fmenu', fmenu)
        this.load.spritesheet('taverner2', taverner2, { frameWidth: 46, frameHeight: 62 })
        this.load.image('porta', porta)
        this.load.image('basepause', basepause)
        this.load.image('volum', volum)
        this.load.image('b_volum', b_volum)
        this.load.spritesheet('boto_resume', boto_resume, { frameWidth: 175, frameHeight: 42 })
        this.load.spritesheet('boto_options', boto_options, { frameWidth: 175, frameHeight: 42 })
        this.load.spritesheet('boto_menu', boto_menu, { frameWidth: 175, frameHeight: 42 })
        this.load.spritesheet('boto_enrere', boto_enrere, { frameWidth: 27, frameHeight: 21 })
        this.load.image('dialeg_tabarner', dialeg_taberner)
        this.load.spritesheet('botoyes', botoyes, { frameWidth: 63, frameHeight: 14 })

        this.load.spritesheet('robar_carta', robar_carta, { frameWidth: 30, frameHeight: 44 })

        this.load.spritesheet('botono', botono, { frameWidth: 63, frameHeight: 14 })
        this.load.spritesheet('mascara', mascara, { frameWidth: 200, frameHeight: 185 })
        this.load.image('gameover', gameover)
        this.load.image('titoljoc', titoljoc)
        this.load.spritesheet('boto_play', boto_play, { frameWidth: 175, frameHeight: 42 })

        this.load.audio('sound', sound)
    }



        // this.load.audio('thud', ['assets/thud.mp3', 'assets/thud.ogg'])

    create() {
        this.scene.start('TavernScene')
    }
}
