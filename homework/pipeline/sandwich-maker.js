
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
        lightPosition2,
        lightDiffuse,
        lightSpecular,


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
        
        
        // Interaction Variables
        defaultJellyColor = { r: 1.0, g: 1.0, b: 1.0 },
        finalJellyColor = {},
        lR,
        lG,
        lB,
        rR,
        rG,
        rB,
        confirmL = false,
        confirmR = false,
        oneClickL = 0,
        oneClickR = 0;
        
        
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
    
    leftJelly = {
        name: "Left Jelly", 
        color: defaultJellyColor,
        translate: {x: 0.0, y: 0.0, z: -6.0},
        scale: {x: 1, y: 1, z: 0.25},
        vertices: Shapes.toRawTriangleArray(Shapes.jelly()),
        mode: gl.TRIANGLES,
        specularColor: { r: 1.0, g: 1.0, b: 0.0 },
        shininess: 16,
        normals: Shapes.toVertexNormalArray(Shapes.jelly())
    },

    
     rightJelly = {
        name: "Right Jelly", 
        color: defaultJellyColor,
        translate: {x: 0.0, y: 0.0, z: -4.0},
        scale: {x: 1, y: 1, z: 0.25},
        vertices: Shapes.toRawTriangleArray(Shapes.jelly()),
        mode: gl.TRIANGLES,
        specularColor: { r: 1.0, g: 1.0, b: 0.0 },
        shininess: 16,
        normals: Shapes.toVertexNormalArray(Shapes.jelly())
     }, 
            
     leftCrust = {
        name: "Left Crust", 
        color: { r: 0.825, g: 0.52, b: 0.22 },
        vertices: Shapes.toRawTriangleArray(Shapes.crust()),
        mode: gl.TRIANGLES,
        specularColor: { r: 1.0, g: 0.0, b: 1.0 },
        shininess: 1,
        normals: Shapes.toVertexNormalArray(Shapes.crust())
     },
    
     rightCrust = {
        name: "Right Crust", 
        color: { r: 0.825, g: 0.52, b: 0.22 },
        vertices: Shapes.toRawTriangleArray(Shapes.crust()),
        mode: gl.TRIANGLES,
        specularColor: { r: 1.0, g: 0.0, b: 1.0 },
        shininess: 1,
        normals: Shapes.toVertexNormalArray(Shapes.crust())
     },
     
     leftBread = {
        name: "Left Bread",
        color: { r: 0.99, g: 0.92, b: 0.57 },
        scale: {x: 1, y: 1, z: 1},
        translate: {x: -30.0, y: 0.0, z: 0.0},
        vertices: Shapes.toRawTriangleArray(Shapes.bread()),
        mode: gl.TRIANGLES,
        normals: Shapes.toVertexNormalArray(Shapes.bread()),
        specularColor: { r: 1.0, g: 1.0, b: 1.0 },
        shininess: 1,
        subshapes: [leftCrust, leftJelly]
     },
     
     rightBread = {
        name: "Right Bread",
        color: { r: 0.99, g: 0.92, b: 0.57 },
        scale: {x: 1, y: 1, z: 1},
        translate: {x: 30.0, y: 0.0, z: 0.0},
        vertices: Shapes.toRawTriangleArray(Shapes.bread()),
        mode: gl.TRIANGLES,
        normals: Shapes.toVertexNormalArray(Shapes.bread()),
        specularColor: { r: 1.0, g: 1.0, b: 1.0 },
        shininess: 1,
        subshapes: [rightCrust, rightJelly]
     },
     
     
     
    
    
    // Build the objects to display.
    objectsToDraw = [leftBread, rightBread];



