/// <reference path="/scripts/lib/hexi.js" />

var rowCnt = 20;
    colCnt = 30;
    boxH = 32;
    boxW = 32;

   
//An array that contains all the files you want to load
var thingsToLoad = [
  "../sprites/ghosts/ghost.png"
];

//Create a new Hexi instance, and start it
var g = hexi(colCnt * boxW, rowCnt * boxH, setup, thingsToLoad);

//Set the background color and scale the canvas
//g.backgroundColor = "black";
g.scaleToWindow();
g.fps = 60;

//Start Hexi
g.start();

var hero;

function setup() {
    //ghosts = g.frames("../sprites/ghosts/ghost.png", [[0, 0],[32, 0]], 32, 48);

    hero = initHero();

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

    g.state = play;
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

   hero.width = 50;
   hero.height = 50;
   hero.fps = 10;
   hero.dir = "up";
   hero.playAnimation(hero.dirFrames[hero.dir]);

   return hero;
}

function play() {
    hero.checkDir();
   
    g.move(hero);
    hero.prevX = hero.x;
    hero.prevY = hero.y;
}