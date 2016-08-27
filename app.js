$(document).ready(function() {
  Crafty.init(1280,720);
  var centerX = 640;
  var centerY = 300;
  var count = 100;
  var selected;
  var pingCount = 0;
  var maxPings = 1;
  var morale =100;
  var health = 100;
  var initPings = function(num) {
    pingCount = num;
    for(var i=0;i<num;i++){
      Crafty.e('Delay').delay(function(){
        Crafty.e('Ping');
      },Crafty.math.randomInt(0,4000),0)

    }
  }
  Crafty.scene("main", function(){
    Crafty.background("BLACK")

    var screen = Crafty.e("2D, DOM, Text")
    .attr({ w:1280, h:720, x:0, y:0 })
    .bind('EnterFrame', function(){

    })
    var radarLine = Crafty.e("DiagonalLine").attr({x:centerX,y:centerY})

    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:300,})
    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:150,alpha:0.3})
    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:200,alpha:0.3})
    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:250,alpha:0.3})
    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:100,alpha:0.3})

    var kill = Crafty.e('KillButton');
    var player = Crafty.e('Player')
    initPings(1);
})
var score = Crafty.e("2D, DOM, Text")
  .attr({x: Crafty.viewport.width - 300, y: Crafty.viewport.height - 50, w: 200, h:50, score:0})
  .text("Score: "+this.score)
  .css({color: "#fff"})
  .bind('EnterFrame',function(){
    this.text('Score: '+this.score)
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
Crafty.c("Player", {
  init: function(){
    this.requires('2D, Canvas,  DOM,Color, Collision, Solid')
    this.x = centerX;
    this.y = centerY;
    this.w = 45;
    this.h = 45;
    this.checkHits('Solid')
  },

  events: {
    "HitOn":function(hitData){
      for(var i=0;i<hitData.length;i++){
        console.log(hitData[i].obj.iff)
        hitData[i].obj.destroy();
        pingCount--;
        if (!pingCount) {
          maxPings++;
          initPings(maxPings);
        }
      }
    }
  }
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
  }

})

Crafty.c("KillButton",{

  init: function(){
    this.requires("2D, DOM, Mouse, Color, Text");
    this.w = 200;
    this.h = 40;
    this.alpha = 1.0;
    this.x = centerX-this.w/2;
    this.y = 650;
    this.color('#00e600');
    this.text("Kill");
    this.textFont({
      size: '32px',
      color: 'black'
    });
    this.css({'text-align':'center', 'padding-top':'10px','cursor':'pointer'})
  },
  events: {
    "EnterFrame": function(){

    },
    "MouseDown": function(e){
      if(selected){
        if(selected.iff){
          morale -= 5;
          selected.destroy();
        }
        else{
          score.score +=5;
          selected.destroy();
        }
      }
    }
  }
})


Crafty.c("Ping",{
    init: function(){
      this.requires("2D, DOM, Mouse, Color,Tween, Collision, Solid");
      this.w = 15;
      this.h = 15;

      this.alpha = 0.0;
      var angle = Crafty.math.randomInt(-Math.PI,Math.PI)
      this.origin('center');
      this.x = centerX+(280*Math.sin(angle));
      this.y = centerY+(280*Math.cos(angle));
      this.rx = this.x;
      this.ry = this.y;
      this.alphaTween;
      this.color('#00e600');
      this.moveToCentre();
      this.iff = Crafty.math.randomInt(0,1);
      this.onHit("DiagonalLine", function(){

          this.x = this.rx;
          this.y = this.ry;

          if(this != selected){
            this.alpha = 1.0;
            this.alphaTween = {alpha: 0.0};
          this.tween(this.alphaTween, 1000);
        }
      })
    },

    moveToCentre: function(){
      this.tween({rx:centerX,ry:centerY},100000,-1)
    },
    events:{
      "EnterFrame": function(){
        if(this == selected){
          this.x=this.rx;
          this.y=this.ry;
        }

      },
      "MouseDown": function(e){
        if(selected && selected != this){
          selected.tween(selected.alphaTween,1000);
        }
        selected = this;
        this.cancelTween(this.alphaTween);
        this.alpha = 0.7;


      }
    }

})
Crafty.scene('main')
})
