import { Scene } from 'phaser';

var graphics;
var rect;
var hitBoxTauler;
var point;
var zone;

export default class FightScene extends Scene {
  constructor () {
    super({ key: 'FightScene' });

  }

  preload() {
  }

  create () {
    //Zones
    graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 }});
    rect = new Phaser.Geom.Rectangle(200, 500, 400, 100);
    point = new Phaser.Geom.Circle(200, 500, 10);

    //Tauler
    this.tauler = this.add.image(200, 200, 'tauler');
    this.tauler.scaleX = 3
    this.tauler.scaleY = 3
    hitBoxTauler = new Phaser.Geom.Rectangle(56, 56, 289, 289);
    zone = this.add.zone(200, 200).setRectangleDropZone(289, 289);


    //Cartes
    this.carta = this.add.sprite(400, 500, 'carta').setInteractive({ draggable: true });
    this.carta.originX = 100;   //BUSCAR AIXO
    this.carta.originY = 200;   //BUSCAR AIXO
    //this.input.setDraggable(this.carta);

   graphics.lineStyle(2, 0xffff00);

   this.input.on('dragstart', function (pointer, gameObject) {

       this.children.bringToTop(gameObject);

   }, this);

   this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

       gameObject.x = dragX;
       gameObject.y = dragY;

   });

   this.input.on('dragenter', function (pointer, gameObject, dropZone) {

   });

   this.input.on('dragleave', function (pointer, gameObject, dropZone) {

   });

   this.input.on('drop', function (pointer, gameObject, dropZone) {

       gameObject.input.enabled = false;

   });

   this.input.on('dragend', function (pointer, gameObject, dropped) {

       if (!dropped)
       {
           gameObject.x = gameObject.input.dragStartX;
           gameObject.y = gameObject.input.dragStartY;
       }
   });
  }

  update () {

    point.x = this.carta.x;
    point.y = this.carta.y;

    graphics.clear();
    graphics.strokeRectShape(rect);
    graphics.fillCircleShape(point);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

  }
}
