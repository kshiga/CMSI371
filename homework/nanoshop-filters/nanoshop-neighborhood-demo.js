/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient;

    // Some edge lines to test for wraparound bleeding.
        height = canvas.height,
        renderingContext = canvas.getContext("2d"),
        width = canvas.width;

    renderingContext.fillStyle="rgb(91, 139, 142)";
    renderingContext.fillRect(0, 0, width, (height/3));


    renderingContext.fillStyle="rgb(250, 178, 83)";
    renderingContext.beginPath();
    renderingContext.arc(256, (height/3),100,0,Math.PI,true); 
    renderingContext.fill();

    renderingContext.fillStyle="rgb(36, 112, 34)";
    renderingContext.fillRect(0, (height/3), width, (2*(height/3)+1));


    renderingContext.strokeStyle = "yellow";
    renderingContext.beginPath();
    renderingContext.moveTo(0, 0);
    renderingContext.lineTo(canvas.width - 1, 0);
    renderingContext.stroke();

    renderingContext.strokeStyle = "cyan";
    renderingContext.beginPath();
    renderingContext.moveTo(0, canvas.height - 1);
    renderingContext.lineTo(canvas.width - 1, canvas.height - 1);
    renderingContext.stroke();

    renderingContext.strokeStyle = "green";
    renderingContext.beginPath();
    renderingContext.moveTo(0, 0);
    renderingContext.lineTo(0, canvas.height - 1);
    renderingContext.stroke();

    renderingContext.strokeStyle = "red";
    renderingContext.beginPath();
    renderingContext.moveTo(canvas.width - 1, 0);
    renderingContext.lineTo(canvas.width - 1, canvas.height / 2);
    renderingContext.stroke();

    renderingContext.strokeStyle = "blue";
    renderingContext.beginPath();
    renderingContext.moveTo(canvas.width - 1, canvas.height / 2);
    renderingContext.lineTo(canvas.width - 1, canvas.height - 1);
    renderingContext.stroke();

    // Adapted from original code by Tyler Nichols.
    gradient = renderingContext.createRadialGradient(120, 120, 15, 120, 120, 75);
    gradient.addColorStop(0, "rgb(255, 102, 102)");
    gradient.addColorStop(1, "red");

    // Draw the sphere with a radial gradient.
    renderingContext.beginPath();
    renderingContext.fillStyle = gradient;
    renderingContext.arc(150, 150, 75, 0, 2 * Math.PI, true);
    renderingContext.shadowColor = "gray";
    renderingContext.shadowBlur = 20;
    renderingContext.shadowOffsetX = 10;
    renderingContext.shadowOffsetY = 15;
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the top of the cube.
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(140, 140, 140)";
    renderingContext.moveTo(300, 300);
    renderingContext.lineTo(335, 265);
    renderingContext.lineTo(435, 265);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(300, 300);
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the face of the cube.
    renderingContext.fillStyle = "rgb(110, 110, 110)";
    renderingContext.fillRect(300, 300, 100, 100);

    // Draw the right side of the cube.
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(79, 79, 79)";
    renderingContext.moveTo(435, 265);
    renderingContext.lineTo(435, 355);
    renderingContext.lineTo(400, 400);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(435, 265);
    renderingContext.fill();
    renderingContext.closePath();

    // (end of adapted code by Tyler Nichols)

    $("#darken-filter-button").click(function () {
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.darken
            ),
            0, 0
        );

    });

    $("#bAndw-filter-button").click(function () {
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.bAndw
            ),
            0, 0
        );

    });

    $("#invert-filter-button").click(function () {
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.invert
            ),
            0, 0
        );

    });

    // Set a little event handler to apply the filter.
    $("#darkenN-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilterN(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.darkener
            ),
            0, 0
        );
    });

    $("#average-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilterN(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.averager 
            ),
            0, 0
        );
    });

    $("#noise-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilterN(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.noise 
            ),
            0, 0
        );
    });


    $("#vBlur-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilterN(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.vBlur 
            ),
            0, 0
        );
    });


    $("#dBlur-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilterN(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.dBlur 
            ),
            0, 0
        );
    });

}());
