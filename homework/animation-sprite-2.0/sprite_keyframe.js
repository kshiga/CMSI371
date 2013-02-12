 /*
  *Sprites
  *Assignment 0212 
  *CMSI371 
  *Spring 2013
 */

(function () {
    var canvas = document.getElementById("canvas"),

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
                        tx: 600,
                        ty: 0,
                        drawActive: falling
                    },

                    {
                        frame: 150,
                        tx: 600,
                        ty: 585
                    },

                ]
            },

            {
                draw: [portalO],
                keyframes: [
                    {
                        frame: 0,
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
        background: background
    });
}());
