$(document).ready(function() {
  Crafty.init(1280,720);
  var centerX = 640;
  var centerY = 300;
  var count = 100;
  var selected;
  Crafty.scene("main", function(){
    Crafty.background("BLACK")

    var screen = Crafty.e("2D, DOM, Text")
    .attr({ w:1280, h:720, x:0, y:0 })
    var radarLine = Crafty.e("DiagonalLine").attr({x:centerX,y:centerY})

    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:300,})
    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:150,alpha:0.3})
    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:200,alpha:0.3})
    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:250,alpha:0.3})
    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:100,alpha:0.3})

    var ping = Crafty.e('Ping');

})

Crafty.c("DiagonalLine", {
  init: function(){
    this.requires('2D, DOM, Color, Collision, Tween');
    this.w = 2;
    this.h=300;
    this.color('#00E600');
    this.origin('top center');
  },
  events: {
    "EnterFrame": function(){
      var context = this;
      this.tween({rotation: this.rotation+3},20)
    }
  }


});
Crafty.c("Centre", {
  
})
Crafty.c("Circle", {
  init: function(){
    this.requires("2D, Canvas");
    this.bind("Draw", this.drawMe);
    this.ready = true;
  },
  drawMe: function(e){
    var ctx = e.ctx;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#00e600";
    ctx.beginPath();
    ctx.arc(centerX,centerY,this.w,0, Math.PI*2)
    ctx.stroke();
  },

})

Crafty.c("Kill Button",{
  required: "2D, "
})


Crafty.c("Ping",{
    init: function(){
      this.requires("2D, DOM, Mouse, Color,Tween, Collision");
      this.w = 15;
      this.h = 15;

      this.alpha = 0.0;
      var angle = Crafty.math.randomInt(-Math.PI,Math.PI)
      this.origin('center');
      this.x = centerX+(280*Math.sin(angle));
      this.y = centerY+(280*Math.cos(angle));
      this.rx = this.x;
      this.ry = this.y;
      this.color('#00e600');
      this.onHit("DiagonalLine", function(){
        this.x = this.rx;
        this.y = this.ry;
        this.alpha = 1.0;
        this.tween({alpha: 0.0}, 1000);
      })
    },

    moveToCentre: function(){
      var dist = Math.sqrt(centerX*this._x)+(centerY*this._y)
      this.tween({rx:centerX,ry:centerY},10000,-1)
    },
    events:{
      "EnterFrame": function(){
        this.moveToCentre();
      },
      "MouseDown": function(e){
        selected = this;
      }
    }

})
Crafty.scene('main')
})
