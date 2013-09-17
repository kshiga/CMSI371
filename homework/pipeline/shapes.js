/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    bread : function() {
        var topLeft = [[0.0, 4.0, 0.0], 
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
                       [-5.0, 1.0, 0.0]],
                        
            bottomLeft = [[0.0, 0.0, 0.0], 
                          [-4.0, 0.0, 0.0], 
                          [-4.0, -6.0, 0.0], 
                          [0.0, -6.0, 0.0]], 
            topRight = [], 
            bottomRight = [], 
            frontVertices = [], 
            backVertices = [], 
            breadVertices = [], 
            breadIndices = [], 
            k = 0, 
            i = 0;

        frontVertices = frontVertices.concat(topLeft);
        frontVertices = frontVertices.concat(bottomLeft);

        for ( i = 0; i < topLeft.length; i++) {
            var topLeftVertice = topLeft[i], newTRVertice = [-topLeftVertice[0], topLeftVertice[1], 0.0];
            topRight.push(newTRVertice);
        }

        frontVertices = frontVertices.concat(topRight);

        for ( i = 0; i < bottomLeft.length; i++) {
            var bottomLeftVertice = bottomLeft[i], newBRVertice = [-bottomLeftVertice[0], bottomLeftVertice[1], 0.0];
            bottomRight.push(newBRVertice);
        }
        frontVertices = frontVertices.concat(bottomRight);

        breadVertices = breadVertices.concat(frontVertices);
        for ( i = 0; i < frontVertices.length; i++) {
            var vertice = frontVertices[i], newBackVerticie = [vertice[0], vertice[1], -1.0];
            backVertices.push(newBackVerticie);
        }
        breadVertices = breadVertices.concat(backVertices);

        k = breadVertices.length;
        for ( i = 0; i < k; i += 4) {
            breadIndices.push([i, (i + 1), (i + 2)]);
            breadIndices.push([i, (i + 2), (i + 3)]);
        }
        for ( i = 0; i < k / 2; i++) {
            if (breadVertices[i][0] === breadVertices[i+1][0]) {
                breadIndices.push([(i + k / 2), i, (i + 2)]);

                if ((i + k / 2 + 2) > k) {
                    breadIndices.push([(i + k / 2), (i + 2), 1]);
                } else {
                    breadIndices.push([(i + k / 2), (i + 2), (i + k / 2 + 2)]);
                }
            } else if (breadVertices[i][1] === breadVertices[i+1][1]) {
                breadIndices.push([(i + k / 2), (i + k / 2 + 1), (i + 1)]);
                breadIndices.push([(i + k / 2), (i + 1), i]);
            }
        }

        for ( i = 0; i < breadIndices.length; i++) {
            if (breadIndices[i][0] > k || breadIndices[i][0] < 0) {
                console.log("Index " + i + " at 0 failed: " + breadIndices[i][0]);
            } else if (breadIndices[i][1] > k || breadIndices[i][1] < 0) {
                console.log("Index " + i + " at 1 failed: " + breadIndices[i][1]);
            } else if (breadIndices[i][2] > k || breadIndices[i][2] < 0) {
                console.log("Index " + i + " at 2 failed: " + breadIndices[i][2]);
            }
        }

        return {
            vertices : breadVertices,
            indices : breadIndices
        };

    },

    cube : function() {
        return {
            vertices : [[0.3, 0.3, 0.5], 
                        [0.5, 0.5, -0.5], 
                        [-0.5, 0.5, -0.5], 
                        [-0.3, 0.3, 0.5], 
                        [0.3, -0.3, 0.5], 
                        [0.5, -0.5, -0.5], 
                        [-0.5, -0.5, -0.5], 
                        [-0.3, -0.3, 0.5]],

            indices : [[0, 1, 3], 
                       [2, 3, 1], 
                       [0, 3, 4], 
                       [7, 4, 3], 
                       [0, 4, 1], 
                       [5, 1, 4], 
                       [1, 5, 6], 
                       [2, 1, 6], 
                       [2, 7, 3], 
                       [6, 7, 2], 
                       [4, 7, 6], 
                       [5, 4, 6]],

            textureCoords : [
            //top
            1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,

            //front
            1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

            //right
            0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0,

            //back
            1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0,

            //left
            1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0,

            //bottom
            1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0]
        };
    },

    crust : function() {
        var topLeft = [[0.0, 5.0, 0.0], 
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
                       [-4.0, 0.0, 0.0]],
                        
            bottomLeft = [[-4.0, 0.0, 0.0], 
                          [-5.0, 0.0, 0.0], 
                          [-5.0, -7.0, 0.0], 
                          [-4.0, -7.0, 0.0], 
                          [0.0, -6.0, 0.0], 
                          [-4.0, -6.0, 0.0], 
                          [-4.0, -7.0, 0.0], 
                          [0.0, -7.0, 0.0]], 
            topRight = [], 
            bottomRight = [], 
            frontVertices = [], 
            backVertices = [], 
            crustVertices = [], 
            crustIndices = [], 
            k = 0, 
            i = 0;

        frontVertices = frontVertices.concat(topLeft);
        frontVertices = frontVertices.concat(bottomLeft);

        for ( i = 0; i < topLeft.length; i++) {
            var topLeftVertice = topLeft[i], newTRVertice = [-topLeftVertice[0], topLeftVertice[1], 0.0];
            topRight.push(newTRVertice);
        }
        frontVertices = frontVertices.concat(topRight);

        for ( i = 0; i < bottomLeft.length; i++) {
            var bottomLeftVertice = bottomLeft[i], newBRVertice = [-bottomLeftVertice[0], bottomLeftVertice[1], 0.0];
            bottomRight.push(newBRVertice);
        }
        frontVertices = frontVertices.concat(bottomRight);
        crustVertices = crustVertices.concat(frontVertices);

        for ( i = 0; i < frontVertices.length; i++) {
            var vertice = frontVertices[i], newBackVerticie = [vertice[0], vertice[1], -1.0];
            backVertices.push(newBackVerticie);
        }

        crustVertices = crustVertices.concat(backVertices);

        k = crustVertices.length;
        for ( i = 0; i < k; i += 4) {
            crustIndices.push([i, (i + 1), (i + 2)]);
            crustIndices.push([i, (i + 2), (i + 3)]);
        }
        for ( i = 0; i < (k / 2); i++) {
            if (crustVertices[i][0] === crustVertices[i+1][0]) {
                if (!(i === 63 || i === 31  )) {
                    crustIndices.push([(i + k / 2), i, (i + 2)]);
                    crustIndices.push([(i + k / 2), (i + 2), (i + k / 2 + 2)]);
                } else {
                    crustIndices.push([(i + k / 2 - 3), (i - 3), i]);
                    crustIndices.push([(i + k / 2 - 3), (i + k / 2), i]);
                }
            } else if (crustVertices[i][1] === crustVertices[i+1][1]) {
                crustIndices.push([(i + k / 2), (i + k / 2 + 1), (i + 1)]);
                crustIndices.push([(i + k / 2), (i + 1), i]);
            }
        }

        for ( i = 0; i < crustIndices.length; i++) {
            if (crustIndices[i][0] > k || crustIndices[i][0] < 0) {
                console.log("Index " + i + " at 0 failed: " + crustIndices[i][0]);
            } else if (crustIndices[i][1] > k || crustIndices[i][1] < 0) {
                console.log("Index " + i + " at 1 failed: " + crustIndices[i][1]);
            } else if (crustIndices[i][2] > k || crustIndices[i][2] < 0) {
                console.log("Index " + i + " at 2 failed: " + crustIndices[i][2]);
            }
        }

        return {
            vertices : crustVertices,
            indices : crustIndices
        };
    },

    drip : function() {
        var left = [[0.0, 9.0, 0.0], 
                    [-1.0, 9.0, 0.0], 
                    [-1.0, -5.0, 0.0], 
                    [0.0, -5.0, 0.0], 
                    [-1.0, 8.0, 0.0], 
                    [-2.0, 8.0, 0.0], 
                    [-2.0, -5.0, 0.0], 
                    [-1.0, -5.0, 0.0], 
                    [-2.0, 6.0, 0.0], 
                    [-3.0, 6.0, 0.0], 
                    [-3.0, -4.0, 0.0], 
                    [-2.0, -4.0, 0.0], 
                    [-3.0, 4.0, 0.0], 
                    [-4.0, 4.0, 0.0], 
                    [-4.0, -4.0, 0.0], 
                    [-3.0, -4.0, 0.0], 
                    [-4.0, 3.0, 0.0], 
                    [-5.0, 3.0, 0.0], 
                    [-5.0, -3.0, 0.0], 
                    [-4.0, -3.0, 0.0], 
                    [-5.0, 1.0, 0.0], 
                    [-6.0, 1.0, 0.0], 
                    [-6.0, -2.0, 0.0], 
                    [-5.0, -2.0, 0.0]], 
            right = [], 
            frontVertices = [], 
            backVertices = [], 
            dripVertices = [], 
            dripIndices = [], 
            k = 0, 
            i = 0;

        frontVertices = frontVertices.concat(left);

        for ( i = 0; i < left.length; i++) {
            var leftVertice = left[i], newRVertice = [-leftVertice[0], leftVertice[1], 0.0];
            right.push(newRVertice);
        }

        frontVertices = frontVertices.concat(right);
        dripVertices = dripVertices.concat(frontVertices);
        for ( i = 0; i < frontVertices.length; i++) {
            var vertice = frontVertices[i], newBackVerticie = [vertice[0], vertice[1], -1.0];
            backVertices.push(newBackVerticie);
        }
        dripVertices = dripVertices.concat(backVertices);

        k = dripVertices.length;

        for ( i = 0; i < k; i += 4) {
            dripIndices.push([i, (i + 1), (i + 2)]);
            dripIndices.push([i, (i + 2), (i + 3)]);
        }

        for ( i = 0; i < k / 2; i++) {
            if (dripVertices[i][0] === dripVertices[i+1][0]) {
                dripIndices.push([(i + k / 2), i, (i + 2)]);

                if ((i + k / 2 + 2) > k) {
                    dripIndices.push([(i + k / 2), (i + 2), 1]);
                } else {
                    dripIndices.push([(i + k / 2), (i + 2), (i + k / 2 + 2)]);
                }

            } else if (dripVertices[i][1] === dripVertices[i+1][1]) {
                dripIndices.push([(i + k / 2), (i + k / 2 + 1), (i + 1)]);
                dripIndices.push([(i + k / 2), (i + 1), i]);
            }
        }

        for ( i = 0; i < dripIndices.length; i++) {
            if (dripIndices[i][0] > k || dripIndices[i][0] < 0) {
                console.log("Index " + i + " at 0 failed: " + dripIndices[i][0]);
            } else if (dripIndices[i][1] > k || dripIndices[i][1] < 0) {
                console.log("Index " + i + " at 1 failed: " + jellyIndices[i][1]);
            } else if (dripIndices[i][2] > k || dripIndices[i][2] < 0) {
                console.log("Index " + i + " at 2 failed: " + dripIndices[i][2]);
            }
        }

        return {
            vertices : dripVertices,
            indices : dripIndices
        };
    },

    icosahedron : function() {
        var X = 0.525731112119133606, Z = 0.850650808352039932;

        return {
            vertices : [[-X, 0.0, Z], 
                        [X, 0.0, Z], 
                        [-X, 0.0, -Z], 
                        [X, 0.0, -Z], 
                        [0.0, Z, X], 
                        [0.0, Z, -X], 
                        [0.0, -Z, X], 
                        [0.0, -Z, -X], 
                        [Z, X, 0.0], 
                        [-Z, X, 0.0], 
                        [Z, -X, 0.0], 
                        [-Z, -X, 0.0]],

            indices : [[1, 4, 0], 
                       [4, 9, 0], 
                       [4, 5, 9], 
                       [8, 5, 4], 
                       [1, 8, 4], 
                       [1, 10, 8], 
                       [10, 3, 8], 
                       [8, 3, 5], 
                       [3, 2, 5], 
                       [3, 7, 2], 
                       [3, 10, 7], 
                       [10, 6, 7], 
                       [6, 11, 7], 
                       [6, 0, 11], 
                       [6, 1, 0], 
                       [10, 1, 6], 
                       [11, 0, 9], 
                       [2, 11, 9], 
                       [5, 2, 9], 
                       [11, 2, 7]]
        };
    },

    jelly : function() {
        var left = [[0.0, 3.5, 0.0], 
                    [-1.8, 3.5, 0.0], 
                    [-1.8, -4.5, 0.0], 
                    [0.0, -4.5, 0.0], 
                    [-1.8, 3.2, 0.0], 
                    [-3.15, 3.2, 0.0], 
                    [-3.15, -3.2, 0.0], 
                    [-1.8, -3.2, 0.0], 
                    [-3.15, 2.9, 0.0], 
                    [-3.5, 2.9, 0.0], 
                    [-3.5, -2.9, 0.0], 
                    [-3.15, -2.9, 0.0], 
                    [-3.5, 1.6, 0.0], 
                    [-4.0, 1.6, 0.0], 
                    [-4.0, -1.6, 0.0], 
                    [-3.5, -1.6, 0.0]], 
            right = [], 
            frontVertices = [], 
            backVertices = [], 
            jellyVertices = [], 
            jellyIndices = [], 
            k = 0, 
            i = 0;

        frontVertices = frontVertices.concat(left);

        for ( i = 0; i < left.length; i++) {
            var leftVertice = left[i], newRVertice = [-leftVertice[0], leftVertice[1], 0.0];
            right.push(newRVertice);
        }
        frontVertices = frontVertices.concat(right);
        jellyVertices = jellyVertices.concat(frontVertices);
        for ( i = 0; i < frontVertices.length; i++) {
            var vertice = frontVertices[i], newBackVerticie = [vertice[0], vertice[1], -1.0];
            backVertices.push(newBackVerticie);
        }
        jellyVertices = jellyVertices.concat(backVertices);

        k = jellyVertices.length;

        for ( i = 0; i < k; i += 4) {
            jellyIndices.push([i, (i + 1), (i + 2)]);
            jellyIndices.push([i, (i + 2), (i + 3)]);
        }

        for ( i = 0; i < k / 2; i++) {
            if (jellyVertices[i][0] === jellyVertices[i+1][0]) {
                jellyIndices.push([(i + k / 2), i, (i + 2)]);

                if ((i + k / 2 + 2) > k) {
                    jellyIndices.push([(i + k / 2), (i + 2), 1]);
                } else {
                    jellyIndices.push([(i + k / 2), (i + 2), (i + k / 2 + 2)]);
                }
            } else if (jellyVertices[i][1] === jellyVertices[i+1][1]) {
                jellyIndices.push([(i + k / 2), (i + k / 2 + 1), (i + 1)]);
                jellyIndices.push([(i + k / 2), (i + 1), i]);
            }
        }

        for ( i = 0; i < jellyIndices.length; i++) {
            if (jellyIndices[i][0] > k || jellyIndices[i][0] < 0) {
                console.log("Index " + i + " at 0 failed: " + jellyIndices[i][0]);
            } else if (jellyIndices[i][1] > k || jellyIndices[i][1] < 0) {
                console.log("Index " + i + " at 1 failed: " + jellyIndices[i][1]);
            } else if (jellyIndices[i][2] > k || jellyIndices[i][2] < 0) {
                console.log("Index " + i + " at 2 failed: " + jellyIndices[i][2]);
            }
        }

        return {
            vertices : jellyVertices,
            indices : jellyIndices
        };
    },

    sphere : function() {
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

        for ( i = 0; i < latDiv; i++) {
            y = radius - (i / latDiv);
            while (j < longDiv) {
                currentAngle = (j / longDiv) * 360;
                x = radius * Math.cos(currentAngle);
                z = radius * Math.sin(currentAngle);
                vertices.push([x, y, z]);
                j++;
            }
            j = 0;
        }

        j = vertices.length;
        indicies.push([vertices[0], vertices[(longDiv - 1)], vertices[((2 * longDiv) - 1)]]);
        indicies.push([vertices[0], vertices[(2 * longDiv) - 1], vertices[(2 * longDiv)]]);

        for ( i = 1; i < j; i++) {
            indicies.push([vertices[i], vertices[(i - 1)], vertices[(i - 1) + longDiv]]);
            indicies.push([vertices[i], vertices[(i - 1) + longDiv], vertices[i + longDiv]]);
        }

        return {
            vertices : vertices,
            indicies : indicies
        };
    },

    /*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ To-Array functions  ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
    toRawTriangleArray : function(indexedVertices) {
        var result = [], i, j, maxi, maxj;

        for ( i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for ( j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(indexedVertices.vertices[indexedVertices.indices[i][j]]);

            }
        }

        return result;
    },

    toRawLineArray : function(indexedVertices) {
        var result = [], i, j, maxi, maxj;

        for ( i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for ( j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(indexedVertices.vertices[indexedVertices.indices[i][j]], indexedVertices.vertices[indexedVertices.indices[i][(j + 1) % maxj]]);
            }
        }

        return result;
    },

    toNormalArray : function(indexedVertices) {
        var result = [], i, j, maxi, maxj, p0, p1, p2, v0, v1, v2, normal;

        for ( i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            p0 = indexedVertices.vertices[indexedVertices.indices[i][0]];
            p1 = indexedVertices.vertices[indexedVertices.indices[i][1]];
            p2 = indexedVertices.vertices[indexedVertices.indices[i][2]];

            v0 = new Vector(p0[0], p0[1], p0[2]);
            v1 = new Vector(p1[0], p1[1], p1[2]).subtract(v0);
            v2 = new Vector(p2[0], p2[1], p2[2]).subtract(v0);
            normal = v1.cross(v2).unit();

            for ( j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat([normal.x(), normal.y(), normal.z()]);
            }
        }

        return result;
    },

    toVertexNormalArray : function(indexedVertices) {
        var result = [], i, j, maxi, maxj, p, normal;

        for ( i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for ( j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                p = indexedVertices.vertices[indexedVertices.indices[i][j]];
                normal = new Vector(p[0], p[1], p[2]).unit();
                result = result.concat([normal.x(), normal.y(), normal.z()]);
            }
        }

        return result;
    }
};
