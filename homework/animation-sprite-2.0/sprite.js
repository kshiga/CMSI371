/*
 * Sprites
 */

var drawSprite = {

    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        side = 80,
        sThin = 10,
        portalO = new Image();
        portalB = new Image();

        portalO.src = 'portalO.png'; 
        portalB.src = 'portalB.png';
   
        portalO.onload = function() {
           renderingContext.drawImage(portalO, 525, 517);
           console.log("placed orange");
        }
        portalB.onload = function() {
           renderingContext.drawImage(portalB, 515, 0);     
           console.log("placed blue");
        }
        run1: function(x, y) {
            renderingContext.strokeRect(x, y, sThin, side);

            renderingContext.beginPath();
            renderingContext.moveTo(x, (y + side));
            renderingContext.lineTo((x - 30), (y + side + 30));
            renderingContext.lineTo((x + 5), (y + side));
            renderingContext.lineTo(x, (y + side));
            renderingContext.stroke();

            renderingContext.beginPath();
            renderingContext.moveTo((x + sThin), (y + side));
            renderingContext.lineTo((x + 30), (y + side + 30));
            renderingContext.lineTo(x, (y + side));
            renderingContext.lineTo((x + sThin), (y + side));
            renderingContext.stroke();
        }

        run2 = function(x, y) {
            renderingContext.strokeRect(x, y, sThin, side);
            renderingContext.beginPath();

            renderingContext.moveTo(x, (y + side));
            renderingContext.lineTo((x + 30), (y + side + 30));
            renderingContext.lineTo((x + 5), (y + side));
            renderingContext.lineTo((x + sThin), (y + side));
            renderingContext.stroke();

            renderingContext.beginPath();
            renderingContext.moveTo((x + sThin), (y + side));
            renderingContext.lineTo((x - 30), (y + side + 30));
            renderingContext.lineTo(x, (y + side));
            renderingContext.lineTo((x + sThin), (y + side));
            renderingContext.stroke();
        }

        
        stop1: function(x, y) {
           renderingContext.beginPath();
           renderingContext.moveTo(x, y);
           renderingContext.lineTo((x + sThin), y);
           renderingContext.lineTo((x + sThin + 36), (y + 54));
           renderingContext.lineTo((x + 36), (y + 54));
           renderingContext.lineTo(x, y);
           renderingContext.stroke();

           renderingContext.beginPath();
           renderingContext.moveTo((x + sThin + 36), (y + 54));
           renderingContext.lineTo((x + 30), (y + 96));
           renderingContext.lineTo((x + 36), (y + 54));
           renderingContext.moveTo((x + sThin + 36), (y + 54));
           renderingContext.stroke();
        }
        
        
        stop2: function(x, y) {
           renderingContext.beginPath();
           renderingContext.moveTo(x, y);
           renderingContext.lineTo((x - sThin), y);
           renderingContext.lineTo((x - sThin - 36), (y + 54));
           renderingContext.lineTo((x - 36), (y + 54));
           renderingContext.lineTo(x, y);
           renderingContext.stroke();

           renderingContext.beginPath();
           renderingContext.moveTo((x - sThin - 36), (y + 54));
           renderingContext.lineTo((x - 30), (y + 96));
           renderingContext.lineTo((x - 36), (y + 54));
           renderingContext.moveTo((x - sThin - 36), (y + 54));
           renderingContext.stroke();
        }


        stand: function(x, y) {
           renderingContext.strokeRect(x, y, sThin, side);

           renderingContext.beginPath();
           renderingContext.moveTo(x, (y + side));
           renderingContext.lineTo(x, (y + side + 40));
           renderingContext.lineTo((x + sThin), (y + side));
           renderingContext.moveTo(x, (y + side));
           renderingContext.stroke();

        }
        
        tQuarters: function(x, y) {
           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x + 24), (y - 18)); //2
           renderingContext.lineTo((x + 24), (y + side - 18)); //3
           renderingContext.lineTo(x, (y + side)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();

           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x - 7) , y); //2
           renderingContext.lineTo((x -7), (y + side)); //3
           renderingContext.lineTo(x, (y + side)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();           

           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x - 7) , y); //2
           renderingContext.lineTo((x + 16), (y - 18)); //3
           renderingContext.lineTo((x + 24), (y - 18)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();  

           renderingContext.fillRect((x + 6), (y + 15), 2, 5);
           renderingContext.fillRect((x + 18), (y + 10), 2, 5);
           renderingContext.fillRect((x + 12), (y + 13), 3, 10);
           renderingContext.fillRect((x + 11), (y + 33), 4, 4);

           renderingContext.beginPath();
           renderingContext.moveTo((x + 24), (y + side - 18)); 
           renderingContext.lineTo((x + 15), (y +  side + 20)); 
           renderingContext.lineTo((x + 15), (y +  side - 12)); 
           renderingContext.lineTo((x + 10), (y +  side - 9)); 
           renderingContext.lineTo((x + 10), (y +  side + 30)); 
           renderingContext.lineTo((x - 3) , (y +  side)); 
           renderingContext.stroke();
        }        
        
        kneel1: function(x, y) {
           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x + 24), (y - 18)); //2
           renderingContext.lineTo((x + 24), (y + side - 18)); //3
           renderingContext.lineTo(x, (y + side)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();

           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x - 7) , y); //2
           renderingContext.lineTo((x -7), (y + side)); //3
           renderingContext.lineTo(x, (y + side)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();           

           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x - 7) , y); //2
           renderingContext.lineTo((x + 16), (y - 18)); //3
           renderingContext.lineTo((x + 24), (y - 18)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();  

           renderingContext.fillRect((x + 6), (y + 15), 2, 5);
           renderingContext.fillRect((x + 18), (y + 10), 2, 5);
           renderingContext.fillRect((x + 12), (y + 13), 3, 10);
           renderingContext.fillRect((x + 11), (y + 33), 4, 4);

           renderingContext.beginPath();
           renderingContext.moveTo((x + 24), (y + side - 18));
           renderingContext.lineTo((x + 29), (y +  side - 10));  
           renderingContext.lineTo((x + 15), (y +  side + 20)); 
           renderingContext.lineTo((x + 18), (y +  side - 10));
           renderingContext.lineTo((x + 15), (y +  side - 12)); 
           renderingContext.lineTo((x + 10), (y +  side - 9)); 
           renderingContext.lineTo((x + 13), (y +  side + 5)); 
           renderingContext.lineTo((x + 10), (y +  side + 30)); 
           renderingContext.lineTo((x + 5), (y +  side + 5)); 
           renderingContext.lineTo((x - 3) , (y +  side)); 
           renderingContext.stroke();  
        }

        kneel2: function(x, y) {
           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x + 24), (y - 18)); //2
           renderingContext.lineTo((x + 24), (y + side - 18)); //3
           renderingContext.lineTo(x, (y + side)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();

           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x - 7) , y); //2
           renderingContext.lineTo((x -7), (y + side)); //3
           renderingContext.lineTo(x, (y + side)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();           

           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x - 7) , y); //2
           renderingContext.lineTo((x + 16), (y - 18)); //3
           renderingContext.lineTo((x + 24), (y - 18)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();  

           renderingContext.fillRect((x + 6), (y + 15), 2, 5);
           renderingContext.fillRect((x + 18), (y + 10), 2, 5);
           renderingContext.fillRect((x + 12), (y + 13), 3, 10);
           renderingContext.fillRect((x + 11), (y + 33), 4, 4);

           renderingContext.beginPath();
           renderingContext.moveTo((x + 24), (y + side - 18));
           renderingContext.lineTo((x + 42), (y +  side - 15));  
           renderingContext.lineTo((x + 25), (y +  side + 13)); 
           renderingContext.lineTo((x + 30), (y +  side - 10));
           renderingContext.lineTo((x + 15), (y +  side - 8)); 
           renderingContext.lineTo((x + 11), (y +  side - 9)); 
           renderingContext.lineTo((x + 25), (y +  side - 2)); 
           renderingContext.lineTo((x + 10), (y +  side + 30)); 
           renderingContext.lineTo((x + 15), (y +  side + 4)); 
           renderingContext.lineTo((x - 3) , (y +  side)); 
           renderingContext.stroke();  
        }

        kneelExt: function(x, y) {
           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x + 24), (y - 18)); //2
           renderingContext.lineTo((x + 24), (y + side - 18)); //3
           renderingContext.lineTo(x, (y + side)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();

           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x - 7) , y); //2
           renderingContext.lineTo((x -7), (y + side)); //3
           renderingContext.lineTo(x, (y + side)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();           

           renderingContext.beginPath();
           renderingContext.moveTo(x, y); // 1
           renderingContext.lineTo((x - 7) , y); //2
           renderingContext.lineTo((x + 16), (y - 18)); //3
           renderingContext.lineTo((x + 24), (y - 18)); //4
           renderingContext.lineTo(x, y);
           renderingContext.stroke();  

           renderingContext.fillRect((x + 6), (y + 15), 2, 5);
           renderingContext.fillRect((x + 18), (y + 10), 2, 5);
           renderingContext.fillRect((x + 12), (y + 13), 3, 10);
           renderingContext.fillRect((x + 11), (y + 33), 4, 4);

           renderingContext.beginPath();
           renderingContext.moveTo((x + 24), (y + side - 18));
           renderingContext.lineTo((x + 80), (y +  side + 10));  
           renderingContext.lineTo((x + 15), (y +  side - 8)); 
           renderingContext.lineTo((x + 11), (y +  side - 9)); 
           renderingContext.lineTo((x + 25), (y +  side - 2)); 
           renderingContext.lineTo((x + 10), (y +  side + 30)); 
           renderingContext.lineTo((x + 15), (y +  side + 4)); 
           renderingContext.lineTo((x - 3) , (y +  side)); 
           renderingContext.stroke();  
        }

        forward: function(x, y) {
            renderingContext.strokeRect(x, y, side, side);

            renderingContext.fillRect((x + (side / 4)), (y + (side / 4)), 3, 9);
            renderingContext.fillRect((x + (3 *  (side / 4))), (y + (side / 4)), 3, 9);
            renderingContext.fillRect((x + (side / 2) - 2.5), (y + (side / 4)), 5, 18);
            renderingContext.fillRect((x + (side / 2) - 2.5), (y + ( 3 * side / 5)), 5, 5);

            renderingContext.beginPath();
            renderingContext.moveTo(x, (y + side));
            renderingContext.lineTo((x + (side)/4), (y + side + 40));
            renderingContext.lineTo((x + (side)/4), (y + side));
            renderingContext.lineTo((x + 3 *(side) / 4), (y + side));
            renderingContext.lineTo((x + 3 *(side) / 4), (y + side + 40));
            renderingContext.lineTo((x + side), (y + side));
            renderingContext.lineTo(x, (y + side));
            renderingContext.stroke();            
        }

        forwardQ: function(x, y) {
            renderingContext.strokeRect(x, y, side, side);

            renderingContext.fillRect((x + (side / 4)), (y + (side / 4)), 3, 9);
            renderingContext.fillRect((x + (3 *  (side / 4))), (y + (side / 4)), 3, 9);
            renderingContext.fillRect((x + (side / 2) - 2.5), (y + (side / 4)), 5, 18);
            renderingContext.fillRect((x + (side / 2) - 2.5), (y + ( 3 * side / 5)), 5, 5);

            renderingContext.beginPath();
            renderingContext.moveTo(x, (y + side));
            renderingContext.lineTo((x + (side)/4), (y + side + 40));
            renderingContext.lineTo((x + (side)/4), (y + side)); 
            renderingContext.lineTo((x + 3 *(side) / 4), (y + side));
            renderingContext.lineTo((x + 3 *(side) / 4), (y + side + 40));
            renderingContext.lineTo((x + side), (y + side));
            renderingContext.lineTo(x, (y + side));
            renderingContext.stroke();

            renderingContext.beginPath();
            renderingContext.moveTo((x + side + 7), (y + 10));
            renderingContext.lineTo((x + side + 13), (y - 7));
            renderingContext.stroke();
 
            renderingContext.font = '45px Arial';
            renderingContext.textBaseline = 'bottom';
            renderingContext.fillText('?', (x + side + 10), (y + 5));

        }

        jump: function(x, y) {
            renderingContext.strokeRect(x, y, side, side);

            renderingContext.beginPath();
            renderingContext.moveTo((x + 15), (y + 20));
            renderingContext.lineTo((x + 20), (y + 20));
            renderingContext.lineTo((x + 25), (y + 25));
            renderingContext.lineTo((x + 20), (y + 30));
            renderingContext.lineTo((x + 15), (y + 30));
            renderingContext.lineTo((x + 20), (y + 25));
            renderingContext.moveTo((x + 15), (y + 20));
            renderingContext.fill();

            renderingContext.beginPath();
            renderingContext.moveTo((x + 65), (y + 20));
            renderingContext.lineTo((x + 60), (y + 20));
            renderingContext.lineTo((x + 55), (y + 25));
            renderingContext.lineTo((x + 60), (y + 30));
            renderingContext.lineTo((x + 65), (y + 30));
            renderingContext.lineTo((x + 60), (y + 25));
            renderingContext.moveTo((x + 65), (y + 20));
            renderingContext.fill();

            renderingContext.fillRect((x + (side / 2) - 2.5), (y + (side / 4)), 5, 18);
            renderingContext.fillRect((x + (side / 2) - 2.5), (y + ( 3 * side / 5)), 5, 5);

            renderingContext.beginPath();
            renderingContext.moveTo(x, (y + side));
            renderingContext.lineTo((x + (side)/4), (y + side + 40));
            renderingContext.lineTo((x + (side)/4), (y + side));
            renderingContext.lineTo((x + 3 *(side) / 4), (y + side));
            renderingContext.lineTo((x + 3 *(side) / 4), (y + side + 40));
            renderingContext.lineTo((x + side), (y + side));
            renderingContext.lineTo(x, (y + side));
            renderingContext.stroke();            
        
        }
 
        falling: function(x, y) {
            renderingContext.strokeRect(x, y, side, side);

            renderingContext.beginPath();
            renderingContext.moveTo((x + 15), (y + 20));
            renderingContext.lineTo((x + 20), (y + 20));
            renderingContext.lineTo((x + 25), (y + 25));
            renderingContext.lineTo((x + 20), (y + 30));
            renderingContext.lineTo((x + 15), (y + 30));
            renderingContext.lineTo((x + 20), (y + 25));
            renderingContext.moveTo((x + 15), (y + 20));
            renderingContext.fill();

            renderingContext.beginPath();
            renderingContext.moveTo((x + 65), (y + 20));
            renderingContext.lineTo((x + 60), (y + 20));
            renderingContext.lineTo((x + 55), (y + 25));
            renderingContext.lineTo((x + 60), (y + 30));
            renderingContext.lineTo((x + 65), (y + 30));
            renderingContext.lineTo((x + 60), (y + 25));
            renderingContext.moveTo((x + 65), (y + 20));
            renderingContext.fill();

            renderingContext.fillRect((x + (side / 2) - 2.5), (y + (side / 4)), 5, 18);
            renderingContext.fillRect((x + (side / 2) - 5), (y + ( 3 * side / 5)), 10, 10);

            renderingContext.beginPath();
            renderingContext.moveTo(x, (y + side ));
            renderingContext.lineTo((x - (side)/4), (y + side + 40));
            renderingContext.lineTo((x + (side)/4), (y + side));
            renderingContext.lineTo((x + 3 *(side) / 4), (y + side));
            renderingContext.lineTo((x + 5 *(side) / 4), (y + side + 40));
            renderingContext.lineTo((x + side), (y + side));
            renderingContext.lineTo(x, (y + side));
            renderingContext.stroke(); 
        } 
      
}

