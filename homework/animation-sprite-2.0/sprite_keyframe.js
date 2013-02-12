 /*
  *Sprites
  *Assignment 0212 
  *CMSI371 
  *Spring 2013
 */

(function () {
    var canvas = document.getElementById("canvas"),
        frameTotal = 10000,

        square = function (renderingContext) {
            renderingContext.fillStyle = "blue";
            renderingContext.fillRect(-20, -20, 40, 40);
        },
     
        circle = function (renderingContext) {
            renderingContext.strokeStyle = "red";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.stroke();
        },

        run1 = DrawSprites.run1,
        run2 = DrawSprites.run2,
        stop1 = DrawSprites.stop1, 
        stop2 = DrawSprites.stop2, 
        kneel1 = DrawSprites.kneel1, 
        kneel2 = DrawSprites.kneel2,
        kneelExt = DrawSprites.kneelExt, 
        jump = DrawSprites.jump, 
        tQuarters = DrawSprites.tQuarters, 
        stand = DrawSprites.stand, 
        forward = DrawSprites.forward, 
        forwardQ = DrawSprites.forwardQ, 
        falling = DrawSprites.falling, 
        portalO = DrawSprites.portalO, 
        portalB = DrawSprites.portalB,

       

        background = Background.drawBgnd;



        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has an array of drawing functions and an array of keyframes.

   
        sprites = [
            {
                draw: [run1, run2, stop1, stop2, kneel1, kneel2, kneelExt, jump, tQuarters, stand, forward, forwardQ, falling],
                keyframes: [
                    {
                        frame: 0,
                        tx: 0,
                        ty: 370,
                        rotate: -25,
                        ease: KeyframeTweener.quadEaseInAndOut,
                        drawActive: run1
                    },

                    {
                        frame: 10,
                        tx: 120,
                        ty: 400,
                        rotate: 20,
                        ease: KeyframeTweener.quadEaseInAndOut,
                        drawActive: run2

                    },
                    {
                        frame: 15,
                        tx: 150,
                        ty: 403,
                        rotate: -15,
                        ease: KeyframeTweener.quadEaseOut,
                        drawActive: run1
                    },

                    {
                        frame: 20,
                        tx: 250,
                        ty: 405,
                        rotate: 15,
                        drawActive: run2
                    },
                    {
                        frame: 24,
                        tx: 350,
                        ty: 407,
                        rotate: -15,
                        drawActive: run1
                    },
                    {
                        frame: 27,
                        tx: 450,
                        ty: 407,
                        rotate: 15,
                        drawActive: run2
                    },

                    {
                        frame: 30,
                        tx: 495,
                        ty: 430,
                        drawActive: stop1
                    },
                    {
                        frame: 33,
                        tx: 550,
                        ty: 420,
                        drawActive: stop2
                    },
                    {
                        frame: 36,
                        tx: 510,
                        ty: 400,
                        drawActive: stand
                    },
                    {
                        frame: 45,
                        tx: 510,
                        ty: 400,
                        drawActive: tQuarters
                    },                    {
                        frame: 53,
                        tx: 510,
                        ty: 400,
                        drawActive: forward
                    },
                    {
                        frame: 55,
                        tx: 460,
                        ty: 400,
                        drawActive: forward
                    },
                    {
                        frame: 60,
                        tx: 460,
                        ty: 400,
                        drawActive: forwardQ
                    },
                    {
                        frame: 64,
                        tx: 510,
                        ty: 400,
                        drawActive: forwardQ
                    },
                    {
                        frame: 65,
                        tx: 510,
                        ty: 400,
                        drawActive: tQuarters
                    },
                    {
                        frame: 70,
                        tx: 525,
                        ty: 430,
                        drawActive: kneel1
                    },
                    {
                        frame: 80,
                        tx: 525,
                        ty: 430,
                        drawActive: kneel2
                    },
                    {
                        frame: 89,
                        tx: 525,
                        ty: 430,
                        rotate: 15,
                        drawActive: kneelExt
                    },
                    {
                        frame: 96,
                        tx: 525,
                        ty: 430,
                        drawActive: kneel2
                    },
                    {
                        frame: 105,
                        tx: 525,
                        ty: 430,
                        drawActive: kneel1
                    },
                    {
                        frame: 106,
                        tx: 590,
                        ty: 360,
                        drawActive: tQuarters
                    },
                    {
                        frame: 113,
                        tx: 600,
                        ty: 330,
                        drawActive: jump
                    },
                    {
                        frame: 120,
                        tx: 600,
                        ty: 585,
                        drawActive: falling
                    },
                    {
                        frame: 121,
                        tx: 600,
                        ty: 0,
                        drawActive: falling
                    },
                    {
                        frame: 125,
                        tx: 600,
                        ty: 585,
                        drawActive: falling
                    },
                    {
                        frame: 126,
                        tx: 600,
                        ty: 0,
                        drawActive: falling
                    },
                    {
                        frame: 130,
                        tx: 600,
                        ty: 585,
                        drawActive: falling
                    },
                    {
                        frame: 131,
                        tx: 600,
                        ty: 0,
                        drawActive: falling
                    },
                    {
                        frame: 133,
                        tx: 600,
                        ty: 585,
                        drawActive: falling
                    },
                    {
                        frame: 134,
                        tx: 600,
                        ty: 0,
                        drawActive: falling
                    },
                    {
                        frame: 136,
                        tx: 600,
                        ty: 585,
                        drawActive: falling
                    },
                ]
            },
            {
                draw: [kneelExt],
                keyframes: [
                    {
                        frame: 89,
                        tx: 600,
                        ty: -60,
                        rotate: 45,
                        drawActive: kneelExt
                    },
                    {
                        frame: 96,
                        tx:600,
                        ty: -60,
                        rotate: 45,
                        drawActive: kneelExt
                    }
                  
                ]
            },
            {
                draw: [portalO],
                keyframes: [
                    {
                        frame: 106,
                        drawActive: portalO
                    },
                    {
                        frame: 150,
                        drawActive: portalO
                    }
                  
                ]
            },
            {
                draw: [portalB],
                keyframes: [
                    {
                        frame: 0,
                        drawActive: portalB
                    },
                    {
                        frame: 150,
                        drawActive: portalB
                    }
                  
                ]
            }
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites,
        background: background,
        frameTotal: frameTotal
    });
}());
