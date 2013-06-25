var KeyframeTweener = {
    nop: function (currentTime, start, distance, duration) {
        return start;
    },

    linear: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        
        return distance * percentComplete + start;
    },

    quadEaseIn: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return distance * percentComplete * percentComplete + start;
    },

    quadEaseOut: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return -distance * percentComplete * (percentComplete - 2) + start;
    },

    quadEaseInAndOut: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / (duration / 2);
        return (percentComplete < 1) ?
                (distance / 2) * percentComplete * percentComplete + start :
                (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
    },

    cubicEaseInAndOut: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / (duration / 2);
        return (percentComplete < 1) ?
                (distance / 2) * percentComplete * percentComplete * percentComplete + start :
                (-distance / 2) * ((percentComplete -2) * (percentComplete -1) * percentComplete + 2) + start;
    },

    elasticEaseOut: function (currentTime, start, distance, duration) {
		var s = 1.70158;
        var p = 0;
        var a = distance;
        var percentComplete = currentTime / (duration);
        
		if (currentTime == 0) return start;  
        if (percentComplete == 1) return (start + distance);  
        if (!p) p = duration * 0.3;
		if (a < Math.abs(distance)) { a = distance; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (distance/a);
		return a * Math.pow(2, -10*percentComplete) * Math.sin( (percentComplete * duration - s)*(2*Math.PI)/p ) + distance + start;
    },
    
    
    
    /* 
     * This function will not do the drawing of objects, it will simply manipulate the values within each
     * 3D object to reflect the calculations of the tweening functions applied. 
     */
    applyTween: function (objectArray) {
            var i,
                j,
                maxi,
                maxj,
                start,
                end,
                ease,
                txStart,
                txDistance,
                tyStart,
                tyDistance,
                tzStart,
                tzDistance,
                sxStart,
                sxDistance,
                syStart,
                syDistance,
                szStart,
                szDistance,
                rxStart,
                rxDistance,
                ryStart,
                ryDistance,
                rzStart,
                rzDistance,
                raStart,
                raDistance,
                currentTweenFrame,
                duration,
                object
                
            
            for(i = 0, maxi = objectArray.length; i < maxi; i++){
                object = objectArray[i];
                                
                if(object.keyframe && object.activeAnim){                  
                                     
                    start = object.keyframe.start;
                    end = object.keyframe.end; 
                                        
                    ease = object.keyframe.ease || KeyframeTweener.linear;

                    txStart = start.translate.x || 0;
                    txDistance = (end.translate.x || 0)  - txStart;
                    tyStart = start.translate.y || 0;
                    tyDistance = (end.translate.y || 0) - tyStart;
                    tzStart = start.translate.z || 0;
                    tzDistance = (end.translate.z || 0) - tzStart;
                    
                    sxStart = start.scale.x || 0; 
                    sxDistance = (end.scale.x || 1) - sxStart;
                    syStart = start.scale.y || 0; 
                    syDistance = (end.scale.y || 1) - syStart;
                    szStart = start.scale.z || 0; 
                    szDistance = (end.scale.z || 1) - szStart;
                    
                    raStart = start.rotate.angle || 0;
                    raDistance = (end.rotate.angle || 0) - raStart;
                    rxStart = start.rotate.x || 0;
                    rxDistance = (end.rotate.x || 0) - rxStart;
                    ryStart = start.rotate.y || 0;
                    ryDistance = (end.rotate.y || 0) - ryStart;
                    rzStart = start.rotate.z || 0;
                    rzDistance = (end.rotate.z || 0) - rzStart;
                    
                    duration = end.frame - start.frame + 1;
                    
                    currentTweenFrame = object.keyframe.currentTweenFrame;
                    
                    if((start.translate.x != end.translate.x) || (start.translate.y != end.translate.y) || (start.translate.z != end.translate.z)){
                        object.translate = {
                            x: ease(currentTweenFrame, txStart, txDistance, duration),
                            y: ease(currentTweenFrame, tyStart, tyDistance, duration),
                            z: ease(currentTweenFrame, tzStart, tzDistance, duration)
                        };
                    }
                    
                    if((start.scale.x != end.scale.x) || (start.scale.y != end.scale.y) || (start.scale.z != end.scale.z)){
                        object.scale = {
                            x: ease(currentTweenFrame, sxStart, sxDistance, duration),
                            y: ease(currentTweenFrame, syStart, syDistance, duration),
                            z: ease(currentTweenFrame, szStart, szDistance, duration)
                        };
                    }
                    
                    
                   if((start.rotate.angle != end.rotate.angle) || (start.rotate.x != end.rotate.x) || (start.rotate.y != end.rotate.y) || (start.rotate.z != end.rotate.z)){ 
                       object.rotate = {
                           angle: ease(currentTweenFrame, raStart, raDistance, duration),
                           x: ease(currentTweenFrame, rxStart, rxDistance, duration),
                           y: ease(currentTweenFrame, ryStart, ryDistance, duration),
                           z: ease(currentTweenFrame, rzStart, rzDistance, duration)
                       };
                   }
                    
                    
                    object.keyframe.currentTweenFrame++;
                }   else {
                 console.log(object.name + " is not being animated");
                }

            }

            if(currentTweenFrame === (end.frame + 1)){
                return true;
            } else {
                console.log( object.name + "'s current tween frame: " + currentTweenFrame + "\nend frame: " + end.frame);
                return false;
            }
            
            
    }
    


}
    

