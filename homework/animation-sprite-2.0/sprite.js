/*
 * Sprites
 */

var DrawSprites = {           

        portalO: function(renderingContext) {
           portalO = new Image();
           portalO.src = 'portalO1.png'; 
           renderingContext.drawImage(portalO, 506, 519);
           console.log("placed orange");
        },

        portalB: function(renderingContext) {
           portalB = new Image();
           portalB.src = 'portalB1.png';
           renderingContext.drawImage(portalB, 505, 0);     
           console.log("placed blue");
        },

        run1: function(renderingContext) {
            renderingContext.fillStyle = 'rgb(204, 255, 229)';
            renderingContext.fillRect(0, 0, 10, 80);

            renderingContext.fillStyle = 'rgb(0, 0, 0)';
            renderingContext.beginPath();
            renderingContext.moveTo(0, 80);
            renderingContext.lineTo(-30, (80 + 30));
            renderingContext.lineTo(5, 80);
            renderingContext.lineTo(0, 80);
            renderingContext.fill();
            renderingContext.fillRect(-25, 105, 8, 5);

            renderingContext.beginPath();
            renderingContext.moveTo(10, 80);
            renderingContext.lineTo(30, (80 + 30));
            renderingContext.lineTo(0, 80);
            renderingContext.lineTo(10, 80);
            renderingContext.fill();
            renderingContext.fillRect(25, 105, 8, 5);
           

           console.log("placed run1");
        },

        run2 : function(renderingContext) {
            renderingContext.fillStyle = 'rgb(204, 255, 229)';
            renderingContext.fillRect(0, 0, 10, 80);


            renderingContext.fillStyle = 'rgb(0, 0, 0)';
            renderingContext.beginPath();
            renderingContext.moveTo(0, 80);
            renderingContext.lineTo(30, (80 + 30));
            renderingContext.lineTo(5, 80);
            renderingContext.lineTo(10, 80);
            renderingContext.fill();
            renderingContext.fillRect(-25, 105, 8, 5);

            renderingContext.beginPath();
            renderingContext.moveTo(10, 80);
            renderingContext.lineTo((-30), (80 + 30));
            renderingContext.lineTo(0, 80);
            renderingContext.lineTo(10, 80);
            renderingContext.fillRect(25, 105, 8, 5);
            renderingContext.fill();
           console.log("placed run2");
        },

        
        stop1: function(renderingContext) {
           renderingContext.fillStyle = 'rgb(204, 255, 229)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0);
           renderingContext.lineTo(10, 0);
           renderingContext.lineTo((10 + 36), 54);
           renderingContext.lineTo(36, 54);
           renderingContext.lineTo(0, 0);
           renderingContext.fill();

           renderingContext.fillStyle = 'rgb(0, 0, 0)';
           renderingContext.beginPath();
           renderingContext.moveTo((10 + 36), 54);
           renderingContext.lineTo(30, 96);
           renderingContext.lineTo(36, 54);
           renderingContext.moveTo((10 + 36), 54);
           renderingContext.fill();
           renderingContext.fillRect(15, 105, 8, 5);
           console.log("placed stop1");
        },
        
        
        stop2: function(renderingContext) {
           renderingContext.fillStyle = 'rgb(204, 255, 229)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0);
           renderingContext.lineTo((-10), 0);
           renderingContext.lineTo((-10 - 36), 54);
           renderingContext.lineTo((-36), 54);
           renderingContext.lineTo(0, 0);
           renderingContext.fill();

           renderingContext.fillStyle = 'rgb(0, 0, 0)';
           renderingContext.beginPath();
           renderingContext.moveTo((-10 - 36), 54);
           renderingContext.lineTo((-30), 96);
           renderingContext.lineTo((-36), 54);
           renderingContext.moveTo((-10 - 36), 54);
           renderingContext.fill();
           renderingContext.fillRect(-15, 105, 8, 5);
           console.log("placed stop2");
        },


        stand: function(renderingContext) {
           renderingContext.fillStyle = 'rgb(204, 255, 229)';
           renderingContext.fillRect(0, 0, 10, 80);

           renderingContext.fillStyle = 'rgb(0, 0, 0)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 80);
           renderingContext.lineTo(0, (80 + 40));
           renderingContext.lineTo(10, 80);
           renderingContext.moveTo(0, 80);
           renderingContext.fill();

        },
        
        tQuarters: function(renderingContext) {
           renderingContext.fillStyle = 'rgb(204, 255, 229)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo(24, (-18)); //2
           renderingContext.lineTo(24, (80 - 18)); //3
           renderingContext.lineTo(0, 80); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();

           renderingContext.fillStyle = 'rgb(190, 245, 230)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo((-7) , 0); //2
           renderingContext.lineTo((-7), 80); //3
           renderingContext.lineTo(0, 80); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();           

           renderingContext.fillStyle = 'rgb(215, 255, 240)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo((-7) , 0); //2
           renderingContext.lineTo(16, (-18)); //3
           renderingContext.lineTo(24, (-18)); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();  

           renderingContext.fillStyle = 'rgb(0, 0, 0)';
           renderingContext.fillRect(6, 15, 2, 5);
           renderingContext.fillRect(18, 10, 2, 5);
           renderingContext.fillRect(12, 13, 3, 10);
           renderingContext.fillRect(11, 33, 4, 4);

           renderingContext.beginPath();
           renderingContext.moveTo(24, (80 - 18)); 
           renderingContext.lineTo(15, (80 + 20)); 
           renderingContext.lineTo(15, (80 - 12)); 
           renderingContext.lineTo(10, (80 - 9)); 
           renderingContext.lineTo(10, (80 + 30)); 
           renderingContext.lineTo(3 , 80); 
           renderingContext.fill();
        },        
        
        kneel1: function(renderingContext) {
           renderingContext.fillStyle = 'rgb(204, 255, 229)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo(24, (-18)); //2
           renderingContext.lineTo(24, (80 - 18)); //3
           renderingContext.lineTo(0, 80); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();

           renderingContext.fillStyle = 'rgb(190, 245, 230)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo((-7) , 0); //2
           renderingContext.lineTo((-7), 80); //3
           renderingContext.lineTo(0, 80); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();           

           renderingContext.fillStyle = 'rgb(215, 255, 240)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo((-7) , 0); //2
           renderingContext.lineTo(16, (-18)); //3
           renderingContext.lineTo(24, (-18)); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();  

           renderingContext.fillStyle = 'rgb(0, 0, 0)';
           renderingContext.fillRect(6, 15, 2, 5);
           renderingContext.fillRect(18, 10, 2, 5);
           renderingContext.fillRect(12, 13, 3, 10);
           renderingContext.fillRect(11, 33, 4, 4);
           renderingContext.beginPath();
           renderingContext.moveTo(24, (80 - 18));
           renderingContext.lineTo(29, (80 - 10));  
           renderingContext.lineTo(15, (80 + 20)); 
           renderingContext.lineTo(18, (80 - 10));
           renderingContext.lineTo(15, (80 - 12)); 
           renderingContext.lineTo(10, (80 - 9)); 
           renderingContext.lineTo(13, (80 + 5)); 
           renderingContext.lineTo(10, (80 + 30)); 
           renderingContext.lineTo(5, (80 + 5)); 
           renderingContext.lineTo((-3) , 80); 
           renderingContext.fill();  
        },

        kneel2: function(renderingContext) {
           renderingContext.fillStyle = 'rgb(204, 255, 229)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo(24, (-18)); //2
           renderingContext.lineTo(24, (80 - 18)); //3
           renderingContext.lineTo(0, 80); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();

           renderingContext.fillStyle = 'rgb(190, 245, 230)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo((-7) , 0); //2
           renderingContext.lineTo((-7), 80); //3
           renderingContext.lineTo(0, 80); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();           

           renderingContext.fillStyle = 'rgb(215, 255, 240)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo((-7) , 0); //2
           renderingContext.lineTo(16, (-18)); //3
           renderingContext.lineTo(24, (-18)); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();  

           renderingContext.fillStyle = 'rgb(0, 0, 0)';
           renderingContext.fillRect(6, 15, 2, 5);
           renderingContext.fillRect(18, 10, 2, 5);
           renderingContext.fillRect(12, 13, 3, 10);
           renderingContext.fillRect(11, 33, 4, 4);

           renderingContext.fillStyle = 'rgb(0, 0, 0)';
           renderingContext.beginPath();
           renderingContext.moveTo(24, (80 - 18));
           renderingContext.lineTo(42, (80 - 15));  
           renderingContext.lineTo(25, (80 + 13)); 
           renderingContext.lineTo(30, (80 - 10));
           renderingContext.lineTo(15, (80 - 8)); 
           renderingContext.lineTo(11, (80 - 9)); 
           renderingContext.lineTo(25, (80 - 2)); 
           renderingContext.lineTo(10, (80 + 30)); 
           renderingContext.lineTo(15, (80 + 4)); 
           renderingContext.lineTo((-3) , 80); 
           renderingContext.fill();  
        },

        kneelExt: function(renderingContext) {
           renderingContext.fillStyle = 'rgb(204, 255, 229)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo(24, (-18)); //2
           renderingContext.lineTo(24, (80 - 18)); //3
           renderingContext.lineTo(0, 80); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();

           renderingContext.fillStyle = 'rgb(190, 245, 230)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo((-7) , 0); //2
           renderingContext.lineTo((-7), 80); //3
           renderingContext.lineTo(0, 80); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();           

           renderingContext.fillStyle = 'rgb(215, 255, 240)';
           renderingContext.beginPath();
           renderingContext.moveTo(0, 0); // 1
           renderingContext.lineTo((-7) , 0); //2
           renderingContext.lineTo(16, (-18)); //3
           renderingContext.lineTo(24, (-18)); //4
           renderingContext.lineTo(0, 0);
           renderingContext.fill();  

           renderingContext.fillStyle = 'rgb(0, 0, 0)';
           renderingContext.fillRect(6, 15, 2, 5);
           renderingContext.fillRect(18, 10, 2, 5);
           renderingContext.fillRect(12, 13, 3, 10);
           renderingContext.fillRect(11, 33, 4, 4);

           renderingContext.beginPath();
           renderingContext.moveTo(24, (80 - 18));
           renderingContext.lineTo(80, (80 + 10));  
           renderingContext.lineTo(15, (80 - 8)); 
           renderingContext.lineTo(11, (80 - 9)); 
           renderingContext.lineTo(25, (80 - 2)); 
           renderingContext.lineTo(10, (80 + 30)); 
           renderingContext.lineTo(15, (80 + 4)); 
           renderingContext.lineTo((-3) , 80); 
           renderingContext.fill();  
        },

        forward: function(renderingContext) {
            renderingContext.fillStyle = 'rgb(204, 255, 229)';
            renderingContext.fillRect(0, 0, 80, 80);
 
            renderingContext.fillStyle = 'rgb(0, 0, 0)';
            renderingContext.fillRect((80 / 4), (80 / 4), 3, 9);
            renderingContext.fillRect((3 *  (80 / 4)), (80 / 4), 3, 9);
            renderingContext.fillRect(((80 / 2) - 2.5), (80 / 4), 5, 18);
            renderingContext.fillRect(((80 / 2) - 2.5), ( 3 * (80 / 5)), 5, 5);

            renderingContext.beginPath();
            renderingContext.moveTo(0, 80);
            renderingContext.lineTo((80 / 4), (80 + 40));
            renderingContext.lineTo((80 / 4), 80);
            renderingContext.lineTo((3 * (80 / 4)), 80);
            renderingContext.lineTo((3 * (80/ 4)), (80 + 40));
            renderingContext.lineTo(80, 80);
            renderingContext.lineTo(0, 80);
            renderingContext.fill();            
        },

        forwardQ: function(renderingContext) {
            renderingContext.fillStyle = 'rgb(204, 255, 229)';
            renderingContext.fillRect(0, 0, 80, 80);
 
            renderingContext.fillStyle = 'rgb(0, 0, 0)';
            renderingContext.fillRect((80 / 4), (80 / 4), 3, 9);
            renderingContext.fillRect((3 *  (80 / 4)), (80 / 4), 3, 9);
            renderingContext.fillRect(((80 / 2) - 2.5), (80 / 4), 5, 18);
            renderingContext.fillRect(((80 / 2) - 2.5), ( 3 * (80 / 5)), 5, 5);

            renderingContext.beginPath();
            renderingContext.moveTo(0, 80);
            renderingContext.lineTo((80 / 4), (80 + 40));
            renderingContext.lineTo((80 / 4), 80);
            renderingContext.lineTo((3 * (80 / 4)), 80);
            renderingContext.lineTo((3 * (80/ 4)), (80 + 40));
            renderingContext.lineTo(80, 80);
            renderingContext.lineTo(0, 80);
            renderingContext.fill();     

            renderingContext.beginPath();
            renderingContext.moveTo((80 + 7), 10);
            renderingContext.lineTo((80 + 13), (-7));
            renderingContext.stroke();
 
            renderingContext.font = '45px Arial';
            renderingContext.textBaseline = 'bottom';
            renderingContext.fillText('?', (80 + 10), 5);

        },

        jump: function(renderingContext) {
            renderingContext.fillStyle = 'rgb(204, 255, 229)';
            renderingContext.fillRect(0, 0, 80, 80);

            renderingContext.fillStyle = 'rgb(0, 0, 0)';
            renderingContext.beginPath();
            renderingContext.moveTo(15, 20);
            renderingContext.lineTo(20, 20);
            renderingContext.lineTo(25, 25);
            renderingContext.lineTo(20, 30);
            renderingContext.lineTo(15, 30);
            renderingContext.lineTo(20, 25);
            renderingContext.moveTo(15, 20);
            renderingContext.fill();

            renderingContext.beginPath();
            renderingContext.moveTo(65, 20);
            renderingContext.lineTo(60, 20);
            renderingContext.lineTo(55, 25);
            renderingContext.lineTo(60, 30);
            renderingContext.lineTo(65, 30);
            renderingContext.lineTo(60, 25);
            renderingContext.moveTo(65, 20);
            renderingContext.fill();

            renderingContext.fillRect(((80 / 2) - 2.5), (80 / 4), 5, 18);
            renderingContext.fillRect(((80 / 2) - 2.5), ( 3 * (80 / 5)), 5, 5);

            renderingContext.beginPath();
            renderingContext.moveTo(0, 80);
            renderingContext.lineTo((80 / 4), (80 + 40));
            renderingContext.lineTo((80 / 4), 80);
            renderingContext.lineTo((3 *(80 / 4)), 80);
            renderingContext.lineTo((3 *(80 / 4)), (80 + 40));
            renderingContext.lineTo(80, 80);
            renderingContext.lineTo(0, 80);
            renderingContext.fill();            
        
        },
 
        falling: function(renderingContext) {
            renderingContext.save();
            renderingContext.fillStyle = 'rgb(204, 255, 229)';
            renderingContext.fillRect(0, 0, 80, 80);

            renderingContext.fillStyle = 'rgb(0, 0, 0)';
            renderingContext.moveTo(15, 20);
            renderingContext.lineTo(20, 20);
            renderingContext.lineTo(25, 25);
            renderingContext.lineTo(20, 30);
            renderingContext.lineTo(15, 30);
            renderingContext.lineTo(20, 25);
            renderingContext.moveTo(15, 20);
            renderingContext.fill();

            renderingContext.beginPath();
            renderingContext.moveTo(65, 20);
            renderingContext.lineTo(60, 20);
            renderingContext.lineTo(55, 25);
            renderingContext.lineTo(60, 30);
            renderingContext.lineTo(65, 30);
            renderingContext.lineTo(60, 25);
            renderingContext.moveTo(65, 20);
            renderingContext.fill();

            renderingContext.fillRect(((80 / 2) - 2.5), (80 / 4), 5, 18);
            renderingContext.fillRect(((80 / 2) - 2.5), ( 3 * (80 / 5)), 5, 5);

            renderingContext.beginPath();
            renderingContext.moveTo(0, 80);
            renderingContext.lineTo((-(80 / 4)), (80 + 40));
            renderingContext.lineTo((80/4), 80);
            renderingContext.lineTo((3 *(80 / 4)), 80);
            renderingContext.lineTo((5 *(80 / 4)), (80 + 40));
            renderingContext.lineTo(80, 80);
            renderingContext.lineTo(0, 80);
            renderingContext.fill(); 
            renderingContext.restore();
        } 
      
};

