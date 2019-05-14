import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import FightScene from './scenes/FightScene'
import ShopScene from './scenes/ShopScene'


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
        scene: [BootScene, PlayScene, FightScene, ShopScene]
    })
}

export default launch
export {launch}
