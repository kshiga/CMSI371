/*
 *Problem 25a. Drawing a blue square at the center of the canvas. 
 *Assignment 0129 
 *CMSI371 
 *Spring 2013
 */

(function () {
    var canvas = document.getElementById("canvas"),
        square = canvas.getContext("2d"),
        // JD: ^^^^Interesting approach to naming the rendering context.
        //     I guess this is mostly OK, but loses meaning when the
        //     scene becomes more complex.
        squareSide = 150,
        center = ((canvas.width/2) - (squareSide/2));

    square.fillStyle = "blue";
    square.fillRect(center, center, squareSide, squareSide);

}());
