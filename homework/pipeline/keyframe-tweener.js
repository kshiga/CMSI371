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
                ease,
                startKeyframe,
                endKeyframe,
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
                
                if(object.keyframes && object.activeAnim){
                                        
                    ease = object.keyframe.ease || KeyframeTweener.linear;
                    txStart = object.translate.x || 0;
                    txDistance = object.keyframe.tx || 0;
                    tyStart = object.translate.y || 0;
                    tyDistance = object.keyframe.ty || 0;
                    tzStart = object.translate.z || 0;
                    tzDistance = object.keyframe.tz || 0;
                    sxStart = object.scale.x || 0; 
                    sxDistance = object.keyframe.sx || 1;
                    syStart = object.scale.y || 0; 
                    syDistance = object.keyframe.sy || 1;
                    szStart = object.scale.z || 0; 
                    szDistance = object.keyframe.sz || 1;
                    rxStart = object.rotate.x || 0;
                    rxDistance = object.keyframe.rx || 0;
                    ryStart = object.rotate.y || 0;
                    ryDistance = object.keyframe.ry || 0;
                    rzStart = object.rotate.z || 0;
                    rzDistance = object.keyframe.rz || 0;
                    raStart = object.rotate.currentAngle || 0;
                    raDistance = object.keyframe.rA || 0;
                    duration = object.keyframe.end - object.keyframe.start +1;
                    currentTweenFrame = object.currentTweenFrame;
                    duration = endKeyframe.frame - startKeyframe.frame + 1;
                    
                    
                    object.translate = {
                        x: ease(currentTweenFrame, txStart, txDistance, duration),
                        y: ease(currentTweenFrame, tyStart, tyDistance, duration),
                        z: ease(currentTweenFrame, tzStart, tzDistance, duration)
                    };
                    
                    object.scale = {
                        x: ease(currentTweenFrame, sxStart, sxDistance, duration),
                        y: ease(currentTweenFrame, syStart, syDistance, duration),
                        z: ease(currentTweenFrame, szStart, szDistance, duration)
                    };
                    
                    object.rotate = {
                        currentAngle: ease(currentTweenFrame, raStart, raDistance, duration),
                        x: ease(currentTweenFrame, rxStart, rxDistance, duration),
                        y: ease(currentTweenFrame, ryStart, ryDistance, duration),
                        z: ease(currentTweenFrame, rzStart, rzDistance, duration)
                    };
                    
                    object.currentTweenFrame++;
                }

                // wrap in while stmt, while currentTF != to keyframe.end, keep calling this function.
                
            }

};
    

