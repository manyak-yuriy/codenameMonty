/// <reference path="/lib/hexi.js" />

var rowCnt = 10;
    colCnt = 30;
    boxH = 50;
    boxW = 50;

    // w - wall     g - grass     s - stone    f - floor      c - concrete wall

    var map =
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww" +
 "wfffffffff" + "ffffffffff" + "ffffffffff" +
 "wfffffffff" + "fffffffffc" + "fffffffffw" +
 "ffffffffff" + "fffffffffc" + "fffffffffw" +
 "wfffffffff" + "fffffffffc" + "fffffffffw" +

 "wfffffffff" + "ffgggffffc" + "fffffffffw" +
 "wfffffffff" + "ffggggfgfc" + "fffffffffw" +
 "wfggggggff" + "ffgffffgfc" + "fffffffffw" +
 "wfggggggff" + "ffggggggfc" + "fffffffffw" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww";

    //  b - box   r - water

    var map_obj =
 "oooooooooo" + "oooooooooo" + "oooooooooo" + 
 "ooobbboooo" + "oooooooooo" + "oooooooooo" + 
 "oooboooooo" + "oooooooooo" + "oooooooooo" + 
 "oooboooboo" + "oooooooooo" + "oooooooooo" + 
 "oooooooooo" + "oooooooooo" + "oooooooooo" + 

 "oooooooooo" + "oooooooooo" + "oooooooooo" + 
 "oooooooooo" + "oooooooooo" + "oooooooooo" + 
 "oooooooooo" + "oooooooooo" + "oooooooooo" + 
 "oooooooooo" + "oooooooooo" + "oooooooooo" + 
 "oooooooooo" + "oooooooooo" + "oooooooooo";

  
//An array that contains all the files you want to load
var thingsToLoad = [
  "../sprites/heroes/ghost.png",
  "../sprites/bubble.png",
  "../sprites/walls/dark_bricks.jpg",
  "../sprites/walls/box.png",
  "../sprites/grass/stoneFloor.jpg",
  "../sprites/grass/grass.jpg",
  "../sprites/water/surface.png",
  "../sprites/floor/floor.jpg",
  "../sprites/walls/red_brick.jpg",
  "../sprites/snowflake.png",
  "../sprites/col-bubble.png",
  "../sprites/bubble-death.png"
];

//Create a new Hexi instance, and start it
var g = hexi(1400, 500, setup, thingsToLoad);

//Set the background color and scale the canvas
g.backgroundColor = "black";
g.scaleToWindow();
g.fps = 10;


//Start Hexi
g.start();

var hero, anim;
var particles;
var terrain;
var camera;

var borders = [];
var particles = [];
var boxes = [];

