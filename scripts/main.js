var rowCnt = 20;
    colCnt = 20;
    boxH = 32;
    boxW = 32;


//An array that contains all the files you want to load
var thingsToLoad = [
  "../sprites/ghosts/ghost.png"
];

//Create a new Hexi instance, and start it
var g = hexi(rowCnt * boxH, colCnt * boxW, setup, thingsToLoad);

//Set the background color and scale the canvas
g.backgroundColor = "black";
g.scaleToWindow();


//Start Hexi
g.start();


function setup() {
   ghost = g.sprite("../sprites/ghosts/ghost.png");
   ghost.x = 32;
}