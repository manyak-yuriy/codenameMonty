var 
    rowCnt = 10;
    colCnt = 30;
    boxH = 50;
    boxW = 50;



var 
    hero, anim;
var 
    particles;
var 
    terrain;
var 
    camera;


var 
    borders = [];
var 
    particles = [];
var 
    boxes = [];




    // w - wall     g - grass     s - stone    f - floor      c - concrete wall
var 
     map =
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
var 
    map_obj =
 "oooooooooo" + "oooooooooo" + "oooooooooo" + 
 "ooobbboooo" + "oobboooobo" + "oooooooooo" + 
 "oooboooooo" + "oooooooooo" + "oooooooooo" + 
 "oooboooboo" + "oobbobbbbo" + "oobbbbbboo" + 
 "oooooooooo" + "oooboboooo" + "oobbbbbbbo" + 
 
 "oooooooooo" + "oooboboooo" + "oooooooooo" + 
 "oooooooooo" + "oooboooooo" + "obbbbbbbbo" + 
 "oooooooooo" + "bbbboooooo" + "bbbbbbbbbo" + 
 "oooooooooo" + "ooooooobbo" + "bbbbbbbbbo" + 
 "oooooooooo" + "oooooooooo" + "oooooooooo";

  
//An array that contains all the files you want to load
var 
    thingsToLoad = 
[
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
  "../sprites/bubble-death.png",
  "../sprites/heroes/butterfly.png"
];



//Create a new Hexi instance, and start it
var 
    g = hexi(1400, 500, setup, thingsToLoad);

//Set the background color and scale the canvas
    g.backgroundColor = "black";
    g.scaleToWindow();
    g.fps = 35;

//Start Hexi
    g.start();




// initialize tink lib for keyboard event handling
var 
    t = new Tink(PIXI, g.renderer.view);

var   
    left = t.keyboard(37),
    up = t.keyboard(38),
    right = t.keyboard(39),
    down = t.keyboard(40);
// ---





function setup() {
    //ghosts = g.frames("../sprites/ghosts/ghost.png", [[0, 0],[32, 0]], 32, 48);

    terrain = initTerrain();
    obj = addObjects(terrain);
    hero = initHero();
    terrain.addChild(hero);

    butterfly = initButterfly();
    terrain.addChild(butterfly);
    /*
    var r = g.randomInt(10, 100);
    var waypoints = 
       [
         [100 + r, 100 - r],
         [500 + r, -10],
         [1200 - 2 * r, 200 - 3 * r],
         [1300 - 3 * r, 505 + 2 * r],
         [500 - r, 90 + r],
         [240 - r, 300 + r],
         [150 + 4 * r, 420 - r],
         [100 + r, 100 - r]
       ];
 
       g.walkPath(
             butterfly,       //The sprite
             waypoints,       //The array of waypoints
             1000,             //Total duration, in frames
             "smoothstep",    //Easing type
             true,            //Should the path loop?
             false,            //Should the path reverse?
             200            //Delay in milliseconds between segments
        ); */

    camera = g.worldCamera(terrain, g.renderer.view.width, g.renderer.view.width.height, g.renderer.view);

    g.state = play;
}

var 
    borGrid = [];

clearGrid(borGrid);

function clearGrid(grid)
{
    //grid = [];
    for (i = -1; i <= rowCnt+1; i++)
    {
        grid[i] = [];
        for (j = -1; j <= colCnt+1; j++)
            grid[i][j] = [];
    }
}

