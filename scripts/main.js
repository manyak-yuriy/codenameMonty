/// <reference path="/lib/hexi.js" />

var rowCnt = 15;
    colCnt = 30;
    boxH = 50;
    boxW = 50;

    // w - wall     g - grass     s - stone     r - water   f - floor

    var map =
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wggggggggg" + "gggggggggg" + "gggggggggw" +
 "wggggggggg" + "ggffffgggg" + "gggggggggw" +
 "wwwwwwwwww" + "wwffffwwww" + "wwwwwwwwww" +
 "wwwwwwwwww" + "wwffffwwww" + "wwwwwwwwww" +

 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +

 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww";


  
//An array that contains all the files you want to load
var thingsToLoad = [
  "../sprites/ghosts/ghost.png",
  "../sprites/bubble.png",
  "../sprites/walls/dark_bricks.jpg",
  "../sprites/walls/box.png",
  "../sprites/grass/stoneFloor.jpg",
  "../sprites/grass/grass.jpg",
  "../sprites/water/surface.png",
  "../sprites/floor/floor.png"
];

//Create a new Hexi instance, and start it
var g = hexi(colCnt * boxW, rowCnt * boxH, setup, thingsToLoad);

//Set the background color and scale the canvas
//g.backgroundColor = "black";
//g.scaleToWindow();
g.fps = 60;

//Start Hexi
g.start();

var hero, anim;
var particles;
var terrain;

function initTerrain() {
    var terrain = g.group();
    var box;

    for (var i = 0; i < rowCnt; i++)
       for (var j = 0; j < colCnt; j++)
       {
           switch (map.charAt(i * colCnt + j))
           {
               case 'w':
                    {
                        box = g.sprite("../sprites/walls/stone1.jpg");
                        break;
                    }
                case 'g':
                    {
                        box = g.sprite("../sprites/grass/grass.jpg");
                        break;
                    }
                case 's':
                    {
                        box = g.sprite("../sprites/grass/stoneFloor.jpg");
                        break;
                    }
                case 'r':
                    {
                        box = g.sprite("../sprites/water/surface.png");
                        break;
                    }
                case 'f':
                    {
                        box = g.sprite("../sprites/floor/floor.jpg");
                        break;
                    }
           }
           box.width = boxW;
           box.height = boxH;
           box.x = boxW * j;
           box.y = boxH * i;
           terrain.addChild(box);
       }

    return terrain;
}

function setup() {
    //ghosts = g.frames("../sprites/ghosts/ghost.png", [[0, 0],[32, 0]], 32, 48);

    terrain = initTerrain();

    hero = initHero();
    

    
    /*
    var allDust = g.filmstrip("../sprites/bubble.png", 192, 192);
    allDust = [allDust[14], allDust[15]];

    particles = g.createParticles(                 //The function
      100,                       //x position
      100,    //y position
      () => g.sprite(allDust),        //Particle sprite
      g.stage,                           //The container to add the particles to               
      900,                                 //Number of particles
      0,                                 //Gravity
      true,                              //Random spacing
      0, 6.28,                          //Min/max angle
      12, 18,                            //Min/max size
      1, 2,                              //Min/max speed
      0, 0,                       //Min/max scale speed
      0, 0,                       //Min/max alpha speed
      0.05, 0.1                          //Min/max rotation speed
    ); */


    //alert(particles);

    var waypoints = 
       [
         [100, 100],
         [10, 10],
         [200, 5],
         [500, 70],
         [40, 300],
         [50, 20]
       ];
 
       g.walkPath(
             hero,       //The sprite
             waypoints,       //The array of waypoints
             1000,             //Total duration, in frames
             "smoothstep",    //Easing type
             false,            //Should the path loop?
             false,            //Should the path reverse?
             200            //Delay in milliseconds between segments
        );

    var anim = initAnimDust();

    g.state = play;
}

function initAnimDust()
{
    var allDust = g.filmstrip("../sprites/bubble.png", 192, 192);
    var anim = g.sprite(allDust);
    
    anim.x = 100;
    anim.y = 100;
    anim.fps = 20;

    anim.width = 200;
    anim.height = 200;

    anim.playAnimation();
    //anim.visible = false;
    
    return anim;
}

function initHero()
{
   ghosts = g.filmstrip("../sprites/ghosts/ghost.png", 32, 48);
   hero = g.sprite(ghosts);

   hero.dirFrames = 
   {
        "down": [0, 2],
        "left": [3, 5],
        "right": [6, 8],
        "up": [9, 11]
   }

   hero.checkDir = function () {
       var dir;
       if (Math.abs(this.x) > Math.abs(this.y)) {
           if (this.x > this.prevX)
               dir = "right";
           else
               dir = "left";
       }
       else {
           if (this.y > this.prevY)
               dir = "down";
           else
               dir = "up";
       }

       if (this.x == this.prevX && this.y == this.prevY)
           dir = "down";

       if (dir != hero.dir) {
           hero.dir = dir;
           hero.stopAnimation();
           hero.playAnimation(hero.dirFrames[dir]);
       }

   } 

   hero.width = boxW;
   hero.height = boxH;
   hero.fps = 10;
   hero.dir = "up";
   hero.playAnimation(hero.dirFrames[hero.dir]);

   return hero;
}

function play() {
    hero.checkDir();

    //particles.forEach(p => {g.contain(p, {x: 0, y: 0, width: g.canvas.width, height: g.canvas.height}, true);});
    //particles.forEach(p => {g.contain(p, {x: 0, y: 0, width: 60, height: 500}, true);});

    g.move(hero);
    hero.prevX = hero.x;
    hero.prevY = hero.y;
}