function initTerrain() {
    var terrain = g.group();
    g.stage.addChild(terrain);
    terrain.x = 0;
    terrain.y = 0;
    
    g.move(terrain);
    var box;

    for (var i = 0; i < rowCnt; i++)
       for (var j = 0; j < colCnt; j++)
       {
           switch (map.charAt(i * colCnt + j))
           {
               case 'c':
                   {
                       box = g.sprite("../sprites/walls/stone1.jpg");
                       //box = g.sprite("../sprites/walls/red_brick.jpg");
                       borders.push(box);
                       break;
                   }
               case 'w':
                   {
                       box = g.sprite("../sprites/walls/dark_bricks.jpg");
                       //box = g.sprite("../sprites/walls/red_brick.jpg");
                       borders.push(box);
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

           //box.vx = 0;
           //box.vy = 0;

           //box.ax = 0;
           //box.ay = 0;

           //box.ax_dir = 0;

           terrain.addChild(box);
       }

    mark = g.sprite("../sprites/walls/red_brick.jpg");
    terrain.addChild(mark);

    mark.width = boxW;
    mark.height = boxH;

    mark.x = 300;
    mark.y = 300;
    
    mark.visible = false;
    g.move(mark);
    
    return terrain;
}

function addObjects(terrain)
{
    var box;
    for (var i = 0; i < rowCnt; i++)
       for (var j = 0; j < colCnt; j++)
       {
           switch (map_obj.charAt(i * colCnt + j))
           {
                    case 'b':
                    {
                        box = g.sprite("../sprites/walls/box.png");
                        borders.push(box);
                        boxes.push(box);
                        //box.circular = true;



                        box.width = boxW;
                        box.height = boxH;
   
                        box.x = boxW * j;
                        box.y = boxH * i;

                        box.vx = 0;
                        box.vy = 0;

                        box.ax = 0;
                        box.ay = 0;

                        box.ax_dir = 0;

                        terrain.addChild(box);


                        break;
                    }

           }
        }
}

function setup() {
    //ghosts = g.frames("../sprites/ghosts/ghost.png", [[0, 0],[32, 0]], 32, 48);

    terrain = initTerrain();
    obj = addObjects(terrain);

    hero = initHero();
    terrain.addChild(hero);

    camera = g.worldCamera(terrain, g.renderer.view.width, g.renderer.view.width.height, g.renderer.view);
    
    //camera = g.worldCamera(g.stage, g.stage.width, g.stage.height, g.renderer.view);
    var customKey = g.keyboard(32);
    customKey.press = () => {
        alert("lol");
    };
    
    g.state = play;
}

function addParticles()
{
    /*var allStates = g.filmstrip("../sprites/bubble-death.png", 192, 192);
    var anim = g.sprite(allStates);
    
    terrain.addChild(anim);*/

    var starContainer = new PIXI.ParticleContainer(
      15000,
      {alpha: true, scale: true, rotation: true, uvs: true}
    );
    terrain.addChild(starContainer);

      particles = particles.concat(g.createParticles(                 //The function
      300,                       //x position
      300,    //y position
      () => g.sprite("../sprites/col-bubble.png"),        //Particle sprite
      starContainer,                           //The container to add the particles to               
      10,                                 //Number of particles
      0,                                 //Gravity
      true,                              //Random spacing
      0, 6.28,                          //Min/max angle
      10, 25,                            //Min/max size
      1, 2,                              //Min/max speed
      0, 0,                       //Min/max scale speed
      0, 0,                       //Min/max alpha speed
      0, 0                          //Min/max rotation speed
    )); 

    particles.forEach(p => {p.fps = 5;});
    //g.wait(5000, ()=>{particles.forEach(p => {g.remove(p); p = undefined;})});
}

function initAnimDust()
{
    var allDust = g.filmstrip("../sprites/bubble.png", 192, 192);
    allDust.reverse;
    var anim = g.sprite(allDust);
    
    terrain.addChild(anim);
    anim.x = 230;
    anim.y = 230;
    anim.fps = 10;

    anim.width = 200;
    anim.height = 200;

    anim.playAnimation();
    
    //anim.visible = false;
    
    return anim;
}

function initHero()
{
   ghosts = g.filmstrip("../sprites/heroes/ghost.png", 32, 48);
   hero = g.sprite(ghosts);
   hero.circular = true;

   hero.dirFrames = 
   {
        "down": [0, 2],
        "left": [3, 5],
        "right": [6, 8],
        "up": [9, 11]
   }

   hero.checkDir = function () {
       var dir = this.dir;

       if (Math.abs(this.vx) > Math.abs(this.vy)) {
           if (this.x > this.prevX)
               dir = "right";
           else if (this.x < this.prevX)
               dir = "left";
       }
       else {
           if (this.y > this.prevY)
               dir = "down";
           else if (this.y < this.prevY)
               dir = "up";
       }

       //console.log(dir);

       // set default direction to down
       /*if (this.x == this.prevX && this.y == this.prevY)
           dir = "down";*/

       if (dir != this.dir) {
           this.dir = dir;
           this.stopAnimation();
           this.playAnimation(this.dirFrames[hero.dir]);
       }
   } 
   
   hero.width = boxW;
   hero.height = boxH;

   hero.x = boxW * 0;
   hero.y = boxH * 3;

   hero.velocity = 10;

   hero.fps = 15;

   hero.dir = "down";
   hero.playAnimation(hero.dirFrames[hero.dir]);

   return hero;
}

var num = 0;


var t = new Tink(PIXI, g.renderer.view);


var   left = t.keyboard(37),
      up = t.keyboard(38),
      right = t.keyboard(39),
      down = t.keyboard(40);

pointer = t.makePointer();

pointer.press = () => console.log("The pointer was pressed");
pointer.release = () => console.log("The pointer was released");
pointer.tap = () => console.log("The pointer was tapped");

function play() {
    //camera.centerOver(mark);
    num++;
    camera.centerOver(hero);

    // check if particle bumps upon border
    particles.forEach(p => 
    {
        g.hit(p, borders, true, true, true);
    }); 
    
    g.arrowControl(hero, hero.velocity);

    // try moving boxes
    g.hit(hero, boxes, true, false, false, 
       (side, box) => 
       {
           if (right.isDown) 
           {
               terrain.removeChild(box);
               terrain.addChild(box);
               box.vx = 3;
               box.ax = 0.2;
               box.ax_dir = -1;
           }
               
       });

    // check if box is not bumping upon border
    boxes.forEach(b => 
    {
        b.x += b.vx;
        b.vx += b.ax * b.ax_dir;
        if (b.vx * b.ax_dir > 0)
           b.ax = 0;

        console.log("v="+b.vx + " a="+b.ax);

        borders.forEach(bb => 
        {
            if (b != bb)
               g.hit(b, bb, true, false, true, () => {})
        });
    }); 

    // check if hero is not bumping upon border
    g.hit(hero, borders, true, false, false);

    // check if hero is stumbling upon the mark
    g.hit(hero, mark, true, true, false, 
       () => 
       {
           addParticles(); 
           var anim = initAnimDust(); 
           mark.visible = false;
       })
    
    
    g.move(hero);

    hero.checkDir();

    //terrain.x -= 1;
    //g.move(terrain);
    
    hero.prevX = hero.x;
    hero.prevY = hero.y;
}


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

    /*
    var waypoints = 
       [
         [100, 100],
         [1200, 200],
         [1300, 505],
         [500, 90],
         [240, 300],
         [150, 420]
       ];
 
       g.walkPath(
             hero,       //The sprite
             waypoints,       //The array of waypoints
             1000,             //Total duration, in frames
             "smoothstep",    //Easing type
             false,            //Should the path loop?
             false,            //Should the path reverse?
             200            //Delay in milliseconds between segments
        ); */