var confirmBread = function (){
    // keyframe tween to center
    //set variable for mixing
    },

    makeSandwich = function(){
        //combine bread
        //change jelly colors
    };



$("#left-color-picker").spectrum({
    color: "#fff",
    showInput: true,
    change: function(color){
         jellyLeftColor = color;   
        console.log( jellyLeftColor.toRgbString());
    }
});
          

$("#right-color-picker").spectrum({
    color: "#fff",
    showInput: true,
    change: function(color){
        jellyRightColor = color;   
        console.log(jellyRightColor.toRgbString());
    }
});

$("#left-slice-confirm").click(function (){
     confirmL = true;
     oneClickL++;
    if( oneClickL === 1){
        console.log("LEFT CONFIRMED");
        $("#dynamic-instructions").text("Left Slice confirmed");
        //confirmBread(leftSlice);
    }
});


$("#right-slice-confirm").click(function (){
     confirmR = true;
     oneClickR++;
    if( oneClickR === 1){
        console.log("RIGHT CONFIRMED");
        $("#dynamic-instructions").text("Right Slice confirmed");
        //confirmBread(rightSlice);
    }
});

$("#left-slice-cancel").click(function (){
     confirmL = false;
     oneClickL = 0;
    if(! confirmL){
        console.log("LEFT cancelled");
        //cancelBread(leftSlice);
    } else {
        alert("AHHH ERROR WTF");
    }
});

$("#right-slice-cancel").click(function (){
     confirmR = false;
     oneClickR = 0;
    if(! confirmR){
        console.log("RIGHT cancelled");
        //cancelBread(rightSlice);
    } else {
        alert("AHHH ERROR WTF");
    }
});

$(document).keypress(function(e) {
    if(e.which === 13){
        if( confirmR &&  confirmL){
        console.log("sandwich makin time");
        //makeSandwich();
        $("#dynamic-instructions").text("SANDWICH MAKIN TIME")
        } else {
            $("#dynamic-instructions").text("Both slices must be confirmed to mix the jelly!")
        }
    }
});