/*~*~*~*~*~*~**~*~*~*~*~*~*~*~* Retrieve Shape Information ~*~*~*~*~*~**~*~*~*~*~*~*~*~**/
   
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
            
            if (!objectArray[i].colors ) {
                objectArray[i].colors = [];
                for (j = 0, maxj = objectArray[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectArray[i].colors = objectArray[i].colors.concat(
                        objectArray[i].color.r,
                        objectArray[i].color.g,
                        objectArray[i].color.b
                    );
                }
            } else if (!(objectArray[i].colors[0] === objectArray[i].color)){
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
                    
            // Same trick with specular colors.
            if (!objectArray[i].specularColors) {
                // Future refactor: helper function to convert a single value or
                // array into an array of copies of itself.
                objectArray[i].specularColors = [];
                for (j = 0, maxj = objectArray[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectArray[i].specularColors = objectArray[i].specularColors.concat(
                        objectArray[i].specularColor.r,
                        objectArray[i].specularColor.g,
                        objectArray[i].specularColor.b
                    );
                }
            }
            objectArray[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectArray[i].specularColors);
                    
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
    vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);
    
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");

    modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    lookAtMatrix = gl.getUniformLocation(shaderProgram, "lookAtMatrix");


    // Note the additional variables.
    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightPosition2 = gl.getUniformLocation(shaderProgram, "lightPosition2");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    shininess = gl.getUniformLocation(shaderProgram, "shininess");;



   







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
        mt = object.translate ? mt.translate(object.translate.x, object.translate.y, object.translate.z) : mt.translate(0, 0, 0);
        mr = object.rotate ? mr.rotate(object.rotate.angle, object.rotate.x, object.rotate.y, object.rotate.z): mr;
        mi = mt.multiply(mr).multiply(ms);

        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(mi.toWebGLMatrix().returnMatrix()));
        
        return mi;
        
    }



    /*
     * Displays an individual object and extracts its subshapes to be drawn.
     */
    drawObject = function (object, parentmi) {
        var i,
            currentInstanceMatrix;       

        
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
        gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

        // Set the shininess.
        gl.uniform1f(shininess, object.shininess);


        currentInstanceMatrix = getInstanceTransform(object);
        
        if(parentmi){
            currentInstanceMatrix = currentInstanceMatrix.multiply(parentmi);
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
            drawObject(objectsToDraw[i]);
        }
        
        // All done.
        gl.flush();
        
    };







/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Scene Creation  ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
    //Set up projection matrix.
    var m = new Matrix4x4();
        mc = new Matrix4x4(); 
    
    m = m.ortho(-50, 50, -50, 50, -100, 100);
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array( 
        m.toWebGLMatrix().returnMatrix()));


    // Set up our one light source and its colors.
    gl.uniform4fv(lightPosition, [20.0, 100.0, -100.0, 1.0]);
    gl.uniform4fv(lightPosition2, [-20.0, -400.0, 40.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 0.0]);

    
        
    // Draw the initial scene.
    drawScene();















/* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Interactive Functions  ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
    
    $("#left-color-picker").spectrum({
        color: "#fff",
        showInput: true,
        change: function(color){
            if(!confirmL){
                leftJelly.color = color;
                leftJelly.color = leftJelly.color.toRgb();   
                lR = leftJelly.color.r/200;
                lG = leftJelly.color.g/200;
                lB = leftJelly.color.b/200;
                leftJelly.color = {r:lR, g:lG, b:lB};
                getVertices(objectsToDraw);
                drawScene();
            } else {
                $("#dynamic-instructions")("Sorry, you have already confirmed your left color choice.")
            }
        }
    });
    
    
    $("#right-color-picker").spectrum({
        color: "#fff",
        showInput: true,
        change: function(color){
            if(!confirmR){
                rightJelly.color = color;
                rightJelly.color = rightJelly.color.toRgb();   
                rR = rightJelly.color.r/200;
                rG = rightJelly.color.g/200;
                rB = rightJelly.color.b/200;
                rightJelly.color = {r:rR, g:rG, b:rB};
                getVertices(objectsToDraw);
                drawScene();
            } else {
                $("#dynamic-instructions").text("Sorry, you have already confirmed your right color choice")
            }
            
            
        }
    });
    
    $("#left-slice-confirm").click(function (){
         confirmL = true;
         oneClickL++;
        if( oneClickL === 1){
            $("#left-color-picker").spectrum("disable");
            $("#dynamic-instructions").text("Left Slice confirmed");
            leftBread.translate = {x: -3.0, y: 0.0, z: 0.0},
            leftBread.rotate = {angle: 280, x: 0, y: 1, z:0};
            drawScene();
            checkState();
        }
    });
    
    $("#right-slice-confirm").click(function (){
         confirmR = true;
         oneClickR++;
        if( oneClickR === 1){

            $("#right-color-picker").spectrum("disable");
            $("#dynamic-instructions").text("Right Slice confirmed");
            /*
            rightBread.keyframe.activeAnim = true;
                        while(rightBread.keyframe.currentTweenFrame != rightBread.keyframe.end){
                            KeyframeTweener.applyTween(objectsToDraw);
                            getVertices(objectsToDraw);
                            
                        }*/
            
            
            rightBread.translate = {x: 3.0, y: 0.0, z: 0.0},
            rightBread.rotate = {angle: 80, x: 0, y: 1, z:0};
            
            drawScene();
            
            checkState();
        }
    });
    
    

              
    
    $("#left-slice-cancel").click(function (){
         confirmL = false;
         oneClickL = 0;
        if(!confirmL){
            $("#left-color-picker").spectrum("enable");
            leftBread.translate = {x: -30.0, y: 0.0, z: 0.0},
            leftBread.rotate = {angle: 0, x: 0, y: 1, z:0};
            checkState();
            drawScene();
        } else {
            alert("AHHH ERROR WTF");
        }
    });
    
    $("#right-slice-cancel").click(function (){
         confirmR = false;
         oneClickR = 0;
        if(!confirmR){

            $("#right-color-picker").spectrum("enable");
            rightBread.translate = {x: 30.0, y: 0.0, z: 0.0},
            rightBread.rotate = {angle: 0.0, x: 0, y: 1, z:0};
            checkState();
            drawScene();
        } else {
            alert("AHHH ERROR WTF");
        }
    });
    
    
   checkState = function (){
       if(confirmL && confirmR){
            $("#make-button").append('<img id ="make-btn" src ="images/MAKE-A.png" />');
            $("#make-btn").hover(function () {
                console.log("hovering");
                 
             });
            assignMake();
       } else{
           $("#make-btn").remove();
       }
       
   }
   
   assignMake = function(){
       
       $("#make-button").click(function(){
           var fR = (leftJelly.color.r + rightJelly.color.r) /2
               fG = (leftJelly.color.g + rightJelly.color.g) /2
               fB = (leftJelly.color.b + rightJelly.color.b) /2
           finalJellyColor = {r: fR, g:fG, b:fB};
           
           $("#left").remove();
           $("#right").remove();
           
           finalBread = {
                name: "Final Bread",
                color: { r: 0.99, g: 0.92, b: 0.57 },
                scale: {x: 2, y: 2, z: 2},
                translate: {x: 0.0, y: 0.0, z: 0.0},
                vertices: Shapes.toRawTriangleArray(Shapes.bread()),
                mode: gl.TRIANGLES,
                normals: Shapes.toVertexNormalArray(Shapes.bread()),
                specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                shininess: 2,
                subshapes: [{
                    name: "Final Crust", 
                    color: { r: 0.825, g: 0.52, b: 0.22 },
                    vertices: Shapes.toRawTriangleArray(Shapes.crust()),
                    mode: gl.TRIANGLES,
                    specularColor: { r: 1.0, g: 0.0, b: 1.0 },
                    shininess: 3,
                    normals: Shapes.toVertexNormalArray(Shapes.crust())
               }]
           },
           
           objectsToDraw = [finalBread];
           getVertices(objectsToDraw);
           drawScene();
           
           
           $(canvas).click(function(){
               console.log("clicked");
           var jellyDrip = {
                color: finalJellyColor,
                scale: {x: 0.25, y: 0.5, z: 0.5},
                translate: {x: randomSigned(-10, 10), y:randomSigned(-40, -25), z:randomSigned(-5, -4)},
                vertices: Shapes.toRawTriangleArray(Shapes.drip()),
                mode: gl.TRIANGLES,
                normals: Shapes.toVertexNormalArray(Shapes.drip()),
                specularColor: { r: 1.0, g: 1.0, b: 1.0 },
                shininess: 15,
              }
            
            console.log(jellyDrip.translate);
           
           objectsToDraw.push(jellyDrip); 
           
           getVertices(objectsToDraw);
           drawScene();
           
           
           
           
       });
                      
       });
       
       
   }
   
   
   randomSigned = function(llimit, ulimit){
       var diff = ulimit - llimit;
           result = Math.floor((Math.random() * (diff + 1) + llimit));       
       return result;
   }

    












}(document.getElementById("sandwich")));
