import {Scene} from 'phaser'

//MENU PRINCIPAL---------------------------------------------
import fonsMenu from '@/game/assets/fonsMenu.png';
import mascara from '@/game/assets/mascara.png';
import titoljoc from '@/game/assets/titoljoc.png';
import boto_play from '@/game/assets/boto_play.png';
import boto_tuto from '@/game/assets/botoTuto.png';
import boto_credits from '@/game/assets/botoCredits.png';

//TAVERNA
import fmenu from '@/game/assets/taberna.png';
import taverner2 from '@/game/assets/taberner.png';
import porta from '@/game/assets/porta.png';
import dialeg_taberner from '@/game/assets/dialeg_taberner.png';
import botoyes from '@/game/assets/botoyes.png';
import botono from '@/game/assets/botono.png';

//BOTIGA
import fonsBotiga from '@/game/assets/botiga.png';
import botiguer from '@/game/assets/botiga_botiguer.png';

//MENU PAUSA
import basepause from '@/game/assets/pause.png';
import volum from '@/game/assets/pause_volum.png';
import b_volum from '@/game/assets/control_volum.png';
import boto_resume from '@/game/assets/boto_resume.png';
import boto_options from '@/game/assets/boto_options.png';
import boto_menu from '@/game/assets/boto_menu.png';
import boto_enrere from '@/game/assets/boto_enrere.png';

//COMBAT
import tauler from '@/game/assets/tauler.png';
import carta_base from '@/game/assets/card_base.png';
import enemic_base from '@/game/assets/enemic_base.png';
import base_fitxa from '@/game/assets/fitxes/fitxe_quadrat.png';
import boto_robar from '@/game/assets/robar_carta.png';
import boto_finalitzar from '@/game/assets/next_turn.png';
import fonsCombat from '@/game/assets/fonsCombat.png';
import nouTorn from '@/game/assets/nouTorn.png';

//HUD
import hud from '@/game/assets/hud.png';
import cor from '@/game/assets/cor.png';
import escut from '@/game/assets/escut.png';
import moneda from '@/game/assets/moneda.png';
import accio from '@/game/assets/accio.png';

//MAPA
import mapa from '@/game/assets/mapa1.png';
import casella from '@/game/assets/casella.png';
import casellaT from '@/game/assets/casellaT.png';
import player from '@/game/assets/player.png';
import enemic_mapa from '@/game/assets/enemic.png';
import eventSprite from '@/game/assets/event.png';

//EXTRES
import bomb from '@/game/assets/bomb.png';
import gameover from '@/game/assets/gameover.png';
import victoria from '@/game/assets/victory.png';
import afterlife from '@/game/assets/afterlife.png';

//SO
import ost from '@/game/assets/Sound/Loopster.ogg';

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {
        //MENU
        this.load.image('fonsMenu', fonsMenu);
        this.load.spritesheet('mascara', mascara, { frameWidth: 200, frameHeight: 185 });
        this.load.image('titoljoc', titoljoc);
        this.load.spritesheet('boto_play', boto_play, { frameWidth: 175, frameHeight: 42 });
        this.load.spritesheet('boto_tuto', boto_tuto, { frameWidth: 13, frameHeight: 19 });
        this.load.spritesheet('boto_credits', boto_credits, { frameWidth: 13, frameHeight: 19 });


        //TAVERNA
        this.load.image('fmenu', fmenu);
        this.load.spritesheet('taverner2', taverner2, { frameWidth: 46, frameHeight: 62 });
        this.load.image('porta', porta);
        this.load.image('dialeg_tabarner', dialeg_taberner);
        this.load.spritesheet('botoyes', botoyes, { frameWidth: 63, frameHeight: 14 });
        this.load.spritesheet('botono', botono, { frameWidth: 63, frameHeight: 14 });

        //BOTIGA
        this.load.image('botiga', fonsBotiga);
        this.load.image('botiguer', botiguer);

        //MENU PAUSA
        this.load.image('basepause', basepause);
        this.load.image('volum', volum);
        this.load.image('b_volum', b_volum);
        this.load.spritesheet('boto_resume', boto_resume, { frameWidth: 175, frameHeight: 42 });
        this.load.spritesheet('boto_options', boto_options, { frameWidth: 175, frameHeight: 42 });
        this.load.spritesheet('boto_menu', boto_menu, { frameWidth: 175, frameHeight: 42 });
        this.load.spritesheet('boto_enrere', boto_enrere, { frameWidth: 27, frameHeight: 21 });

        //COMBAT
        this.load.image('tauler', tauler);
        this.load.image('carta', carta_base);
        this.load.image('enemic', enemic_base);
        this.load.spritesheet('fitxa', base_fitxa, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('boto_robar', boto_robar, { frameWidth: 30, frameHeight: 44 });
        this.load.spritesheet('boto_final', boto_finalitzar, { frameWidth: 35, frameHeight: 20 });
        this.load.image('fons', fonsCombat);
        this.load.image('nouTorn', nouTorn);

        //HUD
        this.load.image('hud', hud);
        this.load.image('cor', cor);
        this.load.image('escut', escut);
        this.load.image('moneda', moneda);
        this.load.image('accio', accio);

        //MAPA
        this.load.image('mapa1', mapa)
        this.load.image('casella', casella)
        this.load.image('casellaT', casellaT)
        this.load.spritesheet('player', player, {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('enemic_mapa', enemic_mapa, {frameWidth: 32, frameHeight: 32})

        //EXTRES
        this.load.image('gameover', gameover)
        this.load.image('bomb', bomb);
        this.load.image('victoria', victoria);
        this.load.image('event', eventSprite);
        this.load.image('afterlife', afterlife);

        //SO
        this.load.audio('ost', ost);
    }

    create() {

        this.scene.start('MainMenuScene');
    }
}
