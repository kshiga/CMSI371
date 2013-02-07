/*
 *Background 
 *Assignment 0212 
 *CMSI371 
 *Spring 2013
 */

(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height,
        pSide = 95,
        bevel = 97;            
        drawPanel = function(x, y){
            renderingContext.fillStyle="rgb(230, 230, 230)";
            renderingContext.strokeStyle = "rgb(170, 170, 170)"
            renderingContext.fillRect(x, y, pSide, pSide);
            renderingContext.strokeRect((x-2), (y-2), bevel, bevel) 
        }
       
        drawGrid = function (x1, y1, x2, y2){
           renderingContext.lineWidth = "2";
           renderingContext.beginPath();
           renderingContext.moveTo(x1, y1);
           renderingContext.lineTo(x2, y2);
           renderingContext.stroke();

       }


    // drawing recusive background elements
    for(var i = 0; i < width;){
       drawGrid((i + 95), 80, (i + 95), 500);
       drawPanel(i + 679, 112);
       drawPanel(i + 679, 209);
       drawPanel(i + 388, 306);
       drawPanel(i, 403);
       i+= bevel;
    }
    drawPanel (485, 209);

}());



