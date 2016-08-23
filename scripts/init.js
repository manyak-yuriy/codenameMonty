
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
 "wfggggggff" + "ffgggggggg" + "fffffffffw" +
 "wwwwwwwwww" + "wwwwwwwwww" + "wwwwwwwwww";


    //  b - box   r - water
var 
    map_obj =
 "oooooooooo" + "oooooooooo" + "oooooooooo" + 
 "oooooooooo" + "oobboooobo" + "oooooooooo" + 
 "ooobbboooo" + "oooooooooo" + "oooooooooo" + 
 "oooboooboo" + "oobbobbbbo" + "oooooooooo" + 
 "oooooooooo" + "oooboboooo" + "oobbbbbbbo" + 
 
 "oobboooobo" + "oooboboooo" + "oooooooooo" + 
 "oooooboboo" + "oooboooooo" + "oooooooooo" + 
 "oooooboboo" + "bbbboooooo" + "oooooooooo" + 
 "oooboboooo" + "oooooooobo" + "oooooooooo" + 
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
  "../sprites/heroes/butterfly.png",
  "../sprites/weaponry/fire_particles.png"
];

// ---


// Create a new Hexi instance, and start it
var 
    g = hexi(1200, 500, setup, thingsToLoad);

//Set the background color and scale the canvas
    g.backgroundColor = "black";
    g.scaleToWindow();
    g.fps = 25;

//Start Hexi
    g.start();




// Initialize tink lib for keyboard event handling
var 
    t = new Tink(PIXI, g.renderer.view);

var   
    left = t.keyboard(37),
    up = t.keyboard(38),
    right = t.keyboard(39),
    down = t.keyboard(40);

    space = t.keyboard(32);
// ---

    var paused = false;

    space.press =
    function () {
        if (!paused) {
            g.pause();
            paused = true;
        }
        else
        {
            g.resume();
            paused = false;
        }

    }


//pointer = t.makePointer();



// Init the Grid

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

// ---