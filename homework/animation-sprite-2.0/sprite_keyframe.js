 /*
  *Sprites
  *Assignment 0212 
  *CMSI371 
  *Spring 2013
 */

(function () {
    var canvas = document.getElementById("canvas"),
        frameTotal = 10000,

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

       

        background = Background.drawBgnd,



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
                        tx: 490,
                        ty: 370,
                        rotate: 15,
                        drawActive: run2
                    },


                    {
                        frame: 33,
                        tx: 500,
                        ty: 410,
                        drawActive: stop1
                    },

                    {
                        frame: 38,
                        tx: 540,
                        ty: 410,
                        drawActive: stop2
                    },

                    {
                        frame: 42,
                        tx: 530,
                        ty: 400,
                        ease: KeyframeTweener.nop,
                        drawActive: stand
                    },

                    {
                        frame: 58,
                        tx: 515,
                        ty: 415,
                        drawActive: tQuarters
                    },                    
                    {
                        frame: 59,
                        tx: 515,
                        ty: 415,
                        ease: KeyframeTweener.nop,
                        drawActive: tQuarters
                    },         

                    {
                        frame: 60,
                        tx: 515,
                        ty: 415,
                        ease: KeyframeTweener.nop,
                        drawActive: kneel2
                    },                    

                    {
                        frame: 64,
                        tx: 515,
                        ty: 415,
                        drawActive: kneel1
                    },            

                    {
                        frame: 67,
                        tx: 450,
                        ty: 350,
                        rotate: -10,
                        drawActive: tQuarters
                    },       
                    {
                        frame: 75,
                        tx: 360,
                        ty: 400,
                        rotate: 0,
                        ease: KeyframeTweener.quadEaseInAndOut,
                        drawActive: tQuarters
                    }, 
                    {
                        frame: 80,
                        tx: 360,
                        ty: 400,
                        drawActive: forward
                    },                    

                    {
                        frame: 84,
                        tx: 360,
                        ty: 400,
                        ease: KeyframeTweener.quadEaseInAndOut,
                        drawActive: forwardQ
                    },          

                    {
                        frame: 95,
                        tx: 360,
                        ty: 400,
                        ease: KeyframeTweener.quadEaseInAndOut,
                        drawActive: tQuarters
                    },         

                    {
                        frame: 98,
                        tx: 360,
                        ty: 400,
                        ease: KeyframeTweener.nop,
                        drawActive: kneel1
                    },                    

                    {
                        frame: 100,
                        tx: 360,
                        ty: 400,
                        drawActive: kneel2
                    }, 

                    {
                        frame: 105,
                        tx: 450,
                        ty: 350,
                        drawActive: tQuarters
                    }, 

                    {
                        frame: 110,
                        tx: 515,
                        ty: 415,
                        drawActive: tQuarters
                    }, 

                    {
                        frame: 111,
                        tx: 515,
                        ty: 415,
                        drawActive: kneel1
                    }, 
                    {
                        frame: 113,
                        tx: 515,
                        ty: 415,
                        drawActive: tQuarters
                    },            

                    {
                        frame: 125,
                        tx: 515,
                        ty: 415,
                        drawActive: kneel1
                    },

                    {
                        frame: 129,
                        tx: 515,
                        ty: 415,
                        ease: KeyframeTweener.nop,
                        drawActive: kneel2
                    },

                    {
                        frame: 135,
                        tx: 525,
                        ty: 425,
                        rotate: 15,
                        ease: KeyframeTweener.nop,
                        drawActive: kneelExt
                    },
                    {
                        frame: 141,
                        tx: 515,
                        ty: 415,
                        drawActive: kneel2
                    },
                    {
                        frame: 145,
                        tx: 515,
                        ty: 415,
                        drawActive: kneel1
                    },
                    {
                        frame: 151,
                        tx: 515,
                        ty: 415,
                        ease: KeyframeTweener.quadEaseIn,
                        drawActive: tQuarters
                    },
                    {
                        frame: 153,
                        tx: 600,
                        ty: 330,
                        ease: KeyframeTweener.quadEaseInAndOut,
                        drawActive: jump
                    },
                    {
                        frame: 155,
                        tx: 600,
                        ty: 585,
                        drawActive: falling
                    },
                    {
                        frame: 160,
                        tx: 600,
                        ty: 0,
                        drawActive: falling
                    },
                    {
                        frame: 161,
                        tx: 600,
                        ty: 585,
                        drawActive: falling
                    },
                    {
                        frame: 165,
                        tx: 600,
                        ty: 0,
                        drawActive: falling
                    },
                    {
                        frame: 166,
                        tx: 600,
                        ty: 585,
                        drawActive: falling
                    },
                    {
                        frame: 169,
                        tx: 600,
                        ty: 0,
                        drawActive: falling
                    },
                    {
                        frame: 170,
                        tx: 600,
                        ty: 585,
                        drawActive: falling
                    },
                    {
                        frame: 172,
                        tx: 600,
                        ty: 0,
                        drawActive: falling
                    },
                    {
                        frame: 173,
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
                        frame: 135,
                        tx: 600,
                        ty: -60,
                        rotate: 45,
                        drawActive: kneelExt
                    },
                    {
                        frame: 141,
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
                        frame: 0,
                        drawActive: portalO
                    },
                    {
                        frame: 550,
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
                        frame: 550,
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
