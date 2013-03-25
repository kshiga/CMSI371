/*matrix4x4
• A basic Matrix4x4 object that initializes, by default, to the identity matrix
• A  multiply function which multiplies two  Matrix4x4 objects and returns the result (as a Matrix4x4 object, of  course)
• A translate function which takes three parameters dx, dy, and dz, returning a Matrix4x4 object 
that accurately represents this transformation
• A  scale function which takes three parameters 
sx, sy, and sz, returning a Matrix4x4 object that 
accurately represents this transformation
• The rotate function given in the sample code, 
but refactored to fit your Matrix4x4 object
• The ortho projection function given in the sample code, but, as with  rotate, refactored to fit 
your Matrix4x4 object
• A frustum projection function based on the matrix derived from the course handout
• Conversion/convenience functions to prepare 
the matrix data for direct consumption by 
WebGL and GLSL
*/


$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var v = new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        deepequal(v, 
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "Identity matrix created");
        


        v = new Vector(300, 200);

        equal(v.dimensions(), 2, "Vector size");
        equal(v.elements[0], 300, "First element by index");
        equal(v.elements[1], 200, "Second element by index");
        equal(v.x(), 300, "First element by coordinate");
        equal(v.y(), 200, "Second element by coordinate");

        v = new Vector(3, 2, 1, 2);

        equal(v.dimensions(), 4, "Vector size");
        equal(v.elements[0], 3, "First element by index");
        equal(v.elements[1], 2, "Second element by index");
        equal(v.elements[2], 1, "Third element by index");
        equal(v.elements[3], 2, "Fourth element by index");
        equal(v.x(), 3, "First element by coordinate");
        equal(v.y(), 2, "Second element by coordinate");
        equal(v.z(), 1, "Third element by coordinate");
        equal(v.w(), 2, "Fourth element by coordinate");

        v = new Vector();
        equal(v.dimensions(), 0, "Empty vector (boundary case)");
    });



});
