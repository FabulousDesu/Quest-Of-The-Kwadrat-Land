import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import FightScene from './scenes/FightScene'
import ShopScene from './scenes/ShopScene'
import VictoryScene from './scenes/VictoryScene'
import TestScene from './scenes/TestScene'

import TavernScene from './scenes/TavernScene'
import PauseScene from './scenes/PauseScene'
import GameOverScene from './scenes/GameOverScene'
import MainManuScene from './scenes/MainManuScene'

function launch() {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 0},
                debug: false
            }
        },
        pixelArt: true,
        scene: [BootScene, PlayScene, FightScene, ShopScene, VictoryScene, TavernScene, PauseScene, GameOverScene, MainManuScene, TestScene]
    })
}
export default launch
export {launch}
