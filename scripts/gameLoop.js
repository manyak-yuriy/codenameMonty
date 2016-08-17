var 
    frameN = 0,
    skipEvery = 1;
    clearOnceEvery = 1000;

    var gu = new GameUtilities();

function play() {
    frameN++;

    gu.followEase(butterfly, hero, 0.003);

    if (frameN % clearOnceEvery == 0)
        clearGrid(borGrid);
     
    
    
    if (frameN % skipEvery == 0)
        borders.forEach(b => 
    {
        var j = Math.floor(b.x / boxW);
        var i = Math.floor(b.y / boxH);

        for (ii = i - 1; ii <= i + 1; ii++)
        for (jj = j - 1; jj <= j + 1; jj++)
            if (borGrid[ii][jj].indexOf(b) == -1)
                borGrid[ii][jj].push(b); 
    });

    // check if particle bumps upon border
    /*
    particles.filter(p => 
    {
        
        var alive = true;
        g.hit(p, borders, true, true, true, 
          () => 
          {   if (p)
              {
                  //particles[particles.indexOf(p)] = undefined;
                  g.remove(p);
                  alive = false;
              }
               
          });
          return alive;
    }); */
    // ---
    
    
    
    // try moving boxes
    
    g.hit(hero, boxes, true, false, false, 
       (side, box) => 
       {
           //alert(side);
           var initV = 3;

           if (right.isDown && side == "leftMiddle") 
           {
               box.vx = initV;
               box.ax = 0.5;
               box.ax_dir = -1;
           }

           if (left.isDown && side == "rightMiddle") 
           {
               box.vx = -initV;
               box.ax = 0.5;
               box.ax_dir = 1;
           }

           if (down.isDown && side == "topMiddle") 
           {
               box.vy = initV;
               box.ay = 0.5;
               box.ay_dir = -1;
           }

           if (up.isDown && side == "bottomMiddle") 
           {
               box.vy = -initV;
               box.ay = 0.5;
               box.ay_dir = 1;
           }
               
       });
    // ---


   // camera.centerOver(hero);


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
           

        var box_j = Math.floor(b.x / boxW);
        var box_i = Math.floor(b.y / boxH);
        var arrAdj = borGrid[box_i][box_j]

        //console.log("v="+b.vx + " a="+b.ax);
        if (arrAdj.length > 0)
        arrAdj.forEach(bb => 
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