// Interactive Variables
        var leftJellyColor,
            rightJellyColor,
            confirmL = false,
            confirmR = false,
            oneClickL = 0,
            oneClickR = 0;
        



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
        rotationMatrix,
        vertexPosition,
        vertexColor,
        vertexDiffuseColor,
        vertexSpecularColor,
        shininess,
        
        normalVector,
        lightPosition,
        lightDiffuse,


        // An individual "draw object" function.
        getVertices,
        drawObject,

        // The big "draw scene" function.
        drawScene,



        
           
        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,
        k,
        maxk,
        
        // Matrix variables 
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
            name: "bread",
            color: { r: 0.5, g: 1.0, b: 0.0 },
            scale: {x: 2, y: 2, z: 2},
            translate: {x: 0.0, y: 0.0, z: 0.0},
            vertices: Shapes.toRawTriangleArray(Shapes.bread()),
            mode: gl.TRIANGLES,
            normals: Shapes.toVertexNormalArray(Shapes.bread()),
            subshapes: [
               {
                    name: "crust subshape", 
                    color: { r: 0.0, g: 1.0, b: 1.0 },
                    vertices: Shapes.toRawTriangleArray(Shapes.crust()),
                    mode: gl.TRIANGLES,
                    normals: Shapes.toVertexNormalArray(Shapes.crust())
                },
                {
                    name: "jelly subshape", 
                    color: { r: 1.0, g: 0.0, b: 0.8 },
                    translate: {x: 4.0, y: 0.0, z: -5.0},
                    vertices: Shapes.toRawTriangleArray(Shapes.jelly()),
                    mode: gl.TRIANGLES,
                    normals: Shapes.toVertexNormalArray(Shapes.jelly())
                }
            ]
        },        
        
       /* {
            name: "bread2",
            color: { r: 1.0, g: 0.1, b: 0.0 },
            scale: {x: 5, y: 5, z: 1},
            translate: {x: 10.0, y: -50.0, z: 1.0},
            vertices: Shapes.toRawTriangleArray(Shapes.bread()),
            mode: gl.TRIANGLES,
            normals: Shapes.toVertexNormalArray(Shapes.bread()),
            subshapes: [
               {
                    name: "bread2 subshape", 
                    color: { r: 0.9, g: 0.2, b: 0.5 },
                    scale: {x: 1, y: 2, z: 4},
                    translate: {x: 0.0, y: 0.0, z: -5.0},
                    vertices: Shapes.toRawTriangleArray(Shapes.bread()),
                    mode: gl.TRIANGLES,
                    normals: Shapes.toVertexNormalArray(Shapes.bread())
                }
            ]
        }*/
    
        
        /*
        {
            name: "leftSlice",
            color: crustColor,
            vertices: Shapes.toRawTriangleArray(Shapes.crust()),
            mode: gl.TRIANGLES,
            normals: Shapes.toNormalArray(Shapes.crust()),
            subshapes: [
                {
                    name: "leftBread",
                    color: breadColor, 
                    vertices: Shapes.toRawTriangleArray(Shapes.bread()),
                    mode:gl.TRIANGLES
                    normals: Shapes.toNormalArray(Shapes.bread()),
                },
                {
                    name: "leftJelly",
                    color: leftJellyColor, 
                    vertices: Shapes.toRawTriangleArray(Shapes.jelly()),
                    mode:gl.TRIANGLES
                    normals: Shapes.toNormalArray(Shapes.jelly()),
                    specularColors: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                }
            ]
            
        },        
        {
            name: "rightSlice",
            color: crustColor,
            vertices: Shapes.toRawTriangleArray(Shapes.crust()),
            mode: gl.TRIANGLES,
            normals: Shapes.toNormalArray(Shapes.crust()),
            subshapes: [
                {
                    name: "rightBread",
                    color: breadColor, 
                    vertices: Shapes.toRawTriangleArray(Shapes.bread()),
                    mode:gl.TRIANGLES
                    normals: Shapes.toNormalArray(Shapes.bread()),
                },
                {
                    name: "rightJelly",
                    color: rightJellyColor, 
                    vertices: Shapes.toRawTriangleArray(Shapes.jelly()),
                    mode:gl.TRIANGLES
                    normals: Shapes.toNormalArray(Shapes.jelly()),
                    specularColors: { r: 1.0, g: 1.0, b: 1.0 },
                    shininess: 16,
                }
            ]
            
        },
        {
            name: "background",
            color: { r: 0.5, g: 0.0, b: 0.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.background()),
            mode: gl.TRIANGLES
        },
        */
    ];



