

function play() { 
    camera.centerOver(hero);

    // check if particle bumps upon border
    particles.forEach(p => 
    {
        g.hit(p, borders, true, true, true, 
          () => 
          {   if (p)
              {
                  g.remove(p);
              }
               
          });

    }); 
    // ---
    

    // try moving boxes
    g.hit(hero, boxes, true, false, false, 
       (side, box) => 
       {
           //alert(side);
           var initV = 2;

           if (right.isDown && side == "leftMiddle") 
           {
               box.vx += initV;
               box.ax = 0.9;
               box.ax_dir = -1;
           }

           if (left.isDown && side == "rightMiddle") 
           {
               box.vx += -initV;
               box.ax = 0.9;
               box.ax_dir = 1;
           }

           if (down.isDown && side == "topMiddle") 
           {
               box.vy += initV;
               box.ay = 0.9;
               box.ay_dir = -1;
           }

           if (up.isDown && side == "bottomMiddle") 
           {
               box.vy += -initV;
               box.ay = 0.9;
               box.ay_dir = 1;
           }
               
       });
    // ---

    // check if box is bumping into border
    boxes.forEach(b => 
    {
        b.x += b.vx;
        b.vx += b.ax * b.ax_dir;
        if (b.vx * b.ax_dir > 0)
        {
            b.vx = 0;
            b.ax = 0;
        }
          

        b.y += b.vy;
        b.vy += b.ay * b.ay_dir;
        if (b.vy * b.ay_dir > 0)
        {
            b.vy = 0;
            b.ay = 0;
        }
           

        //console.log("v="+b.vx + " a="+b.ax);

        borders.forEach(bb => 
        {
            if (b != bb)
               g.hit(b, bb, true, false, true, () => {})
        });
    }); 
    // ---

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
    // ---
    
    g.arrowControl(hero, 10);
    g.move(hero);

    hero.checkDir();

    //terrain.x -= 1;
    //g.move(terrain);
    
    hero.prevX = hero.x;
    hero.prevY = hero.y;
}