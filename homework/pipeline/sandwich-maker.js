( function(canvas) {
        /* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Variables ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
        var gl, // The WebGL context.

        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0, 
        currentInterval,

        // Transform matrices
        modelViewMatrix, 
        projectionMatrix,

        // Color & Lighting
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

        // Texture Variables
        textureCoordAttribute, 
        samplerUniform,

        // An individual "draw object" function.
        setTransformDefaults, 
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
        defaultJellyColor = {
            r : 1.0,
            g : 1.0,
            b : 1.0
        }, 
        finalJellyColor = {}, 
        lR, 
        lG, 
        lB, 
        rR, 
        rG, 
        rB, 
        confirmL = false, 
        confirmR = false, 
        cubeTexture, 
        cubeVerticesTextureCoordBuffer, 
        gl = GLSLUtilities.getGL(canvas);

        /* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Canvas Set-up ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
        if (!gl) {
            alert("No WebGL context found...sorry.");
            // No WebGL, no use going on...
            return;
        }

        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);

        gl.viewport(0, 0, canvas.width, canvas.height);

        /* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Objects Set-up ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
        leftJelly = {
            name : "Left Jelly",
            color : defaultJellyColor,
            translate : {
                x : 0.0,
                y : 0.0,
                z : -6.0
            },
            scale : {
                x : 1.0,
                y : 1.0,
                z : 0.25
            },
            vertices : Shapes.toRawTriangleArray(Shapes.jelly()),
            mode : gl.TRIANGLES,
            specularColor : {
                r : 1.0,
                g : 1.0,
                b : 0.0
            },
            shininess : 16,
            normals : Shapes.toVertexNormalArray(Shapes.jelly())
        };

        rightJelly = {
            name : "Right Jelly",
            color : defaultJellyColor,
            translate : {
                x : 0.0,
                y : 0.0,
                z : -6.0
            },
            scale : {
                x : 1.0,
                y : 1.0,
                z : 0.25
            },
            vertices : Shapes.toRawTriangleArray(Shapes.jelly()),
            mode : gl.TRIANGLES,
            specularColor : {
                r : 1.0,
                g : 1.0,
                b : 0.0
            },
            shininess : 16,
            normals : Shapes.toVertexNormalArray(Shapes.jelly())
        };

        leftCrust = {
            name : "Left Crust",
            color : {
                r : 0.825,
                g : 0.52,
                b : 0.22
            },
            vertices : Shapes.toRawTriangleArray(Shapes.crust()),
            mode : gl.TRIANGLES,
            specularColor : {
                r : 1.0,
                g : 0.0,
                b : 1.0
            },
            shininess : 1,
            normals : Shapes.toVertexNormalArray(Shapes.crust())
        };

        rightCrust = {
            name : "Right Crust",
            color : {
                r : 0.825,
                g : 0.52,
                b : 0.22
            },
            vertices : Shapes.toRawTriangleArray(Shapes.crust()),
            mode : gl.TRIANGLES,
            specularColor : {
                r : 1.0,
                g : 0.0,
                b : 1.0
            },
            shininess : 1,
            normals : Shapes.toVertexNormalArray(Shapes.crust())
        }; // JD: Watch your syntax!  You had a comma here but these assignments
           //     were no longer in a var block.

        leftBread = {
            name : "Left Bread",
            color : {
                r : 0.99,
                g : 0.92,
                b : 0.57
            },
            scale : {
                x : 1.0,
                y : 1.0,
                z : 1.0
            },
            translate : {
                x : -30.0,
                y : 0.0,
                z : 0.0
            },
            vertices : Shapes.toRawTriangleArray(Shapes.bread()),
            mode : gl.TRIANGLES,
            normals : Shapes.toVertexNormalArray(Shapes.bread()),
            specularColor : {
                r : 1.0,
                g : 1.0,
                b : 1.0
            },
            shininess : 1,
            subshapes : [leftCrust, leftJelly]
        };

        rightBread = {
            name : "Right Bread",
            color : {
                r : 0.99,
                g : 0.92,
                b : 0.57
            },
            scale : {
                x : 1.0,
                y : 1.0,
                z : 1.0
            },
            translate : {
                x : 30.0,
                y : 0.0,
                z : 0.0
            },
            vertices : Shapes.toRawTriangleArray(Shapes.bread()),
            mode : gl.TRIANGLES,
            normals : Shapes.toVertexNormalArray(Shapes.bread()),
            specularColor : {
                r : 1.0,
                g : 1.0,
                b : 1.0
            },
            shininess : 1,
            subshapes : [rightCrust, rightJelly]
        };

        cubeTexture = gl.createTexture();

        cubeVerticesTextureCoordBuffer = gl.createBuffer();
        background = {
            name : "background",
            color : {
                r : 0.0,
                g : 1.0,
                b : 1.0
            },
            translate : {
                x : 0.0,
                y : 0.0,
                // JD: The original value of z = -130.0 occluded the bread
                //     because the cube was not "open."
                z : 150.0
            },
            scale : {
                x : 70,
                y : 65,
                z : 100
            },
            rotate : {
                angle : 0,
                x : 0.2,
                y : 0.8,
                z : 0.0
            },
            vertices : Shapes.toRawTriangleArray(Shapes.cube()),
            mode : gl.TRIANGLES,
            normals : Shapes.toNormalArray(Shapes.cube()),
            texture : cubeTexture,
            textureSpec : {
                coords : Shapes.cube().textureCoords,
                imgsrc : "images/grid.png",
                buffer : cubeVerticesTextureCoordBuffer,
                itemSize : 2,
                numItems : 24
            }
        };

        // Build the objects to display.
        // JD: leftBread was missing from here; why?
        objectsToDraw = [leftBread, rightBread, background];

        /*~*~*~*~*~*~**~*~*~*~*~*~*~*~* Retrieve Shape Information ~*~*~*~*~*~**~*~*~*~*~*~*~*~**/
        /*
         * Helper function to set default values
         */
        setTransformDefaults = function(object) {
            object.translate = object.translate || {
                x : 0.0,
                y : 0.0,
                z : 0.0
            };
            object.scale = object.scale || {
                x : 1.0,
                y : 1.0,
                z : 1.0
            };
            object.rotate = object.rotate || {
                angle : 0.0,
                x : 0.0,
                y : 1.0,
                z : 0.0
            };
            object.color = object.color || {
                r : 1.0,
                g : 1.0,
                b : 1.0
            };
            object.specularColor = object.specularColor || {
                r : 1.0,
                g : 1.0,
                b : 1.0
            };
            object.shininess = object.shininess || 1;
            object.activeAnim = object.activeAnim || false;
        };

        /*
           JD: You committed one major last-minute oversight in this final version.
               Although you successfully implemented texture mapping for one of the
               objects, you did not accommodate the fact that *the other objects*
               did not have a texture assigned to them.  This detracts from the
               quality of your work in two ways:
               
               - First, the overall functionality if your program is effectively broken
                 without your accommodation of this difference in objects.
                 
               - Second, there is no indication that you are aware that this is broken
                 (no questions sent to me, no comments indicating that you know something
                 is wrong).
                 
               You need to improve upon this "thoroughness factor."  It can be very
               frustrating to be told that code is working and finalized, only to
               load it up and realize that it actually is not functional.
        */
        getVertices = function(objectArray) {
            var i, maxi, j, maxj, k, maxk, holdText = gl.createTexture();

            for ( i = 0, maxi = objectArray.length; i < maxi; i += 1) {
                setTransformDefaults(objectArray[i]);
                objectArray[i].buffer = GLSLUtilities.initVertexBuffer(gl, objectArray[i].vertices);

                if (!objectArray[i].colors) {
                    objectArray[i].colors = [];
                    for ( j = 0, maxj = objectArray[i].vertices.length / 3; j < maxj; j += 1) {
                        objectArray[i].colors = objectArray[i].colors.concat(objectArray[i].color.r, objectArray[i].color.g, objectArray[i].color.b);
                    }
                } else if (!(objectArray[i].colors[0] === objectArray[i].color)) {
                    objectArray[i].colors = [];

                    for ( j = 0, maxj = objectArray[i].vertices.length / 3; j < maxj; j += 1) {
                        objectArray[i].colors = objectArray[i].colors.concat(objectArray[i].color.r, objectArray[i].color.g, objectArray[i].color.b);
                    }
                }

                objectArray[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl, objectArray[i].colors);

                if (!objectArray[i].specularColors) {
                    objectArray[i].specularColors = [];
                    for ( j = 0, maxj = objectArray[i].vertices.length / 3; j < maxj; j += 1) {
                        objectArray[i].specularColors = objectArray[i].specularColors.concat(objectArray[i].specularColor.r, objectArray[i].specularColor.g, objectArray[i].specularColor.b);
                    }
                }

                if (objectArray[i].texture && objectArray[i].textureSpec) {
                    holdText.image = new Image();
                    holdText.image.src = objectArray[i].textureSpec.imgsrc;
                    objectArray[i].texture = holdText;
                    objectArray[i].texture.image.onload = function() {
                        gl.bindTexture(gl.TEXTURE_2D, holdText);
                        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, holdText.image);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                        gl.bindTexture(gl.TEXTURE_2D, null);
                    };

                    objectArray[i].textureSpec.buffer = GLSLUtilities.initVertexBuffer(gl, objectArray[i].textureSpec.coords);
                    objectArray[i].textureSpec.buffer.itemSize = objectArray[i].textureSpec.itemSize;
                    objectArray[i].textureSpec.buffer.numItems = objectArray[i].textureSpec.numItems;
                    objectArray[i].textureBuffer = objectArray[i].textureSpec.buffer;
                }

                objectArray[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl, objectArray[i].specularColors);

                objectArray[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl, objectArray[i].normals);

                if (objectArray[i].subshapes) {
                    for ( k = 0, maxk = objectArray[i].subshapes.length; k < maxk; k += 1) {
                        getVertices(objectArray[i].subshapes);
                    }
                }
            }
        }; // JD: Missed a semicolon here.

        getVertices(objectsToDraw);

        /* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Shader Program ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
        shaderProgram = GLSLUtilities.initSimpleShaderProgram(gl, $("#vertex-shader").text(), $("#fragment-shader").text(), function(shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        }, function(shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        });

        if (abort) {
            alert("Fatal errors encountered; we cannot continue.");
            return;
        }
        gl.useProgram(shaderProgram);

        vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
        gl.enableVertexAttribArray(vertexPosition);
        vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
        gl.enableVertexAttribArray(vertexDiffuseColor);
        vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
        gl.enableVertexAttribArray(vertexSpecularColor);
        normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
        gl.enableVertexAttribArray(normalVector);

        textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        // JD: Disabled to accommodate non-textured objects.
//        gl.enableVertexAttribArray(textureCoordAttribute);

        samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

        modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
        projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
        lookAtMatrix = gl.getUniformLocation(shaderProgram, "lookAtMatrix");

        lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
        lightPosition2 = gl.getUniformLocation(shaderProgram, "lightPosition2");
        lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
        lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
        shininess = gl.getUniformLocation(shaderProgram, "shininess");

        /* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Drawing Functions ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
        drawObject = function(object, parentmi) {
            var i, ms = new Matrix4x4(), mt = new Matrix4x4(), mr = new Matrix4x4(), mi = new Matrix4x4();

            gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
            gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
            gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);
            gl.uniform1f(shininess, object.shininess);
            // JD: Disabled to accommodate non-textured objects.
//            if (object.texture) {
//                gl.bindBuffer(gl.ARRAY_BUFFER, object.textureBuffer);
//                gl.vertexAttribPointer(textureCoordAttribute, object.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
//
//                gl.activeTexture(gl.TEXTURE0);
//                gl.bindTexture(gl.TEXTURE_2D, object.texture);
//                gl.uniform1i(samplerUniform, 0);
//            }

            ms = ms.scale(object.scale.x, object.scale.y, object.scale.z);
            mt = mt.translate(object.translate.x, object.translate.y, object.translate.z);
            mr = mr.rotate(object.rotate.angle, object.rotate.x, object.rotate.y, object.rotate.z);
            mi = mt.multiply(mr).multiply(ms);

            // JD: This line is somewhat redundant with the one below it (in the if block);
            //     the code can be restructured such that only one uniformMatrix4fv call is
            //     present for modelViewMatrix.
            gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(mi.toWebGLMatrix().returnMatrix()));

            if (parentmi) {
                mi = mi.multiply(parentmi);
                gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(mi.toWebGLMatrix().returnMatrix()));
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
            gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
            gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.drawArrays(object.mode, 0, object.vertices.length / 3);

            if (object.subshapes) {
                for ( i = 0; i < object.subshapes.length; i++) {
                    drawObject(object.subshapes[i], mi);
                }
            }
        };

        drawScene = function() {
            var m = new Matrix4x4(); // JD: I had to add the "();" to the end of the line---watch out for these!
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            for ( i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
                drawObject(objectsToDraw[i]);
            }

            gl.flush();

        };

        /* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Scene Creation  ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
        var m = new Matrix4x4();
        mc = new Matrix4x4();

        m = m.ortho(-50, 50, -50, 50, -100, 100);
        gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(m.toWebGLMatrix().returnMatrix()));

        gl.uniform4fv(lightPosition, [20.0, 100.0, -100.0, 1.0]);
        gl.uniform4fv(lightPosition2, [-20.0, -400.0, 40.0, 1.0]);
        gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
        gl.uniform3fv(lightSpecular, [1.0, 1.0, 0.0]);

        setTimeout(drawScene, 100);

        /* ~*~*~*~*~*~**~*~*~*~*~*~*~*~* Interactive Functions  ~*~*~*~*~*~**~*~*~*~*~*~*~*~*~ */
        $("#left-slice-cancel").hide();
        $("#right-slice-cancel").hide();
        $("#make-btn").hide();

        $("#left-color-picker").spectrum({
            color : "#fff",
            showInput : true,
            change : function(color) {
                if (!confirmL) {
                    leftJelly.color = color;
                    leftJelly.color = leftJelly.color.toRgb();
                    lR = leftJelly.color.r / 200;
                    lG = leftJelly.color.g / 200;
                    lB = leftJelly.color.b / 200;
                    leftJelly.color = {
                        r : lR,
                        g : lG,
                        b : lB
                    };
                    getVertices(objectsToDraw);
                    drawScene();
                } else {
                    alert("Sorry, you have already confirmed your left color choice.");
                }
            }
        });

        $("#right-color-picker").spectrum({
            color : "#fff",
            showInput : true,
            change : function(color) {
                if (!confirmR) {
                    rightJelly.color = color;
                    rightJelly.color = rightJelly.color.toRgb();
                    rR = rightJelly.color.r / 200;
                    rG = rightJelly.color.g / 200;
                    rB = rightJelly.color.b / 200;
                    rightJelly.color = {
                        r : rR,
                        g : rG,
                        b : rB
                    };
                    getVertices(objectsToDraw);
                    drawScene();
                } else {
                    alert("Sorry, you have already confirmed your right color choice");
                }
            }
        });

        $("#left-slice-confirm").click(function() {
            confirmL = true;
            $("#left-slice-confirm").hide(200);
            $("#left-slice-cancel").show(200);
            $("#left-color-picker").spectrum("disable");

            leftBread.activeAnim = true;
            leftBread.keyframe = {
                start : {
                    translate : {
                        x : leftBread.translate.x,
                        y : leftBread.translate.y,
                        z : leftBread.translate.z
                    },
                    frame : 0
                },
                end : {
                    translate : {
                        x : -3.5,
                        y : 0.0,
                        z : 0.0
                    },
                    rotate : {
                        angle : -85.0,
                        x : 0.0,
                        y : 1.0,
                        z : 0.0
                    },
                    frame : 50
                },
                currentTweenFrame : 0,
            };

            setTransformDefaults(leftBread.keyframe.start);
            setTransformDefaults(leftBread.keyframe.end);
            animate([leftBread]);
            checkState();
        });

        $("#right-slice-confirm").click(function() {
            confirmR = true;
            $("#right-slice-confirm").hide(200);
            $("#right-slice-cancel").show(200);
            $("#right-color-picker").spectrum("disable");

            rightBread.activeAnim = true;
            rightBread.keyframe = {
                start : {
                    translate : {
                        x : rightBread.translate.x,
                        y : rightBread.translate.y,
                        z : rightBread.translate.z
                    },
                    frame : 0
                },
                end : {
                    translate : {
                        x : 3.5,
                        y : 0.0,
                        z : 0.0
                    },
                    rotate : {
                        angle : 85.0,
                        x : 0.0,
                        y : 1.0,
                        z : 0.0
                    },
                    frame : 50
                },
                currentTweenFrame : 0,
                ease : KeyframeTweener.quadEaseOut
            };

            setTransformDefaults(rightBread.keyframe.start);
            setTransformDefaults(rightBread.keyframe.end);
            animate([rightBread]);
            checkState();
        });

        $("#left-slice-cancel").click(function() {
            confirmL = false;
            $("#left-slice-confirm").show(200);
            $("#left-slice-cancel").hide(200);
            $("#left-color-picker").spectrum("enable");

            leftBread.activeAnim = true;
            leftBread.keyframe = {
                start : {
                    translate : {
                        x : leftBread.translate.x,
                        y : leftBread.translate.y,
                        z : leftBread.translate.z
                    },
                    frame : 0
                },
                end : {
                    translate : {
                        x : -30.0,
                        y : 0.0,
                        z : 0.0
                    },
                    rotate : {
                        angle : 0.0,
                        x : 0.0,
                        y : 1.0,
                        z : 0.0
                    },
                    frame : 50
                },
                currentTweenFrame : 0,
            };

            setTransformDefaults(leftBread.keyframe.start);
            setTransformDefaults(leftBread.keyframe.end);
            animate([leftBread]);
            checkState();
        });

        $("#right-slice-cancel").click(function() {
            confirmR = false;
            $("#right-slice-confirm").show(200);
            $("#right-slice-cancel").hide(200);
            $("#right-color-picker").spectrum("enable");

            rightBread.activeAnim = true;
            rightBread.keyframe = {
                start : {
                    translate : {
                        x : rightBread.translate.x,
                        y : rightBread.translate.y,
                        z : rightBread.translate.z
                    },
                    frame : 0
                },
                end : {
                    translate : {
                        x : 30.0,
                        y : 0.0,
                        z : 0.0
                    },
                    rotate : {
                        angle : 0.0,
                        x : 0.0,
                        y : 1.0,
                        z : 0.0
                    },
                    frame : 50
                },
                currentTweenFrame : 0,
                ease : KeyframeTweener.quadEaseOut

            };

            setTransformDefaults(rightBread.keyframe.start);
            setTransformDefaults(rightBread.keyframe.end);
            animate([rightBread]);
            checkState();
        });

        $("#make-btn").click(function() {
            var fR = (leftJelly.color.r + rightJelly.color.r) / 2, 
                fG = (leftJelly.color.g + rightJelly.color.g) / 2, 
                fB = (leftJelly.color.b + rightJelly.color.b) / 2;

            finalJellyColor = {
                r : fR,
                g : fG,
                b : fB
            };

            $("#left").hide();
            $("#right").hide();
            $("#make-btn").hide(200);

            finalBreadA = {
                name : "Final Bread A",
                color : {
                    r : 0.99,
                    g : 0.92,
                    b : 0.57
                },
                scale : {
                    x : 1.0,
                    y : 1.0,
                    z : 1.0
                },
                translate : {
                    x : 0.0,
                    y : 0.0,
                    z : -3.0
                },
                vertices : Shapes.toRawTriangleArray(Shapes.bread()),
                mode : gl.TRIANGLES,
                normals : Shapes.toVertexNormalArray(Shapes.bread()),
                specularColor : {
                    r : 1.0,
                    g : 1.0,
                    b : 1.0
                },
                shininess : 1,
                subshapes : [{
                    name : "Final Crust",
                    color : {
                        r : 0.825,
                        g : 0.52,
                        b : 0.22
                    },
                    vertices : Shapes.toRawTriangleArray(Shapes.crust()),
                    mode : gl.TRIANGLES,
                    specularColor : {
                        r : 1.0,
                        g : 0.0,
                        b : 1.0
                    },
                    shininess : 3,
                    normals : Shapes.toVertexNormalArray(Shapes.crust())
                }]
            };

            finalBreadB = {
                name : "Final Bread B",
                color : {
                    r : 0.99,
                    g : 0.92,
                    b : 0.57
                },
                scale : {
                    x : 1.0,
                    y : 1.0,
                    z : 1.0
                },
                translate : {
                    x : 0.0,
                    y : 0.0,
                    z : -2.0
                },
                rotate : {
                    angle : 180.0,
                    x : 0.0,
                    y : 1.0,
                    z : 0.0
                },
                vertices : Shapes.toRawTriangleArray(Shapes.bread()),
                mode : gl.TRIANGLES,
                normals : Shapes.toVertexNormalArray(Shapes.bread()),
                specularColor : {
                    r : 1.0,
                    g : 1.0,
                    b : 1.0
                },
                shininess : 1,
                subshapes : [{
                    name : "Final Crust B",
                    color : {
                        r : 0.825,
                        g : 0.52,
                        b : 0.22
                    },
                    vertices : Shapes.toRawTriangleArray(Shapes.crust()),
                    mode : gl.TRIANGLES,
                    specularColor : {
                        r : 1.0,
                        g : 0.0,
                        b : 1.0
                    },
                    shininess : 3,
                    normals : Shapes.toVertexNormalArray(Shapes.crust())
                }]
            };
            finalJelly = {
                name: "jelly", 
                 color: finalJellyColor,
                 scale: {x: 1.0, y: 1.0, z: 1.0},
                 translate: {x: 0.0, y: 0.0, z: 20.0},
                 vertices: Shapes.toRawTriangleArray(Shapes.crust()),
                 mode: gl.TRIANGLES,
                 specularColor: { r: 1.0, g: 0.0, b: 1.0 },
                 shininess: 3,
                 normals: Shapes.toVertexNormalArray(Shapes.crust())
           }

            objectsToDraw = [finalBreadA, finalBreadB, background];
            getVertices(objectsToDraw);
            finalBreadA.activeAnim = true;
            finalBreadB.activeAnim = true;
            finalBreadA.keyframe = {
                start : {
                    translate : {
                        x : finalBreadA.translate.x,
                        y : finalBreadA.translate.y,
                        z : finalBreadA.translate.z
                    },
                    frame : 0
                },
                end : {
                    translate : {
                        x : 0.0,
                        y : 0.0,
                        z : 0.0
                    },
                    scale : {
                        x : 2.0,
                        y : 2.0,
                        z : 2.0
                    },
                    rotate : {
                        angle : 360.0,
                        x : 0.0,
                        y : 1.0,
                        z : 0.0
                    },
                    frame : 50
                },
                currentTweenFrame : 0,
            };
            finalBreadB.keyframe = {
                start : {
                    translate : {
                        x : finalBreadB.translate.x,
                        y : finalBreadB.translate.y,
                        z : finalBreadB.translate.z
                    },
                    rotate : {
                        angle : finalBreadB.rotate.angle,
                        x : finalBreadB.rotate.x,
                        y : finalBreadB.rotate.y,
                        z : finalBreadB.rotate.z
                    },
                    frame : 0
                },
                end : {
                    translate : {
                        x : 0.0,
                        y : 0.0,
                        z : 0.0
                    },
                    scale : {
                        x : 2.0,
                        y : 2.0,
                        z : 2.0
                    },
                    rotate : {
                        angle : 540.0,
                        x : 0.0,
                        y : 1.0,
                        z : 0.0
                    },
                    frame : 50
                },
                currentTweenFrame : 0,
            };

            // JD: Upon "Make," your program errors out because finalJelly is undefined,
            //     which, indeed, it is.  Either this variable was lost in the shuffle,
            //     or you were never able to get to it.  I didn't have the time to comb
            //     through your git history to track this down; if you can, I think you
            //     should, just so you have something that works end to end, even if
            //     texture mapping is disabled.
            //
            //     Unfortunately, this is yet another symptom of the main pitfall seen
            //     in this work: a great deal of good effort that gets undermined by
            //     gaps in polish and care.  The types of errors seen here make it look
            //     like the program was not even tested before committing.  Of course I
            //     personally know this not to be the case, because I saw things work
            //     over summer.  But to then see these regressions in the "final"
            //     submission is a bit of a letdown.
            finalJelly.keyframe = {
                start : {
                    translate : {
                        x : finalJelly.translate.x,
                        y : finalJelly.translate.y,
                        z : finalJelly.translate.z
                    },
                    frame : 0
                },
                end : {
                    translate : {
                        x : 0.0,
                        y : 0.0,
                        z : 0.0
                    },
                    scale : {
                        x : 2.0,
                        y : 2.0,
                        z : 2.0
                    },
                    rotate : {
                        angle : 360.0,
                        x : 0.0,
                        y : 1.0,
                        z : 0.0
                    },
                    frame : 50
                },
                currentTweenFrame : 0,
            };

            setTransformDefaults(finalBreadA.keyframe.start);
            setTransformDefaults(finalBreadB.keyframe.start);
            setTransformDefaults(finalBreadA.keyframe.end);
            setTransformDefaults(finalBreadB.keyframe.end);
            animate([finalBreadA, finalBreadB]);
            enableJelly();
        });

        enableJelly = function() {
            $(canvas).click(function() {
                var jellyDrip = {
                    color : finalJellyColor,
                    scale : {
                        x : randomSigned(0.125, 0.15),
                        y : randomSigned(0.25, 0.45),
                        z : randomSigned(0.25, 0.45)
                    },
                    translate : {
                        x : randomSigned(-10, 10),
                        y : randomSigned(-40, -25),
                        z : randomSigned(0, 5)
                    },
                    vertices : Shapes.toRawTriangleArray(Shapes.drip()),
                    mode : gl.TRIANGLES,
                    normals : Shapes.toVertexNormalArray(Shapes.drip()),
                    specularColor : {
                        r : 1.0,
                        g : 1.0,
                        b : 1.0
                    },
                    shininess : 15
                };

                objectsToDraw.push(jellyDrip);
                getVertices(objectsToDraw);
                jellyDrip.activeAnim = true;
                jellyDrip.keyframe = {
                    start : {
                        translate : {
                            x : jellyDrip.translate.x,
                            y : jellyDrip.translate.y,
                            z : jellyDrip.translate.z
                        },
                        frame : 0
                    },
                    end : {
                        translate : {
                            x : jellyDrip.translate.x,
                            y : -75.0,
                            z : jellyDrip.translate.z
                        },
                        rotate : {
                            angle : 360.0,
                            x : 0.0,
                            y : 1.0,
                            z : 0.0
                        },
                        frame : 50
                    },
                    currentTweenFrame : 0,
                };
                setTransformDefaults(jellyDrip.keyframe.start);
                setTransformDefaults(jellyDrip.keyframe.end);
                animate([jellyDrip]);
            });
        };

        checkState = function() {
            if (confirmL && confirmR) {
                $("#make-btn").show();
            } else {
                $("#make-btn").hide();
            }
        };

        animate = function(objectArray) {
            var interval = setInterval(function() {
                var finished = KeyframeTweener.applyTween(objectArray);
                if (finished) {
                    clearInterval(interval);
                }
                drawScene();
            }, 30);
        };

        randomSigned = function(llimit, ulimit) {
            var diff = ulimit - llimit;
            k = (llimit / 10) > 0.1 ? 1 : 0.1;
            result = (Math.random() * (diff + k) + llimit);
            return result;
        };
    }(document.getElementById("sandwich")));
