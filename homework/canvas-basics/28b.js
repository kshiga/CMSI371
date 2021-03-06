/*
* A similar sunset scene as part (a), but with the sun setting into a dark blue “ocean” horizon and with a partial reflection showing on the ocean surface
* Assigment 0129
* CMSI371
*/

(function () {
    var canvas = document.getElementById("canvas"),
        height = canvas.height,
        renderingContext = canvas.getContext("2d"),
        width = canvas.width;

        // JD: Avoid just tacking numbers on to variable names as
        //     much as possible!  In the end, they do not add useful
        //     information.
        //
        //     In this particular case, things are doubly deceiving
        //     *because you don't even use radialGradient1* !!!
        radialGradient1 = renderingContext.createRadialGradient(256, 160, 1, 180, 180, 320);
        radialGradient2 = renderingContext.createRadialGradient(256, 150, 1, 300, 150, 160);

    radialGradient1.addColorStop(0, "rgb(250, 178, 83)");
    radialGradient1.addColorStop(1, "rgb(50, 80, 115)");
    radialGradient2.addColorStop(0, "rgba(250, 178, 83, 0.80)");
    radialGradient2.addColorStop(1, "rgb(50, 80, 115)");

    renderingContext.fillStyle="rgb(91, 139, 142)";
    renderingContext.fillRect(0, 0, width, (height/3));


    renderingContext.fillStyle="rgb(250, 178, 83)";
    renderingContext.beginPath();
    renderingContext.arc(300, (height/3),120,0,Math.PI,true); 
    renderingContext.fill();

    renderingContext.fillStyle=radialGradient2;
    renderingContext.fillRect(0, (height/3), width, (2*(height/3)+1));

}());
