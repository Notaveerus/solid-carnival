$(document).ready(function() {
  Crafty.init(1280,1024);
  var centerX = 640;
  var centerY = 320;
  var count = 100;
  var selected;
  var pingCount = 0;
  var maxPings = 1;
  var morale =100;
  var health;
  var score;
  var spawn = 0;
  var fishingBoats = [];
  Crafty.audio.add({
      blip: ['blip.wav'],
      explode:['explode.wav'],
      friendly:['friendly.wav'],
      backing:['backing track.wav']

  });
  //Crafty.audio.play('backing', -1, 0.3)
  var gameOver = function(){
    if(health.status<=0 || morale.status<=0){
      score.x = centerX-score.w/2;
      score.y = centerY-score.h/2;
      score.z = 100;
      maxPings = 1;
      pingCount = 0;
      selected = 0;
      score.textFont({size: '32px'})
      Crafty.e("Delay").delay(function(){
        Crafty.scene("main")
      },2000)
    }
  }

  var wheels = [];
  // var selectMessage = function(){
  //   var message;
  //   var msg
  //   if(!selected.iff){
  //     msg = messagesE[Crafty.math.randomInt(1,messagesE.len()-1)];
  //     message = encode(msg.msg);
  //   }
  //   else if(selected.iff){
  //     msg = messagesF[Crafty.math.randomInt(1,messagesE.len()-1)];
  //     message = encode(msg.msg);
  //   }
  //   var x = centerX-200;
  //   var y = centerY+450;
  //
  //   for(var i=0; i<message.length;i++){
  //
  //     wheels.push(Crafty.e('Wheel').attr({x: x, y:y,arr:message[i]}));
  //     x+=75;
  //   }
  // }


  var initPings = function(num) {

    pingCount = num;
    for(var j=0;j<fishingBoats.length;j++){
      fishingBoats[j].isVisible = true;
    }
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

    for(var i=0;i<9;i++){
      var xPos = centerX+(Crafty.math.randomInt(135,215) * Math.cos(i*2*Math.PI/9));
      var yPos = centerY+(Crafty.math.randomInt(135,215) * Math.sin(i*2*Math.PI/9));
      var boat = Crafty.e('Passive').attr({x:xPos,y:yPos})
      fishingBoats.push(boat);
    }

    var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:300,})
      var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:150,alpha:0.3})
      var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:200,alpha:0.3})
      var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:250,alpha:0.3})
      var circle = Crafty.e('Circle').attr({x:centerX,y:centerY,w:100,alpha:0.3})

    var foe = Crafty.e('KillButton');
    var friend = Crafty.e('TrustButton')
    var player = Crafty.e('Player')
    health = Crafty.e('Status').attr({x:30,y:580})
    Crafty.e('2D, DOM, Text').attr({x:32,y:680,w:15,h:15}).text('H').textFont({size:'15px',type:'bold',family:'Courier' }).textColor('#00e600')
    morale = Crafty.e('Status').attr({x:80,y:580})
    Crafty.e('2D, DOM, Text').attr({x:82,y:680,w:15,h:15}).text('M').textFont({size:'15px',type:'bold',family:'Courier'}).textColor('#00e600')
    score = Crafty.e('Score');
    initPings(1);
})
Crafty.c('Status',{
  init: function(){
    this.requires('2D, DOM, Color, Text');
    this.w = 15;
    this.h = 100;
    this.maxHeight = 100;
    this.status=100;
    this.color("#00e600");

  },
  events: {
    "EnterFrame": function(){
    }
  }

})
// Crafty.c('Wheel', {
//   init: function(){
//     this.requires('2D, DOM, Color, Mouse, Text');
//     this.color('#00e600');
//     this.index = 0;
//     this.w = 35;
//     this.h = 135;
//     this.arr = [];
//     this.textFont({
//       size: '32px',
//       color: 'black'
//     })
//     this.css({'cursor':'pointer', 'padding-top':'75'})
//   },
//   spin: function(){
//     if(this.index>=this.arr.length-1){
//       this.index=0;
//     }
//     else{
//       this.index++;
//     }
//     this.text(this.arr[this.index].toUpperCase())
//   },
//   events: {
//     "MouseDown":function(e){
//       this.spin();
//     },
//     "EnterFrame": function(){
//       this.text(this.arr[this.index].toUpperCase());
//     }
//   }
// })
Crafty.c('Score',{
  init: function(){
    this.requires("2D, DOM, Text, Color");
    this.x = centerX*2-150;
    this.y = 30;
    this.w = 200;
    this.score = 0;
    this.scoreText = "Score: "+this.score;

    this.text(this.scoreText)
    this.textColor('#00e600')
    this.textFont({
      size: '24px',
      type: 'bold',
      family: 'Courier'
    });
  },
  events:{
    "EnterFrame": function(){
      this.scoreText = "Score: "+this.score;

      this.text(this.scoreText);
    }
  }
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
      this.tween({rotation: this.rotation+3},35)
    }
  }


});
// Crafty.c('InfoPanel',{
//   init: function(){
//     this.requires('2D, DOM,Color, Text');
//     this.x = centerX + 500;
//     this.y = centerY -100;
//     this.w = 200;
//     this.h = 500;
//     this.textFont({
//       size: '24px',
//       color: '#00e600'
//     });
//     this.text()
//   }
// })
Crafty.c('Passive', {
  init: function(){
    this.requires('2D, DOM, Color, Collision, Tween');
    this.w = 25;
    this.h = 25;
    this.color('#0000e6');
    this.alpha = 0.0;
    this.isVisible = true;
    this.onHit("DiagonalLine", function(){
      if(this.isVisible){

        this.alpha = 1.0;
        this.tween({alpha: 0.0}, 1000);
      }

    })
  }
})
Crafty.c("Player", {
  init: function(){
    this.requires('2D, Canvas,  DOM,Color, Collision, Solid')
    this.x = centerX-37;
    this.y = centerY-37;
    this.w = 75;
    this.h = 75;
    this.checkHits('Solid')
  },

  events: {
    "HitOn":function(hitData){
      for(var i=0;i<hitData.length;i++){
        if(!hitData[i].iff){
          health.status-=20;
          health.y+=20;
          health.h= health.maxHeight*(health.status/100)
          gameOver();
        }
        else{
          score.score+=5;
        }
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
Crafty.c('TrustButton',{
  init: function(){
    this.requires('2D,DOM,Mouse,Color,Text');
    this.w=200;
    this.h =40;
    this.x = centerX+25;
    this.y=650;
    this.alpha = 1.0;
    this.color('#00e600');
    this.text("Friend");
    this.textFont({
      size: '32px',
      color: 'black',
      family: 'Courier',
      type: 'bold'
    })
    this.css({'text-align':'center', 'padding-top':'10px','cursor':'pointer'})
  },
  events: {
    "MouseDown": function(e){
      if(selected){
        pingCount--;
        if (!pingCount) {
          maxPings++;
          initPings(maxPings);
        }
        if(!selected.iff){
          health.status-=20;
          health.y+=20;
          health.h= health.maxHeight*(health.status/100)
          selected.destroy();
          selected = 0;
          Crafty.audio.play('friendly')

          gameOver();
        }
        else if(selected.iff){
          score.score +=5;
          selected.destroy();
          selected = 0;
          Crafty.audio.play('explode')

        }
      }
    }
  }
})
Crafty.c("KillButton",{

  init: function(){
    this.requires("2D, DOM, Mouse, Color, Text");
    this.w = 200;
    this.h = 40;
    this.alpha = 1.0;
    this.x = centerX-this.w-25;
    this.y = 650;
    this.color('#00e600');
    this.text("Foe");
    this.textFont({
      size: '32px',
      color: 'black',
      type: 'bold',
      family: 'Courier'
    });
    this.css({'text-align':'center', 'padding-top':'10px','cursor':'pointer'})
  },
  events: {
    "EnterFrame": function(){

    },
    "MouseDown": function(e){
      if(selected){
        pingCount--;
        if (!pingCount) {
          maxPings++;
          initPings(maxPings);
        }
        if(selected.iff){
          morale.status-=20;
          morale.y+=20;
          morale.h= morale.maxHeight*(morale.status/100)
          selected.destroy();
          selected = 0;
          Crafty.audio.play('friendly')
          gameOver();
        }
        else if(!selected.iff){
          score.score +=5;
          selected.destroy();
          selected = 0;
          Crafty.audio.play('explode')

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
      this.angle = Math.random()*Math.PI*2;
      this.origin('center');
      this.x = centerX+(280 * Math.cos(spawn*2*Math.PI/9));
      this.y = centerY+(280 * Math.sin(spawn*2*Math.PI/9));
      spawn++
      if(spawn==10){
        spawn=0;
      }
      this.rx = this.x;
      this.ry = this.y;
      this.alphaTween;
      this.css({'cursor':'pointer'});
      this.color('#00e600');
      this.moveToCentre();
      this.iff = Crafty.math.randomInt(0,1);
      this.onHit("DiagonalLine", function(){

          this.x = this.rx;
          this.y = this.ry;
          Crafty.audio.play('blip', 1,0.5)
          if(this != selected){
            this.alpha = 1.0;
            this.alphaTween = {alpha: 0.0};
          this.tween(this.alphaTween, 1500);
        }
      })
    },

    moveToCentre: function(){
      this.tween({rx:centerX,ry:centerY},50000,-1)
    },
    events:{
      "EnterFrame": function(){
        if(this == selected){
          this.x=this.rx;
          this.y=this.ry;
        }
        if(!this.iff && !this.alpha){
          var randInt = Crafty.math.randomInt(0,100);

          if(!randInt){
            var dist = [];
            for (var i=0;i<fishingBoats.length;i++) {
              var boat = fishingBoats[i];
              var a = this.x-boat.x;
              var b = this.y-boat.y;
              var c = Math.sqrt(a*a+b*b);
              if (c < 100)
              dist.push({
                dist:c,
                obj: boat
              });
            }
            dist.sort(function(a,b){
              var keyA = a.dist;
              var keyB = b.dist;
              if(keyA<keyB) return -1;
              if(keyA>keyB) return 1;
              return 0;
            })

            if(dist[0]) dist[0].obj.isVisible = false;
          }
        }

      },
      "MouseDown": function(e){
        if(selected && selected != this){
          selected.tween(selected.alphaTween,1000);
        }
        selected = this;
        for( var i =0;i<wheels.length;i++){
          wheels[i].destroy();
        }

        this.cancelTween(this.alphaTween);
        this.alpha = 0.7;


      }
    }

})
Crafty.scene('main')
})
