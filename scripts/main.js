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
    particles.forEach(p => {g.wait(2000, ()=>{p.parent = g.stage; g.remove(p); });});
    
}



function initAnimDust()
{
    var allDust = g.filmstrip("../sprites/bubble.png", 192, 192);
    allDust.reverse;
    var anim = g.sprite(allDust);
    
    terrain.addChild(anim);
    anim.x = mark.x;
    anim.y = mark.y;
    anim.fps = 10;

    anim.width = boxW;
    anim.height = boxH;

    anim.playAnimation();
    anim.loop = false;
    
    //anim.visible = false;
    
    return anim;
}



function initButterfly()
{
   var frames = g.filmstrip("../sprites/heroes/butterfly.png", 70, 65);
   var hero = g.sprite(frames);
   hero.circular = true;

   hero.width = boxW * 0.9;
   hero.height = boxH * 0.9;

   hero.x = boxW * 20;
   hero.y = boxH * 3;

   hero.fps = 15;

   //hero.dir = "down";
   hero.playAnimation();

   return hero;
}



function initHero()
{
   var ghosts = g.filmstrip("../sprites/heroes/ghost.png", 32, 48);
   var hero = g.sprite(ghosts);

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

           if (this.x > this.prevX)
               dir = "right";
           else if (this.x < this.prevX)
               dir = "left";
       
       
           if (this.y > this.prevY)
               dir = "down";
           else if (this.y < this.prevY)
               dir = "up";

           if (this.x == this.prevX && this.y == this.prevY)
               dir = "stay";
       
       if (dir == "stay")
       {
           this.stopAnimation();
       }
       else

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

   terrain.addChild(hero);


   hero.dir = "stay";
   hero.playAnimation(hero.dirFrames[hero.dir]);

   return hero;
}


function initEnemy(i, j)
{
   var frames = g.filmstrip("../sprites/heroes/lizard.png", 80, 56);
   var enemy = g.sprite(frames);

   enemy.circular = true;

   enemy.dirFrames = 
   {
        "down": [24, 29],
        "left": [12, 17],
        "right": [0, 5],
        "up": [36, 41]
   }

   enemy.checkDir = function () {
       var dir = this.dir;

           if (this.x > this.prevX)
               dir = "right";
           else if (this.x < this.prevX)
               dir = "left";
       
       
           if (this.y > this.prevY)
               dir = "down";
           else if (this.y < this.prevY)
               dir = "up";

           if (this.x == this.prevX && this.y == this.prevY)
               dir = "stay";
       
       if (dir == "stay")
       {
           this.stopAnimation();
           
       }
       else
       if (dir != this.dir) {
           this.dir = dir;
           this.stopAnimation();
           this.playAnimation(this.dirFrames[enemy.dir]);
       }
   } 
   
   enemy.width = boxW - 5;
   enemy.height = boxH - 5;

   enemy.x = boxW * j;
   enemy.y = boxH * i;

   enemy.vx = boxW / 10;

   enemy.fps = 10;

   terrain.addChild(enemy);


   enemy.dir = "stay";
   enemy.playAnimation(enemy.dirFrames[enemy.dir]);

   return enemy;
}



function addExplosion(x, y)
{
    var f = g.filmstrip("../sprites/weaponry/fire_particles.png", 100, 100);
    var frames = [f[1], f[2], f[3], f[4], f[5], f[6], f[15], f[32]];

    expContainer = new PIXI.ParticleContainer(
      15000,
      {alpha: true, scale: true, rotation: true, uvs: true}
    );

    terrain.addChild(expContainer);

    fire = g.particleEmitter(
      250,                                   //The interval
      () => 
      { 
              g.createParticles(                 //The function
                  x,                       //x position
                  y,    //y position
                  () => g.sprite(frames),        //Particle sprite
                  expContainer,                           //The container to add the particles to               
                  100,                                 //Number of particles
                  0,                                 //Gravity
                  true,                              //Random spacing
                  0, 6.28,                          //Min/max angle
                  2, 3,                            //Min/max size
                  0.1, 1.8,                              //Min/max speed
                  0, 1,                       //Min/max scale speed
                  0.01, 0.3,                       //Min/max alpha speed
                  0.1, 0.5                          //Min/max rotation speed
       ); 
      }
    );

    fire.play();

    particles.forEach(p => {p.fps = 3;});
    //g.wait(5000, ()=>{particles.forEach(p => {g.remove(p); p = undefined;})});
}





function listen_kbd(hero)
{
    hero.prevX = hero.x;
    hero.prevY = hero.y;
    if (left.isDown)
    {
        //hero.vx = -10;
        hero.x += -10;
        //hero.vy = 0;
    }
       
    if (right.isDown)
    {
        //hero.vx = 10;
        hero.x += 10;
        //hero.vy = 0;
    }
       
    if (up.isDown)
    {
        //hero.vy = -10;
        hero.y += -10;
        //hero.vx = 0;
    }
       
    if (down.isDown)
    {
        //hero.vy = 10; 
        hero.y += 10;
        //hero.vx = 0;
    }

    hero.checkDir();
       
}