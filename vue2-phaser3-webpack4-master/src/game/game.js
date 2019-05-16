import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import FightScene from './scenes/FightScene'
import ShopScene from './scenes/ShopScene'
import VictoryScene from './scenes/VictoryScene'
import MapScene from './scenes/MapScene'

import TavernScene from './scenes/TavernScene'
import PauseScene from './scenes/PauseScene'
import GameOverScene from './scenes/GameOverScene'
import MainMenuScene from './scenes/MainMenuScene'

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
        scene: [BootScene, FightScene, ShopScene, VictoryScene, TavernScene, PauseScene, GameOverScene, MainMenuScene, MapScene]
    })
}
export default launch
export {launch}
