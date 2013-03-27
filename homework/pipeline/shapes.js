/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    cylinder: function () {
        var h = 0.5,
            q = 0.25,
            m = 0.433012702;

        // JD: This is nicely done and nearly complete (I think you are missing
        //     a face or two), but this is borderline better done computationally
        //     (i.e., loop around the circle, calculate vertices and indices
        //     vased on that).
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
                console.log("result: " + result);
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
                console.log("result: " + indexedVertices.indices[i][j] + " , " + indexedVertices.indices[i][(j + 1) % maxj]);
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
    }

};
