/*
 *Problem 25b. A black border surrounding the perimeter of the canvas.
 *Assignment 0129 
 *CMSI371 
 *Spring 2013
 */

(function () {
    var canvas = document.getElementById("canvas"),
        border = canvas.getContext("2d"),
        bordersize = canvas.width

    border.lineWidth = "3";
    border.strokeRect(0, 0, bordersize, bordersize)

}());
