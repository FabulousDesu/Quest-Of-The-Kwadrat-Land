export class Carta extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y){
    super(scene, x, y, 'carta');

    //Dibuixar la Peca sobre la Carta
    this.setDepth(0)
    this.val = [[0,1,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,1,0]]; // = random figure with val valors
    this.type = 0;
    this.fitxa = [];

    for(var i = -2; i < 2; i++){
      for(var j = -2; j < 2; j++){
        if(this.val[j+2][i+2] == 1){
          this.fitxa.push(scene.add.sprite(x+16*i,y+16*j,'fitxa', 3));
          this.fitxa[this.fitxa.length-1].setScale(0.5);
          this.fitxa[this.fitxa.length-1].setDepth(1);
        }
      }
    }

    //Fer que sigui setDraggable
    this.setInteractive();
    scene.input.setDraggable(this);

    this.lastPos = [this.x, this.y];

    var that = this;
    this.on('dragstart', function (pointer) {
      that.setTint(0xff0000);
    });

    this.on('drag', function (pointer, dragX, dragY) {
      that.lastPos[0] = that.x;
      that.lastPos[1] = that.y;
      that.x = dragX;
      that.y = dragY;

      that.fitxa.forEach(function(element) {
        element.x -= that.lastPos[0] - that.x;
        element.y -= that.lastPos[1] - that.y;
      })
      
    });

    this.on('dragend', function (pointer) {
      that.clearTint();
    });
  }
}
