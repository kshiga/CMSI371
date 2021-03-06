
(function (canvas) {


/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Variables Set-up ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */

    var gl, // The WebGL context.

        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,

        modelViewMatrix,
        projectionMatrix,
        vertexPosition,
        vertexColor,

        // An individual "draw object" function.
        getVerticies,
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,
        ms,
        mt,
        mr,
        mi,
        // Grab the WebGL rendering context.
        gl = GLSLUtilities.getGL(canvas);


/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Canvas Set-up ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */


    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);















/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Objects Set-up ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
    // Build the objects to display.
    objectsToDraw = [
        {
            color: { r: 0.5, g: 0.0, b: 0.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
            mode: gl.TRIANGLES
        },
    ];



/*~*~*~*~*~*~**~*~*~*~*~*~*~*~* Retrieve Verticies ~*~*~*~*~*~**~*~*~*~*~*~*~*~**/

    // Pass the vertices to WebGL.
   getVerticies = function(objectArray){
        for (i = 0, maxi = objectArray.length; i < maxi; i += 1) {
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectArray[i].vertices);

            if (!objectArray[i].colors) {
                objectsToDraw[i].colors = [];
                for (j = 0, maxj = objectArray[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectArray[i].colors.concat(
                        objectArray[i].color.r,
                        objectArray[i].color.g,
                        objectArray[i].color.b
                    );
                }
            }
            objectArray[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectArray[i].colors);
        }
        console.log("got verticies");
    }

    getVerticies(objectsToDraw);






/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Shader Set-up ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }








/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Shader Program Initialization ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");

    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");













/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Drawing Functions ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
    /*
     * Displays an individual object and extracts its subshapes to be drawn.
     */
    drawObject = function (object) {
        if(object.subshapes){
            getVerticies(object.subshapes);
        }
        objectsToDraw.concat(object.subshapes);
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        ms = object.scale ? scale(object.scale.x, object.scale.y, object.scale.z).toWebGLMatrix().returnMatrix() : scale(1, 1, 1).toWebGLMatrix().returnMatrix();
        mt = object.translate ? translate(object.translate.x, object.translate.y, object.translate.z).toWebGLMatrix().returnMatrix() : translate(0, 0, 0).toWebGLMatrix().returnMatrix();
        mr = object.axis ? rotate(currentRotation, object.axis.x, object.axis.y, object.axis.z).toWebGLMatrix().returnMatrix() : getAMatrix().toWebGLMatrix().returnMatrix();
        mi = ms.multiply(mt).multiply(mr);

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(mi));


        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };







/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Scene Creation  ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
    //Set up projection matrix.
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array( frustum(-20, 20, -20, 20, 5, 200) ) );

    // Draw the initial scene.
    drawScene();






/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* jQuery Integration Set-up ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });



}(document.getElementById("sandwich")));
