
var Matrix4x4 = (function () {
    var matrix4x4 = function () {
        // JD: This is good, but please indent and space this
        //     better.
        if(arguments.length === 16){
            this.elements = [].slice.call(arguments);
        } else if (arguments.length === 0){
            this.elements = [ 1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1];
        } else {
            // JD: Nice touch.
            throw new Error("Invalid number of arguments");
        }
    };

    matrix4x4.prototype.getAMatrix = function() {
       return new matrix4x4();
    },

    // JD: Another nice touch, these two functions.
    //     Though I suggest that valueAt would be more
    //     useful if it takes a row and column instead
    //     of i; the way you have it, returnMatrix[i]
    //     can pretty much substitute for it.
    matrix4x4.prototype.returnMatrix = function () {
        return this.elements;
    };
    matrix4x4.prototype.valueAt = function (i) {
        if(i >= 0 && i < 16){
            return this.elements[Math.floor(i)];
        } else {
            throw new Error("No.");
        }
    };
    
    matrix4x4.prototype.toString = function(){
        var returnedMatrix = this.returnMatrix();
            returnString = 
        "[" + returnedMatrix[0] + ", " + returnedMatrix[1] + ", " + returnedMatrix[2] + ", " + returnedMatrix[3] + ",\n" 
        + returnedMatrix[4] + ", " + returnedMatrix[5] + ", " + returnedMatrix[6] + ", " + returnedMatrix[7] + ",\n" 
        + returnedMatrix[8] + ", " + returnedMatrix[9] + ", " + returnedMatrix[10] + ", " + returnedMatrix[11] + ",\n" 
        + returnedMatrix[12] + ", " + returnedMatrix[13] + ", " + returnedMatrix[14] + ", " + returnedMatrix[15] + "]";        
        
        return returnString;
    };

         
   matrix4x4.prototype.toWebGLMatrix = function(){
       var result = new matrix4x4();
       result.elements = [
           this.elements[0],
           this.elements[4],
           this.elements[8],
           this.elements[12],

           this.elements[1],
           this.elements[5],
           this.elements[9],
           this.elements[13],

           this.elements[2],
           this.elements[6],
           this.elements[10],
           this.elements[14],

           this.elements[3],
           this.elements[7],
           this.elements[11],
           this.elements[15]
      ];

      return result;
   };

    
    matrix4x4.prototype.multiply = function (m) {
        var result = new matrix4x4(),
            m0 = this.returnMatrix(),
            m1 = m.toWebGLMatrix().returnMatrix(),
            i = 0,
            j = 0;
        while(i < 16){
            result.elements[i] = (m0[i] * m1[0]) + (m0[i + 1] * m1[1]) + (m0[i + 2] * m1[2]) + (m0[i + 3] * m1[3]);
            result.elements[i + 1] = (m0[i] * m1[4]) + (m0[i + 1] * m1[5]) + (m0[i + 2] * m1[6]) + (m0[i + 3] * m1[7]);
            result.elements[i + 2] = (m0[i] * m1[8]) + (m0[i + 1] * m1[9]) + (m0[i + 2] * m1[10]) + (m0[i + 3] * m1[11]);
            result.elements[i + 3] = (m0[i] * m1[12]) + (m0[i + 1] * m1[13]) + (m0[i + 2] * m1[14]) + (m0[i + 3] * m1[15]);
            i += 4;
        }

        return result;
    };


    matrix4x4.prototype.translate = function (dx, dy, dz) {
        var result = new matrix4x4();
        result.elements = [1, 0, 0, dx,
                           0, 1, 0, dy,
                           0, 0, 1, dz,
                           0, 0, 0, 1];
        return result;
    }
      

    matrix4x4.prototype.scale = function (sx, sy, sz) {
        var result = new matrix4x4(),
            scaleX = sx,
            scaleY = sy,
            scaleZ = sz;
        result.elements = [scaleX,      0,      0,  0,
                                0, scaleY,      0,  0,
                                0,      0, scaleZ,  0,
                                0,      0,      0,  1];
        return result;
    }
     


    matrix4x4.prototype.rotate = function (angle, x, y, z) {
            var result = new matrix4x4(),
                axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
                s = Math.sin(angle * Math.PI / 180.0),
                c = Math.cos(angle * Math.PI / 180.0),
                oneMinusC = 1.0 - c,
                x2, 
                y2,
                z2,
                xy,
                yz,
                xz,
                xs,
                ys,
                zs;

            x /= axisLength;
            y /= axisLength;
            z /= axisLength;

            x2 = x * x;
            y2 = y * y;
            z2 = z * z;
            xy = x * y;
            yz = y * z;
            xz = x * z;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            result.elements = [
                (x2 * oneMinusC) + c,
                (xy * oneMinusC) - zs,
                (xz * oneMinusC) + ys,
                0.0,

                (xy * oneMinusC) + zs,
                (y2 * oneMinusC) + c,
                (yz * oneMinusC) - xs,
                0.0,

                (xz * oneMinusC) - ys,
                (yz * oneMinusC) + xs,
                (z2 * oneMinusC) + c,
                0.0,

                0.0,
                0.0,
                0.0,
                1.0
            ];
        return result;
    } 

    matrix4x4.prototype.ortho = function (left, right, bottom, top, zFar, zNear) {
        var result = new matrix4x4(),
            width = right - left,
            height = top - bottom,
            depth = zFar - zNear;
        
        result.elements = [
               2.0/width,        0.0,        0.0, -(right + left) / width,
                     0.0, 2.0/height,        0.0, -(top + bottom) / height,
                     0.0,        0.0, -2.0/depth, -(zFar + zNear) / depth,
                     0.0,        0.0,        0.0,                        1];


        return result;
    }

    matrix4x4.prototype.frustum = function (left, right, bottom, top, Far, Near) {
        var result = new matrix4x4();
       
        result.elements = [
                   (2.0 * Near) / (right - left),
                                             0.0, 
                 (right + left) / (right - left), 
                                             0.0,
 
                                             0.0, 
                   (2.0 * Near) / (top - bottom), 
                 (top + bottom) / (top - bottom), 
                                             0.0,

                                             0.0,
                                             0.0,
                    -(Far + Near) / (Far - Near),
                (-2 * Near * Far) / (Far - Near), 
             
                                             0.0,
                                             0.0,  
                                            -1.0,                       
                                             0.0
        ];


        return result;
    }


    //  The set up of this mirror matrix can only currently handle 
    //  reflections over  ONLY ONE of either the x, y, or z axes 
    matrix4x4.prototype.mirror = function (axis){
        var result = new matrix4x4(),
            xM = 1,
            yM = 1,
            zM = 1;
        if(axis === 0){
            xM = -1
        } else if (axis === 1) {
            yM = -1
        } else if(axis === 2){
            zM = -1
        } else {
            console.log("callin the mirror function without declaring and x, y, or z axis? uncool");
        }
        
        result.elements = [ xM, 0, 0, 0,
                            0, yM, 0, 0,
                            0, 0, zM, 0,
                            0, 0, 0, 1 ];
        return result;  
    }
    
    matrix4x4.prototype.lookAt = function (px, py, pz, qx, qy, qz, ux, uy, uz){
        var pVector = new Vector(px, py, pz),
            qVector = new Vector(qx, qy, qz),
            upVector = new Vector(ux, uy, uz),
            z = pVector.subtract(qVector).normalize(),
            y = (upVector.subtract(upVector.projection(z))).normalize(),
            x = y.cross(z),
            returnMatrix = new Matrix4x4();
            
        returnMatrix.elements = [ x.x(), y.x(), z.x(), -(pVector.dot(x)), 
                                  x.y(), y.y(), z.y(), -(pVector.dot(y)),
                                  x.z(), y.z(), z.z(), -(pVector.dot(z)),
                                      0,     0,     0,            1 ]; 
        return returnMatrix;           
    }
    
    


 

    return matrix4x4;


})();
