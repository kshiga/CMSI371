/*
* A graph “A paper”-style grid consisting of light green lines that fills the entire canvas
* Assigment 0129
* CMSI371
*/
// JD: Very similar comments here as 26a.js.
(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        height = canvas.height,
        width = canvas.width,
        size = 10 ;
		
    renderingContext.strokeStyle = "rgb(222, 255, 197)";
    for (var i = 0; i < height; i++){
        if(i%size === 0){
            for(var o = 0; o < width; o++){
	            if(o % size === 0){
		            renderingContext.strokeRect(o, i, size, size)
                }
		    }
	    }

    }

}());