/*~*~*~*~*~*~**~*~*~*~*~*~*~*~* Retrieve Vertices ~*~*~*~*~*~**~*~*~*~*~*~*~*~**/

    // Pass the vertices to WebGL.
   getVertices = function(objectArray){
        var i,
            maxi,
            j,
            maxj,
            k,
            maxk;
            
        for (i = 0, maxi = objectArray.length; i < maxi; i += 1) {
            objectArray[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectArray[i].vertices);
            
            if (!objectArray[i].colors) {
                objectArray[i].colors = [];
                for (j = 0, maxj = objectArray[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectArray[i].colors = objectArray[i].colors.concat(
                        objectArray[i].color.r,
                        objectArray[i].color.g,
                        objectArray[i].color.b
                    );
                }
            }
            
            objectArray[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectArray[i].colors);
                    
            objectArray[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                objectArray[i].normals);
                    
            if(objectArray[i].subshapes){
                for(k = 0, maxk = objectArray[i].subshapes.length; k < maxk; k+=1){
                    getVertices(objectArray[i].subshapes);
                }
            } 
             
        }
        
        
        
    }
    
    //get all the vertices before anything else  
    getVertices(objectsToDraw);
  







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
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);
    
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");

    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    lookAtMatrix = gl.getUniformLocation(shaderProgram, "lookAtMatrix");


    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");



   







/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Drawing Functions ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */

    /*
     * Helper function that returns an object's instance transform matrix.
     */
    
    getInstanceTransform = function(object){
        var ms = new Matrix4x4();
            mt = new Matrix4x4();
            mr = new Matrix4x4();
            mi = new Matrix4x4();
        
        
        ms = object.scale ?  ms.scale(object.scale.x, object.scale.y, object.scale.z): ms.scale(1, 1, 1);
        console.log("\""+ object.name +"\" " + "Scale Matrix: \n" + ms.toString());
        mt = object.translate ? mt.translate(object.translate.x, object.translate.y, object.translate.z) : mt.translate(0, 0, 0);
        console.log("\""+ object.name +"\" " + "Translate Matrix: \n" + mt.toString());
        mr = object.rotate ? mr.rotate(currentRotation, object.rotate.x, object.rotate.y, object.rotate.z): mr;
        console.log("\""+ object.name +"\" " + "Rotate Matrix: \n" + mr.toString());
        mi = mt.multiply(mr).multiply(ms);
        console.log("\""+ object.name +"\" " + "Instance Matrix: \n" + mi.toString());

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(mi.toWebGLMatrix().returnMatrix()));
        
        return mi;
        
    }



    /*
     * Displays an individual object and extracts its subshapes to be drawn.
     */
    drawObject = function (object, parentmi) {
        var i,
            currentInstanceMatrix;       
 
        console.log(object);
        
       
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);
       
       
       currentInstanceMatrix = getInstanceTransform(object);
       
       if(parentmi){
           currentInstanceMatrix = currentInstanceMatrix.multiply(parentmi);
           console.log("Subshape NEW Instance Matrix:\n" + currentInstanceMatrix.toString());
           gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(currentInstanceMatrix.toWebGLMatrix().returnMatrix()));
       }
       
       
       // Set the varying normal vectors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

        
       
        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
        
        if(object.subshapes){            
            for(i = 0; i < object.subshapes.length; i++){
                drawObject(object.subshapes[i], currentInstanceMatrix);
            }            
        }
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        var m = new Matrix4x4
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
         gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(m.rotate(currentRotation, 0, 1, 0).toWebGLMatrix().returnMatrix()));


        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            console.log("\n *~*~*~*~*~*~*~*~*~*~*~* Drawing \"" + objectsToDraw[i].name + "\" *~*~*~*~*~*~*~*~*~*~*~*~*~*~\n");
            drawObject(objectsToDraw[i]);
            console.log("\n *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~\n");

        }
        
         
        

        // All done.
        gl.flush();
        
        console.log("Scene has been drawn.");
    };







/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Scene Creation  ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
    //Set up projection matrix.
    var m = new Matrix4x4();
        mc = new Matrix4x4(); 
    
    m = m.ortho(-100, 100, -100, 100, -100, 100);
    //mc = mc.lookAt(1, 0, 0, 0, 0, 0, 0, 1, 0);
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array( 
        m.toWebGLMatrix().returnMatrix()));
    //gl.uniformMatrix4fv(lookAtMatrix, gl.FALSE, new Float32Array( 
      //  mc.toWebGLMatrix().returnMatrix()));    

     // Set up our one light source and color.  Note the uniform3fv function.
    gl.uniform3fv(lightPosition, [0.0, 10.0, -100.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);

    
        
    // Draw the initial scene.
    drawScene();

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
