/*
 *Problem 25e. A solid, brown hexagon
 *Assignment 0129 
 *CMSI371 
 *Spring 2013
 */

(function () {
    var canvas = document.getElementById("canvas"),
        hex = canvas.getContext("2d");

        hex.fillStyle = "brown";

        hex.beginPath();
        hex.moveTo(100, 100);
        hex.lineTo(200, 100);
        hex.lineTo(250, 175);
        hex.lineTo(200, 250);
        hex.lineTo(100, 250);
        hex.lineTo(50, 175);
        hex.fill();

}());

