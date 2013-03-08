// JD: Hmmm, interesting, you renamed NanoshopNeighborhood to Nanoshop.
//     I can see why you would do this, but without additional comments
//     from you, your intention is not clear.
var Nanoshop = {

    applyFilter: function (imageData, filter) {
        var i,
            j,
            max,
            pixel,
            pixelArray = imageData.data;

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            pixel = filter(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]);
            for (j = 0; j < 4; j += 1) {
                pixelArray[i + j] = pixel[j];
            }
        }

        return imageData;
    },

    // JD: Ah, I see that the other filters rode along also.  Again,
    //     this can be an understandable choice, but now you have
    //     mixed up paradigms here (single-pixel vs. neighborhood
    //     filters), and there is no clear way, based on function
    //     names or other cues, to distinguish between the two.
    darken: function (r, g, b, a) {
                 return [r / 2, g / 2, b / 2, a];
    },
    
    bAndw: function(r, g, b, a) {
        var avg = (r + g + b) /3
        return [avg, avg, avg, a];
    },

    invert: function(r, g, b, a) {
        var n = 255;
        return [(n - r), (n - g), (n - b), a];
    },


    darkener: function (rgbaNeighborhood) {
        return [
            rgbaNeighborhood[4].r / 2,
            rgbaNeighborhood[4].g / 2,
            rgbaNeighborhood[4].b / 2,
            rgbaNeighborhood[4].a
        ];
    },

    averager: function (rgbaNeighborhood) {
        var rTotal = 0,
            gTotal = 0,
            bTotal = 0,
            aTotal = 0,
            i;

        for (i = 0; i < 9; i += 1) {
            rTotal += rgbaNeighborhood[i].r;
            gTotal += rgbaNeighborhood[i].g;
            bTotal += rgbaNeighborhood[i].b;
            aTotal += rgbaNeighborhood[i].a;
        }

        return [ rTotal / 9, gTotal / 9, bTotal / 9, aTotal / 9 ];
    },

    // JD: I see you enjoyed yourself quite a bit here!  Good to see.
    noise: function (rgbaNeighborhood) {
        // JD: Spacing here is too tight---the nested parentheses make these
        //     hard to read.  Also, your indentation here is off.
      var redRand = Math.floor((Math.random()*9)+1),
         greenRand = Math.floor((Math.random()*9)+1),
         blueRand = Math.floor((Math.random()*9)+1),
         alphaRand = Math.floor((Math.random()*9)+1),
         red,
         green,
         blue,
         alpha;

        // JD: OK, this is *not* how you use conditional expressions!
        //     Look them up again.  Or look at other sample code that
        //     use them.
        rgbaNeighborhood[redRand] != null ? red = rgbaNeighborhood[redRand].r : red = rgbaNeighborhood[4].r
        rgbaNeighborhood[greenRand] != null ? green = rgbaNeighborhood[greenRand].g : green = rgbaNeighborhood[4].g
        rgbaNeighborhood[blueRand] != null ? blue = rgbaNeighborhood[blueRand].b : blue = rgbaNeighborhood[4].b
        rgbaNeighborhood[alphaRand] != null ? alpha = rgbaNeighborhood[alphaRand].a : alpha = rgbaNeighborhood[4].a



      return [red, green, blue, alpha] // JD: Missing semicolon!

        // JD: Overall, this is a fun filter, but why the sudden dropoff
        //     in readability?
    },

    vBlur: function (rgbaNeighborhood) {
        // JD: Bad indentation here.
      var top = rgbaNeighborhood[1],
         self = rgbaNeighborhood[4],
         red = (top.r + self.r) / 2,
         green = (top.g + self.g) / 2,
         blue = (top.b + self.b) / 2,
         alpha = (top.a + self.a) / 2;
       return [red, green, blue, alpha];
       
    },

    // JD: Now, this one is interesting, not only for the overall complexity
    //     of the algorithm, but also for its design implication---*it requires
    //     a parameter*.  Now, the way you did it works, but is not a very
    //     reusable design---it hardcodes a specific #INPUT element that
    //     must contain the value of the degree parameter.
    //
    //     Truth is, the original design of NanoshopNeighborhood does not
    //     easily accommodate parameters.  Adding this capability is a good
    //     idea, but this is not the best way to do it.  We can discuss this
    //     more if you are interested.
    //
    //     Also, strike three with the not-so-readable code.  Was this done
    //     in a big rush?
    dBlur: function (rgbaNeighborhood) {
     var degree,
         self = rgbaNeighborhood[4],
         ratioX,
         ratioY,
         pX,
         pY,
         red,
         blue,
         green,
         alpha;
 
     degree = $("#INPUT").val() || 0;

        // JD: The line below has no reason to be indented the way it is!
    while (degree > 360 || degree <= -1){
         degree > 360 ? degree -= 360 : degree += 360;
     }

        // JD: More incorrect uses of the condtional expression---they technically
        //     work, but this is a stroke of luck.
     if(degree > 0 && degree <= 90){
       rgbaNeighborhood[1] != null ? pY = rgbaNeighborhood[1] : pY = rgbaNeighborhood[4];
       rgbaNeighborhood[5] != null ? pX = rgbaNeighborhood[5] : pX = rgbaNeighborhood[4];
     } else if(degree > 90 && degree <= 180) {
       rgbaNeighborhood[1] != null ? pY = rgbaNeighborhood[1] : pY = rgbaNeighborhood[4];
       rgbaNeighborhood[3] != null ? pX = rgbaNeighborhood[3] : pX = rgbaNeighborhood[4];
       degree -= 90;
     } else if(degree > 180 && degree <= 270) {
       rgbaNeighborhood[7] != null ? pY = rgbaNeighborhood[7] : pY = rgbaNeighborhood[4];
       rgbaNeighborhood[3] != null ? pX = rgbaNeighborhood[3] : pX = rgbaNeighborhood[4];
       degree -= 180;
     } else {
       rgbaNeighborhood[7] != null ? pY = rgbaNeighborhood[7] : pY = rgbaNeighborhood[4];
       rgbaNeighborhood[5] != null ? pX = rgbaNeighborhood[5] : pX = rgbaNeighborhood[4];
       degree -= 270;
     } 
  
    ratioY = (degree / 90);
    ratioX = (1 - ratioY);

        // JD: You forgot your semicolons here (again)!
    red = ((ratioX * pX.r) + (ratioY * pY.r) + self.r) / 2
    green = ((ratioX * pX.g) + (ratioY * pY.g) + self.g) / 2
    blue = ((ratioX * pX.b) + (ratioY * pY.b) + self.b) / 2
    alpha = ((ratioX * pX.a) + (ratioY * pY.a) + self.a) / 2
      
    return [red, green, blue, alpha];
    
        // JD: See, when a function's closing brace is lined up with
        //     the statements before it, you must realize that there
        //     is something wrong with your indentation!
    },

    // JD: I see why you needed to rename this version of applyFilter,
    //     but really you could have chosen a better name than "applyFilterN"!
    applyFilterN: function (renderingContext, imageData, filter) {
        var result = renderingContext.createImageData(imageData.width, imageData.height),
            i,
            j,
            max,
            iAbove,
            iBelow,
            pixel,
            pixelColumn,
            firstRow,
            lastRow,
            rowWidth = imageData.width * 4,
            sourceArray = imageData.data,
            destinationArray = result.data,

            // A convenience function for creating an rgba object.
            rgba = function (startIndex) {
                return {
                    r: sourceArray[startIndex],
                    g: sourceArray[startIndex + 1],
                    b: sourceArray[startIndex + 2],
                    a: sourceArray[startIndex + 3]
                };
            };

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            // The 9-color array that we build must factor in image boundaries.
            // If a particular location is out of range, the color supplied is that
            // of the extant pixel that is adjacent to it.
            iAbove = i - rowWidth;
            iBelow = i + rowWidth;
            pixelColumn = i % rowWidth;
            firstRow = sourceArray[iAbove] === undefined;
            lastRow = sourceArray[iBelow] === undefined;

            pixel = filter([
                // The row of pixels above the current one.
                firstRow ?
                    (pixelColumn ? rgba(i - 4) : rgba(i)) :
                    (pixelColumn ? rgba(iAbove - 4) : rgba(iAbove)),

                firstRow ? rgba(i) : rgba(iAbove),

                firstRow ?
                    ((pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i)) :
                    ((pixelColumn < rowWidth - 4) ? rgba(iAbove + 4) : rgba(iAbove)),

                // The current row of pixels.
                pixelColumn ? rgba(i - 4) : rgba(i),

                // The center pixel: the filter's returned color goes here
                // (based on the loop, we are at least sure to have this).
                rgba(i),

                (pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i),

                // The row of pixels below the current one.
                lastRow ?
                    (pixelColumn ? rgba(i - 4) : rgba(i)) :
                    (pixelColumn ? rgba(iBelow - 4) : rgba(iBelow)),

                lastRow ? rgba(i) : rgba(iBelow),

                lastRow ?
                    ((pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i)) :
                    ((pixelColumn < rowWidth - 4) ? rgba(iBelow + 4) : rgba(iBelow))
            ]);

            // Apply the color that is returned by the filter.
            for (j = 0; j < 4; j += 1) {
                destinationArray[i + j] = pixel[j];
            }
        }

        return result;
    }
};
