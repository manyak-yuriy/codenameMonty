
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

    //camera = gu.worldCamera(terrain, g.renderer.view.width, g.renderer.view.width.height, g.renderer.view);
    camera = gu.worldCamera(terrain, terrain.width, terrain.height, g.renderer.view);
    
    addExplosion(boxW * 10, boxH * 5);
    addExplosion(boxW * 10, boxH * 6);
    addExplosion(boxW * 11, boxH * 5);
    addExplosion(boxW * 11, boxH * 6);

    g.state = play;
}