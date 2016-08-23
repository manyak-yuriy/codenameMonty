var 
    frameN = 0,
    skipEvery = 1;
    clearOnceEvery = 10;

    var gu = new GameUtilities();


    function getBordGridCell(item)
    {
        var j = Math.floor(item.x / boxW);
        var i = Math.floor(item.y / boxH);
        var arrAdj = borGrid[i][j];
        return arrAdj;
    }


function play() {
    frameN++;
    camera.follow(hero);
    //blurFilter.blur  =  Math.sin(frameN / 100);

    gu.followEase(butterfly, hero, 0.03);

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
           

        var arrAdj = getBordGridCell(b);

        //console.log("v="+b.vx + " a="+b.ax);
        if (arrAdj.length > 0)
        arrAdj.forEach(bor => 
        {
            if (b != bor)
               g.hit(b, bor, true, false, true, () => {})
        });
    }); 

    
    particles.forEach(p => 
    {
        var arrAdj = getBordGridCell(p);

        //console.log("v="+b.vx + " a="+b.ax);
        if (arrAdj.length > 0)
        arrAdj.forEach(bor => 
        {
               g.hit(p, bor, true, true, false, () => {})
        });
    });
    // ---

    // check if hero is not bumping upon border
    g.hit(hero, borders, true, false, false);

    // check if enemy is not bumping upon border
    enemies.forEach(enemy => 
    {
        var arrAdj = getBordGridCell(enemy);

        //console.log("v="+b.vx + " a="+b.ax);
        if (arrAdj.length > 0)
        arrAdj.forEach(bor => 
        {
           
               g.hit(enemy, bor, true, false, true, () => 
               {
                     var r = g.randomInt(1, 4);
                     switch (r)
                     {
                         case 1:
                         {
                             enemy.vx = boxW / 25;
                             enemy.vy = 0;
                             break;
                         }
                         case 2:
                         {
                             enemy.vx = -boxW / 25;
                             enemy.vy = 0;
                             break;
                         }
                         case 3:
                         {
                             enemy.vx = 0;
                             enemy.vy = boxH / 25;
                             break;
                         }
                         case 4:
                         {
                             enemy.vx = 0;
                             enemy.vy = -boxH / 25;
                             break;
                         }
                     }
               });
        });
        
    });
    
    

    g.hit(butterfly, borders, true, false, false);

    // check if hero is stumbling upon the mark
    g.hit(hero, mark, true, true, false, 
       () => 
       {
           addParticles(); 
           var anim = initAnimDust(); 
       })
    // ---

    listen_kbd(hero);

    enemies.forEach(enemy => 
    {
        g.move(enemy);
        enemy.checkDir();

        enemy.prevX = enemy.x;
        enemy.prevY = enemy.y;
    });
    
}