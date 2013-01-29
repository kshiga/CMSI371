/*
* A simple sunset scene, with a reddish sun setting into a green horizon under a gray-blue sky
* Assigment 0129
* CMSI371
*/

(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        height = canvas.height,
        width = canvas.width;

    renderingContext.fillStyle="rgb(91, 139, 142)";
    renderingContext.fillRect(0, 0, width, (height/3));


    renderingContext.fillStyle="rgb(250, 178, 83)";
    renderingContext.beginPath();
    renderingContext.arc(256, (height/3),100,0,Math.PI,true); 
    renderingContext.fill();

    renderingContext.fillStyle="rgb(36, 112, 34)";
    renderingContext.fillRect(0, (height/3), width, (2*(height/3)+1));

}());
