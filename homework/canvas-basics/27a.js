/*
* A “fake 3D” green wireframe cube at the bottom right of the canvas
* Assigment 0129
* CMSI371
*/

(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        height = canvas.height,
        width = canvas.width;


    renderingContext.strokeStyle = "rgb(0, 252, 17)";

    renderingContext.beginPath();
    // JD: The hardcoding is understandable here, but still
    //     avoidable for certain values of the "cube."
    //     (as can be seen with the numbers that you placed
    //     in your comments)
    renderingContext.moveTo(40, 350); //1
    renderingContext.lineTo(100, 325); //2
    renderingContext.lineTo(160, 350); //3
    renderingContext.lineTo(100, 390); //4
    renderingContext.lineTo(40, 350);  //1
    renderingContext.lineTo(40, 425);  //5
    renderingContext.lineTo(100, 475); //6
    renderingContext.lineTo(100, 390); //4
    renderingContext.lineTo(100, 475); //6
    renderingContext.lineTo(160, 425); //7
    renderingContext.lineTo(160, 350); //3
    renderingContext.stroke();             



}());
