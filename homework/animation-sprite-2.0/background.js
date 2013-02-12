/*
 *Background 
 *Assignment 0212 
 *CMSI371 
 *Spring 2013
 */

// var background = 
(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height,
        //room structure 
        roomCorner = {
            topLeft: { x: 100, y: 125 },
            topRight: { x: width, y: 125 },
            bottomLeft: { x: 100, y: 460 }, 
            bottomRight: { x: width, y: 460 },  
            frontTop: { x: 0, y: 50 },
            frontBottom: { x: 0, y: 560 },
            frontTopIn: { x: 0, y: 90 }, 
            backTopIn: { x: 80, y: 145 },
            frontBottomIn: { x: 0, y: 510 },
            backBottomIn: { x: 80, y: 440 },
            inTopLeft: { x: 0, y: 145 },
            inBottomLeft: { x: 0, y: 440 },
        },
        //wall panel specifications
        pHeight = ((roomCorner.bottomLeft.y - roomCorner.topLeft.y) / 3),
        pWidth = ((roomCorner.bottomRight.x - roomCorner.bottomLeft .x) / 10),
        bevelH = pHeight + 2;
        bevelW = pWidth + 2;
        j = 80;

        //basic room structure
        renderingContext.strokeStyle = "rgb(170, 170, 170)"; 
        //backwall
        renderingContext.beginPath();
        renderingContext.moveTo(roomCorner.topLeft.x, roomCorner.topLeft.y);
        renderingContext.lineTo(roomCorner.topRight.x, roomCorner.topRight.y);
        renderingContext.lineTo(roomCorner.bottomRight.x, roomCorner.bottomRight.y);
        renderingContext.lineTo(roomCorner.bottomLeft.x, roomCorner.bottomLeft.y);
        renderingContext.lineTo(roomCorner.topLeft.x, roomCorner.topLeft.y);
        renderingContext.stroke();
        //side wall
        renderingContext.fillStyle = "rgb(210, 210, 210)"; 
        renderingContext.beginPath();
        renderingContext.moveTo(roomCorner.frontTop.x, roomCorner.frontTop.y);
        renderingContext.lineTo(roomCorner.topLeft.x, roomCorner.topLeft.y);
        renderingContext.lineTo(roomCorner.bottomLeft.x, roomCorner.bottomLeft.y);
        renderingContext.lineTo(roomCorner.frontBottom.x, roomCorner.frontBottom.y);
        renderingContext.fill();
        //side wall insert
        renderingContext.fillStyle = "rgb(200, 200, 200)";
        renderingContext.beginPath();
        renderingContext.moveTo(roomCorner.frontTopIn.x, roomCorner.frontTopIn.y);
        renderingContext.lineTo(roomCorner.backTopIn.x, roomCorner.backTopIn.y);
        renderingContext.lineTo(roomCorner.backBottomIn.x, roomCorner.backBottomIn.y);
        renderingContext.lineTo(roomCorner.frontBottomIn.x, roomCorner.frontBottomIn.y);
        renderingContext.lineTo(roomCorner.frontTopIn.x, roomCorner.frontTopIn.y);
        renderingContext.fill();
        //side wall insert ceil/floor
        renderingContext.fillStyle = "rgb(230, 230, 230)"; 
        renderingContext.beginPath();
        renderingContext.moveTo(roomCorner.inTopLeft.x, roomCorner.inTopLeft.y);
        renderingContext.lineTo(roomCorner.backTopIn.x, roomCorner.backTopIn.y);
        renderingContext.lineTo(roomCorner.backBottomIn.x, roomCorner.backBottomIn.y);
        renderingContext.lineTo(roomCorner.inBottomLeft.x, roomCorner.inBottomLeft.y);
        renderingContext.lineTo(roomCorner.inTopLeft.x, roomCorner.inTopLeft.y);
        renderingContext.fill();
        //ceiling
        renderingContext.fillStyle = "rgb(220, 220, 220)"; 
        renderingContext.beginPath();
        renderingContext.moveTo(0, 0);
        renderingContext.lineTo(width, 0);
        renderingContext.lineTo(roomCorner.topRight.x, roomCorner.topRight.y);
        renderingContext.lineTo(roomCorner.topLeft.x, roomCorner.topLeft.y);
        renderingContext.lineTo(roomCorner.frontTop.x, roomCorner.frontTop.y);
        renderingContext.lineTo(0, 0);
        renderingContext.fill();
        //floor
        renderingContext.fillStyle = "rgb(180, 180, 185)"; 
        renderingContext.beginPath();
        renderingContext.moveTo(0, height);
        renderingContext.lineTo(width, height);
        renderingContext.lineTo(roomCorner.bottomRight.x, roomCorner.bottomRight.y);
        renderingContext.lineTo(roomCorner.bottomLeft.x, roomCorner.bottomLeft.y);
        renderingContext.lineTo(roomCorner.frontBottom.x, roomCorner.frontBottom.y);
        renderingContext.lineTo(0, height);
        renderingContext.fill();

        renderingContext.fillStyle = "rgb(255, 255, 255)"; 
        renderingContext.beginPath();
        renderingContext.moveTo(0, 200);
        renderingContext.lineTo(50, 200);
        renderingContext.lineTo(50, 410);
        renderingContext.lineTo(0, 410);
        renderingContext.lineTo(0, 200);
        renderingContext.fill();

        drawPanel = function(x, y){
            renderingContext.save();
            renderingContext.fillStyle="rgb(230, 230, 230)";
            renderingContext.strokeStyle = "rgb(170, 170, 175)";
            renderingContext.fillRect(x, y, pWidth, pHeight);
            renderingContext.strokeRect((x-2), (y-2), bevelW, bevelH); 
            renderingContext.restore();
        }
       
        drawLine = function (x1, y1, x2, y2){
           renderingContext.save();
           renderingContext.lineWidth = "3";
           renderingContext.beginPath();
           renderingContext.moveTo(x1, y1);
           renderingContext.lineTo(x2, y2);
           renderingContext.stroke();
           renderingContext.restore();
       }


    // drawing recusive background elements
    for (i = roomCorner.bottomLeft.x; i < roomCorner.bottomRight.x; i+= bevelW){
        drawPanel((i + 2), (roomCorner.bottomLeft.y - pHeight));
        drawPanel((i + (pWidth + 4)), (roomCorner.bottomLeft.y - (2 * pHeight) + 2));
        drawPanel((i + (4 * pWidth) + 10), (roomCorner.bottomLeft.y - (3 * pHeight)));
    }

    for (i = 480; i < height; i += 30){
        drawLine(j, i, width, i);
        j -= 31;
   }
    for (i = 135; i < width; i += 60){
            var qw  = i - 150 + ( i * 0.2) ; 
            drawLine(i, 460, qw, height);
   }
}());



