/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {


    /*
     * This creates a very angular piece of bread insides
     */
    bread: function () {
        var topLeft = [
                [0.0, 4.0, 0.0],
                [-2.0, 4.0, 0.0],
                [-2.0, 0.0, 0.0],
                [0.0, 0.0, 0.0],

                [-2.0, 5.0, 0.0],
                [-3.0, 5.0, 0.0],
                [-3.0, 0.0, 0.0],
                [-2.0, 0.0, 0.0],                

                [-3.0, 6.0, 0.0],
                [-4.0, 6.0, 0.0],
                [-4.0, 0.0, 0.0],
                [-3.0, 0.0, 0.0],

                [-4.0, 6.0, 0.0],
                [-5.0, 6.0, 0.0],
                [-5.0, 1.0, 0.0],
                [-4.0, 1.0, 0.0],

                [-5.0, 5.0, 0.0],
                [-6.0, 5.0, 0.0],
                [-6.0, 1.0, 0.0],
                [-5.0, 1.0, 0.0]
            ],

           bottomLeft = [
                [0.0, 0.0, 0.0],
                [-4.0, 0.0, 0.0],
                [-4.0, -6.0, 0.0],
                [0.0, -6.0, 0.0]
            ],

        topRight = [],
        bottomRight = [],
        frontVertices = [],
        backVertices = [],
        breadVertices =[],
        breadIndicies = [],
        k = 0,
        i = 0;

        frontVertices = frontVertices.concat(topLeft);

        
        frontVertices = frontVertices.concat(bottomLeft);

        
        for(i = 0; i < topLeft.length; i++){
            var topLeftVertice = topLeft[i],
               newTRVertice = [-topLeftVertice[0], topLeftVertice[1], 0.0];
            topRight.push(newTRVertice);
        }
     
        frontVertices = frontVertices.concat(topRight);

        
        for(i = 0; i < bottomLeft.length; i++){
            var bottomLeftVertice = bottomLeft[i],
               newBRVertice = [-bottomLeftVertice[0], bottomLeftVertice[1], 0.0];
            bottomRight.push(newBRVertice);
        }
        frontVertices = frontVertices.concat(bottomRight);
        
        breadVertices = breadVertices.concat(frontVertices);
        for(i = 0; i < frontVertices.length; i++){
            var vertice = frontVertices[i],
                newBackVerticie = [vertice[0], vertice[1], -1.0];
            backVertices.push(newBackVerticie);
        }
        breadVertices = breadVertices.concat(backVertices);
        
        k = breadVertices.length;

        for(i = 0; i < k; i += 4){
            breadIndicies.push([i, (i + 1), (i + 2)]);            
            breadIndicies.push([i, (i + 2), (i + 3)]);
        }

       for (i = 0; i < k/2; i++){
           if(breadVertices[i][0] === breadVertices[i+1][0]){
               breadIndicies.push([(i + k/2), i, (i + 2)]);
               breadIndicies.push([(i + k/2), (i + 2), (i + k/2 + 2)]);
           }else if(breadVertices[i][1] === breadVertices[i+1][1]){
               breadIndicies.push([(i + k/2), (i + k/2 + 1), (i + 1)]);
               breadIndicies.push([(i + k/2), (i + 1), i]);
           }
       }


        return {
            vertices: breadVertices,
            indices: breadIndicies
        };

    },

    cube: function () {
        return {
            vertices: [
                [ 0.5, 0.5, 0.5 ],
                [ 0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, 0.5 ],
                [ 0.5, -0.5, 0.5 ],
                [ 0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, 0.5 ]
            ],

            indices: [
                [ 0, 1, 3 ],
                [ 2, 3, 1 ],
                [ 0, 3, 4 ],
                [ 7, 4, 3 ],
                [ 0, 4, 1 ],
                [ 5, 1, 4 ],
                [ 1, 5, 6 ],
                [ 2, 1, 6 ],
                [ 2, 7, 3 ],
                [ 6, 7, 2 ],
                [ 4, 7, 6 ],
                [ 5, 4, 6 ]
            ]
        };
    },

    crust: function () {
        var topLeft = [
                [0.0, 5.0, 0.0],
                [-2.0, 5.0, 0.0],
                [-2.0, 4.0, 0.0],
                [0.0, 4.0, 0.0],

                [-1.0, 6.0, 0.0],
                [-3.0, 6.0, 0.0],
                [-3.0, 5.0, 0.0],
                [-1.0, 5.0, 0.0],                

                [-2.0, 7.0, 0.0],
                [-6.0, 7.0, 0.0],
                [-6.0, 6.0, 0.0],
                [-2.0, 6.0, 0.0],

                [-5.0, 6.0, 0.0],
                [-6.0, 6.0, 0.0],
                [-6.0, 5.0, 0.0],
                [-5.0, 5.0, 0.0],

                [-6.0, 6.0, 0.0],
                [-7.0, 6.0, 0.0],
                [-7.0, 1.0, 0.0],
                [-6.0, 1.0, 0.0],

                [-4.0, 1.0, 0.0],
                [-6.0, 1.0, 0.0],
                [-6.0, 0.0, 0.0],
                [-4.0, 0.0, 0.0]
            ],

           bottomLeft = [
                [-4.0, 0.0, 0.0],
                [-5.0, 0.0, 0.0],
                [-5.0, -7.0, 0.0],
                [-4.0, -7.0, 0.0],

                [0.0, -6.0, 0.0],
                [-4.0, -6.0, 0.0],
                [-4.0, -7.0, 0.0],
                [0.0, -7.0, 0.0]
            ],

        topRight  = [],
        bottomRight  = [],
        frontVertices  = [],
        backVertices = [],
        crustVertices = [],
        crustIndicies = [],
        i = 0;

        frontVertices.concat(topLeft);
        frontVertices.concat(bottomLeft);
        for(i = 0; i < topLeft.length; i++){
            var topLeftVertice = topLeft[i],
               newTRVertice = [-topLeftVertice[0], topLeftVertice[0], 0.0];
            topRight.push(newTRVertice);
        }
        frontVertices.push(topRight);
        for(i = 0; i < bottomLeft.length; i++){
            var bottomLeftVertice = bottomLeft[i],
               newBRVertice = [-bottomLeftVertice[0], bottomLeftVertice[1], 0.0];
            bottomRight.push(newBRVertice);
        }
        frontVertices.concat(bottomRight);
        crustVertices.concat(frontVertices);
        for(i = 0; i < frontVertices.length; i++){
            var vertice = frontVertices[i],
                newBackVerticie = [vertice[0], vertice[1], -1.0];
            backVertices.push(newBackVerticie);
        }
        crustVertices.concat(backVertices);

        for(i = 0; i < crustVertices.length; i+=4){
            crustIndicies.push([i, (i + 1), (i + 2)]);            
            crustIndicies.push([i, (i + 2), (i + 3)]);
        }

        for(i = (crustVertices.length/2); i < crustVertices.length; i+=4){
            crustIndicies.push([i, (i + 1), (i - (crustVertices.length/2) + 1)]);            
            crustIndicies.push([i, (i - (crustVertices.length/2) + 1), (i - (crustVertices.length/2))]);
        }

        return{
            vertices: crustVertices,
            indices: crustIndicies
        }

    },


    cylinder: function () {
        var h = 0.5,
            q = 0.25,
            m = 0.433012702;

        // JD: This is nicely done and nearly complete (I think you are missing
        //     a face or two), but this is borderline better done computationally
        //     (i.e., loop around the circle, calculate vertices and indices
        //     based on that).
        return {
            vertices: [
              [ 0.0, h, 0.0 ],
              [ h, h, 0.0 ],
              [ m, h, q ],
              [ q, h, m ],
              [ 0.0, h, h ],
              [ -q, h, m ],
              [ -m, h, q ],
              [ -h, h, 0.0 ],
              [ -m, h, -q ],
              [ -q, h, -m ],
              [ 0.0, h, -h ],
              [ q, h, -m ],
              [ m, h, -q ],
              [ 0.0, -h, 0.0 ],
              [ h, -h, 0.0 ],
              [ m, -h, q ],
              [ q, -h, m ],
              [ 0.0, -h, h ],
              [ -q, -h, m ],
              [ -m, -h, q ],
              [ -h, -h, 0.0 ],
              [ -m, -h, -q ],
              [ -q, -h, -m ],
              [ 0.0, -h, -h ],
              [ q, -h, -m ],
              [ m, -h, -q ],
            ],

            indices: [
              [ 0, 1, 2 ],
              [ 0, 2, 3 ],
              [ 0, 3, 4 ],
              [ 0, 4, 5 ],
              [ 0, 5, 6 ],
              [ 0, 6, 7 ],
              [ 0, 7, 8 ],
              [ 0, 8, 9 ],
              [ 0, 9, 10 ],
              [ 0, 10, 11 ],
              [ 0, 11, 12 ],
              [ 0, 12, 1 ],
              [ 0, 12, 1 ],

              [ 1, 14, 15 ],
              [ 2, 1, 15 ],
              [ 2, 15, 16 ],
              [ 3, 2, 16 ],
              [ 3, 16, 17 ],
              [ 4, 3, 17 ],
              [ 4, 17, 18 ],
              [ 5, 4, 18 ],
              [ 5, 18, 19 ],
              [ 6, 5, 19 ],
              [ 6, 19, 20 ],
              [ 7, 6, 20 ],
              [ 7, 20, 21 ],
              [ 8, 8, 21 ],
              [ 8, 21, 22 ],
              [ 9, 8, 22 ],
              [ 9, 22, 23 ],
              [ 10, 9, 23 ],
              [ 10, 23, 24 ],
              [ 11, 10, 24 ],
              [ 11, 24, 25 ],
              [ 12, 11, 25 ],
              [ 12, 25, 14 ],
              [ 1, 12, 14 ],


              [ 13, 14, 15 ],
              [ 13, 15, 16 ],
              [ 13, 16, 17 ],
              [ 13, 17, 18 ],
              [ 13, 18, 19 ],
              [ 13, 19, 20 ],
              [ 13, 20, 21 ],
              [ 13, 21, 22 ],
              [ 13, 22, 23 ],
              [ 13, 23, 24 ],
              [ 13, 24, 25 ],
              [ 13, 25, 1 ]
            ]
        };
    },

    icosahedron: function () {
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    jelly: function () {
        var topLeft = [
                [0.0, 4.0, 1.0],
                [-1.5, 4.0, 1.0],
                [-1.5, 0.0, 1.0],
                [0.0, 0.0, 1.0],

                [-1.5, 3.5, 1.0],
                [-2.25, 3.5, 1.0],
                [-2.25, 0.0, 1.0],
                [-1.5, 0.0, 1.0],

                [-2.25, 3.0, 1.0],
                [-2.5, 3.0, 1.0],
                [-2.5, 0.0, 1.0],
                [-2.25, 0.0, 1.0],
                
                [-2.5, 2.5, 1.0],
                [-3.0, 2.5, 1.0],
                [-3.0, 0.0, 1.0],
                [-2.5, 0.0, 1.0],

                [-3.0, 1.8, 1.0],
                [-3.3, 1.8, 1.0],
                [-3.3, 0.0, 1.0],
                [-3.0, 0.0, 1.0],

                [-3.3, 1.0, 1.0],
                [-4.0, 1.0, 1.0],
                [-4.0, 0.0, 1.0],
                [-3.3, 0.0, 1.0]
            ],

           bottomLeft = [
                [0.0, 0.0, 1.0],
                [-1.8, 0.0, 1.0],
                [-1.8, -3.5, 1.0],
                [0.0, -3.5, 1.0],

                [-1.8, 0.0, 1.0],
                [-3.15, 0.0, 1.0],
                [-3.15, -3.2, 1.0],
                [-1.8, -3.2, 1.0],

                [-3.15, 0.0, 1.0],
                [-3.5, 0.0, 1.0],
                [-3.5, -2.9, 1.0],
                [-3.15, -2.9, 1.0],

                [-3.5, 0.0, 1.0],
                [-4.0, 0.0, 1.0],
                [-4.0, -1.6, 1.0],
                [-3.5, -1.6, 1.0]
            ],

        topRight  = [],
        bottomRight = [],
        frontVertices = [],
        backVertices = [],
        jellyVertices = [],
        jellyIndicies = [],
        i = 0;

        frontVertices.concat(topLeft);
        frontVertices.concat(bottomLeft);
        for(i = 0; i < topLeft.length; i++){
            var topLeftVertice = topLeft[i],
               newTRVertice = [-topLeftVertice[0], topLeftVertice[0], 0.0];
            topRight.push(newTRVertice);
        }
        frontVertices.push(topRight);
        for(i = 0; i < bottomLeft.length; i++){
            var bottomLeftVertice = bottomLeft[i],
               newBRVertice = [-bottomLeftVertice[0], bottomLeftVertice[1], 0.0];
            bottomRight.push(newBRVertice);
        }
        frontVertices.concat(bottomRight);
        jellyVertices.concat(frontVertices);
        for(i = 0; i < frontVertices.length; i++){
            var vertice = frontVertices[i],
                newBackVerticie = [vertice[0], vertice[1], 0.0];
            backVertices.push(newBackVerticie);
        }
        jellyVertices.concat(backVertices);

        for(i = 0; i < jellyVertices.length; i+=4){
            jellyIndicies.push([i, (i + 1), (i + 2)]);            
            jellyIndicies.push([i, (i + 2), (i + 3)]);
        }

        for(i = (jellyVertices.length/2); i < jellyVertices.length; i+=4){
            jellyIndicies.push([i, (i + 1), (i - (jellyVertices.length/2) + 1)]);            
            jellyIndicies.push([i, (i - (jellyVertices.length/2) + 1), (i - (jellyVertices.length/2))]);
        }


        return{
            vertices: jellyVertices,
            indices: jellyIndicies
        }

    },


    sphere: function () {
        var vertices = [],
           indicies = [],
           radius = 0.5,
           latDiv = 20,
           longDiv = 40,
           currentAngle,
           i,
           j,
           x,
           y,
           z;

        //Creates Vertices
        for(i = 0; i < latDiv; i++){
            y = radius - (i / latDiv);
            while(j < longDiv){ 
                currentAngle = (j / longDiv) * 360;
                x = radius * Math.cos(currentAngle);
                z = radius * Math.sin(currentAngle);
                vertices.push([x, y, z]);
                j++;
            }
            j = 0;
        }

        //Creates faces
        j = vertices.length;
        indicies.push([vertices[0], vertices[(longDiv - 1)], vertices[((2 * longDiv) - 1)]]);
        indicies.push([vertices[0], vertices[(2 * longDiv) -1], vertices[(2 * longDiv)]]);
        
        for(i = 1; i < j; i++) {
            indicies.push([vertices[i], vertices[(i - 1)], vertices[(i - 1) + longDiv]]);
            indicies.push([vertices[i], vertices[(i - 1) + longDiv], vertices[i + longDiv]]);
        }

        { return {
                vertices: vertices,
                indicies: indicies
        };
       }
    },

  
    sqPyramid: function () {
        var y = 0.707106781,
           half = 0.5;

        return {
            vertices: [
                [ 0.0, y, 0.0 ],
                [ -half, 0.0, half ],
                [ -half, 0.0, -half ],
                [ half, 0.0, -half ],
                [ half, 0.0, half ]
            ],

            indices: [
                [ 0, 1, 2 ],
                [ 0, 2, 3 ],
                [ 0, 3, 4 ],
                [ 0, 4, 1 ],
                [ 1, 4, 2 ],
                [ 4, 3, 2 ],

            ]
        };
    },





    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );

            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    },

    toNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p0,
            p1,
            p2,
            v0,
            v1,
            v2,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // We form vectors from the first and second then second and third vertices.
            p0 = indexedVertices.vertices[indexedVertices.indices[i][0]];
            p1 = indexedVertices.vertices[indexedVertices.indices[i][1]];
            p2 = indexedVertices.vertices[indexedVertices.indices[i][2]];

            // Technically, the first value is not a vector, but v can stand for vertex
            // anyway, so...
            v0 = new Vector(p0[0], p0[1], p0[2]);
            v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
            v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
            normal = v1.cross(v2).unit();

            // We then use this same normal for every vertex in this face.
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    },

    /*
     * Another utility function for computing normals, this time just converting
     * every vertex into its unit vector version.  This works mainly for objects
     * that are centered around the origin.
     */
    toVertexNormalArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj,
            p,
            normal;

        // For each face...
        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            // For each vertex in that face...
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                p = indexedVertices.vertices[indexedVertices.indices[i][j]];
                normal = new Vector(p[0], p[1], p[2]).unit();
                result = result.concat(
                    [ normal.x(), normal.y(), normal.z() ]
                );
            }
        }

        return result;
    },
    
    verticesToString: function (indexedVertices){
        var returnedString = "",
            i,
            maxi;
            
         for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
             returnedString = returnedString +  
             "[" +indexedVertices.vertices[i][0] + ", " + indexedVertices.vertices[i][1] + ", "+ indexedVertices.vertices[i][2] + "] \n";
         }
         return returnedString;           
    }
};
