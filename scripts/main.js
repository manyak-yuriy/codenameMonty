/// <reference path="/lib/hexi.js" />



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
                       box.role = "border";
                       //box = g.sprite("../sprites/walls/red_brick.jpg");
                       borders.push(box);
                       break;
                   }
               case 'w':
                   {
                       box = g.sprite("../sprites/walls/dark_bricks.jpg");
                       box.role = "border";
                       //box = g.sprite("../sprites/walls/red_brick.jpg");
                       borders.push(box);
                       break;
                   }
                case 'g':
                    {
                        box = g.sprite("../sprites/grass/grass.jpg");
                        box.role = "back";
                        break;
                    }
                case 's':
                    {
                        box = g.sprite("../sprites/grass/stoneFloor.jpg");
                        box.role = "back";
                        break;
                    }
                case 'r':
                    {
                        box = g.sprite("../sprites/water/surface.png");
                        box.role = "back";
                        break;
                    }
                case 'f':
                    {
                        box = g.sprite("../sprites/floor/floor.jpg");
                        box.role = "back";
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

                        box.role = "border";

                        box.width = boxW;
                        box.height = boxH;
   
                        box.x = boxW * j;
                        box.y = boxH * i;

                        box.vx = 0;
                        box.vy = 0;

                        box.ax = 0;
                        box.ay = 0;

                        box.ax_dir = 0;
                        box.ay_dir = 0;

                        //box.setPivot(0.5, 0.5);
                        //box.rotation += (Math.PI) * g.randomInt(0, 10);

                        terrain.addChild(box);

                        break;
                    }

           }
        }
}



function addParticles()
{
    /*var allStates = g.filmstrip("../sprites/bubble-death.png", 192, 192);
    var anim = g.sprite(allStates);
    
    terrain.addChild(anim);*/

    starContainer = new PIXI.ParticleContainer(
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
      5, 15,                            //Min/max size
      1, 3,                              //Min/max speed
      0, 1,                       //Min/max scale speed
      0, 0,                       //Min/max alpha speed
      0, 0                          //Min/max rotation speed
    )); 

    particles.forEach(p => {p.fps = 3;});
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

   hero.fps = 15;

   hero.dir = "down";
   hero.playAnimation(hero.dirFrames[hero.dir]);

   return hero;
}