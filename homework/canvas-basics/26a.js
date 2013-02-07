/*
* Problem 26a grid of lavender squares, one canvas pixel apart, filling the entire canvas
* Assigment 0129
* CMSI371
*/

(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        height = canvas.height,
        width = canvas.width,
        ONE = 1 ; // JD: OK, I see what you are doing here, but
                  //     you can give it a better name than the
                  //     value itself!

    renderingContext.fillStyle = "rgb(204, 204, 255)";
    for (var i = 0; i < height; i++){
        // JD: ^^^^Even for variables are ideally declared up top,
        //         and i += 1 is proferred over i++.
        if(i%2 === 0){
            // JD: ^^^When comparing against zero in JavaScript,
            //     use truthiness/falsiness to your advantage to
            //     produce shorter code: this condition can be
            //     (!(i % 2)). (note the spacing also)
            for(var o = 0; o < width; o++){
	            if(o % 2 === ONE){
		            renderingContext.fillRect(o, i, ONE, ONE)
		    }
	    }
	    } else {
            for(var e = 0; e < width; e++){
	            if(e % 2 === 0){
		             renderingContext.fillRect(e, i, ONE, ONE)
		        }
	        }
	    }

    }

}());
