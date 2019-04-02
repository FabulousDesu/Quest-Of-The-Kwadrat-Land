import { Scene } from 'phaser';

var graphics;
var rect;
var zone;

export default class FightScene extends Scene {
  constructor () {
    super({ key: 'FightScene' });

  }

  create () {
    //Zones
    graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 }});
    rect = new Phaser.Geom.Rectangle(200, 500, 400, 100);

    //Tauler
    this.tauler = this.add.image(200, 200, 'tauler');
    this.tauler.scaleX = 3;
    this.tauler.scaleY = 3;

    this.children.add(new Card(this, 400, 500));
    this.children.add(new Enemy(this, 600, 200));

    zone = this.add.zone(200, 200, 300, 300).setRectangleDropZone(300, 300);
  }

  update () {
    graphics.clear();
    graphics.strokeRectShape(rect);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

  }
}

export class Enemy extends Phaser.GameObjects.Sprite{
  constructor (scene, x, y) {
    super(scene, x, y, 'enemic');
    this.health = 20;
    this.damage = 5;
  }

}

export class Card extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'carta');
    this.setInteractive();
    scene.input.setDraggable(this);

    this.on('pointerover', function (event) {

      this.y -= 20
      this.scaleX = 2
      this.scaleY = 2

    });

    this.on('pointerout', function (event) {

      this.y += 20
      this.scaleX = 1
      this.scaleY = 1

    });

    scene.input.on('dragstart', (pointer, gameObject) => {

      scene.children.bringToTop(gameObject);

    }, this);

    scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    scene.input.on('dragenter', function (pointer, gameObject, dropZone) {
      console.log("hello");
    });

    scene.input.on('dragleave', function (pointer, gameObject, dropZone) {
      console.log("bye");
    });

    scene.input.on('drop', function (pointer, gameObject, dropZone) {

      gameObject.input.enabled = false;

    });

    scene.input.on('dragend', function (pointer, gameObject, dropped) {
      if (!dropped)
      {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
  }
}
