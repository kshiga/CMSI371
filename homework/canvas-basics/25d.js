/*
 *Problem 25d. An orange “X” whose lines span the upper-left to lower-right corners and the lower-left to upper-right corners of the canvas, respectively.
 *Assignment 0129 
 *CMSI371 
 *Spring 2013
 */

(function () {
    var canvas = document.getElementById("canvas"),

        lines = canvas.getContext("2d")
        edgeRight = (canvas.width -1)
        edgeBottom = (canvas.height -1)

        lines.strokeStyle = "orange"
        lines.lineWidth = "10"

        lines.beginPath();
        lines.moveTo(0,0);
        lines.lineTo(edgeRight, edgeBottom);
        lines.stroke();

        lines.beginPath();
        lines.moveTo(edgeBottom, 0);
        lines.lineTo(0, edgeRight);
        lines.stroke();
}());

