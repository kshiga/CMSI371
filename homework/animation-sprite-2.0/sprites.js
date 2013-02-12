 /*
  *Sprites
  *Assignment 0212 
  *CMSI371 
  *Spring 2013
 */

(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
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

        background = function (renderingContext) {
            renderingContext.fillStyle = "rgb(200, 200, 200)";
            renderingContext.fillRect(0, -0, canvas.width, canvas.height);
        }

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has an array of drawing functions and an array of keyframes.

   
        sprites = [
            {
                draw: [square, circle],
                keyframes: [
                    {
                        frame: 0,
                        tx: 0,
                        ty: 50,
                        ease: KeyframeTweener.cubicEaseInAndOut,
                        drawActive: square
                    },

                    {
                        frame: 100,
                        tx: (canvas.width/2),
                        ty: 50
                    },

                ]
            },

            {
                draw: [circle, 2, 3, square],
                keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.quadEaseOut,
                        drawActive: circle
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut,
                        drawActive: square
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
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
