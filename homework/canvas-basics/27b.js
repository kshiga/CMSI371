/*
* A “fake 3D” solid cube, with its three visible faces colored in varying shades of gray, at the top center of the canvas
* Assigment 0129
* CMSI371
*/
// JD: Similar comments here to 27a.js.
(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        height = canvas.height,
        width = canvas.width;

    // JD: Nice use of translate here.
    renderingContext.translate(150, -300);
    renderingContext.fillStyle = "rgb(128, 128, 128)";

    renderingContext.beginPath();
    renderingContext.moveTo(40, 350); //1
    renderingContext.lineTo(100, 325); //2
    renderingContext.lineTo(160, 350); //3
    renderingContext.lineTo(100, 390); //4
    renderingContext.moveTo(40, 350); //1
    renderingContext.fill();           
  
    renderingContext.fillStyle = "rgb(64, 64, 64)";
    renderingContext.beginPath();
    renderingContext.lineTo(40, 350);  //1
    renderingContext.lineTo(40, 425);  //5
    renderingContext.lineTo(100, 467); //6
    renderingContext.lineTo(100, 390); //4
    renderingContext.lineTo(40, 350);  //1
    renderingContext.fill();           

    renderingContext.fillStyle = "rgb(192, 192, 192)";
    renderingContext.beginPath();
    renderingContext.lineTo(100, 467); //6
    renderingContext.lineTo(160, 425); //7
    renderingContext.lineTo(160, 350); //3
    renderingContext.lineTo(100, 390); //4
    renderingContext.lineTo(100, 467); //6
    renderingContext.fill();             



}());
