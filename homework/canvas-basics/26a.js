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
        ONE = 1 ;
		
    renderingContext.fillStyle = "rgb(204, 204, 255)";
    for (var i = 0; i < height; i++){
        if(i%2 === 0){
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
