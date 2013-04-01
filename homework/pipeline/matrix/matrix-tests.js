// JD: Well done!  Very nice test coverage with well-selected cases.
$(function () {
    test("Creation and Data Access", function () {
        var m = new Matrix4x4().returnMatrix();
        deepEqual(m, 
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "Identity matrix created via defaults");

        m = new Matrix4x4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1).returnMatrix();
        deepEqual(m, 
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "Identity matrix created via arguments");

        m = new Matrix4x4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15).returnMatrix();
        deepEqual(m, 
                  [0, 1, 2, 3,
                   4, 5, 6, 7,
                   8, 9, 10, 11,
                   12, 13, 14, 15],
                 "Matrix4x4 created with integers 0-15");
        
    });

    test("Multiplication Tests", function () {
        var m0 = new Matrix4x4(),
        m1 = new Matrix4x4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);

        deepEqual(m0.multiply(m0).returnMatrix(), 
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "Identity matrix multiplied by identity matrix returns the identity matrix");

        deepEqual(m0.multiply(m1).returnMatrix(), 
                  [0, 1, 2, 3,
                   4, 5, 6, 7,
                   8, 9, 10, 11,
                   12, 13, 14, 15],
                 "Matrix4x4 multiplied by identity matrix returns itself");


    });


    test("Translation Tests", function () {
        var m = new Matrix4x4(),
        dx = 1,
        dy = -0.75,
        dz = 0.25;

        deepEqual(m.translate(dx, 0, 0).returnMatrix(), 
                  [1, 0, 0, 1,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "translated on x");

        deepEqual(m.translate(0, dy, 0).returnMatrix(), 
                  [1, 0, 0, 0,
                   0, 1, 0, -0.75,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "translated on y");

        deepEqual(m.translate(0, 0, dz).returnMatrix(), 
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0.25,
                   0, 0, 0, 1],
                 "translated on z");
        
    });

    test("Scale Tests", function () {
        var m = new Matrix4x4(),
        sx = 1,
        sy = -0.75,
        sz = 0.25;

        deepEqual(m.scale(sx, 0, 0).returnMatrix(), 
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "scaled on x");

        deepEqual(m.scale(0, sy, 0).returnMatrix(), 
                  [1, 0, 0, 0,
                   0, -0.75, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "scaled on y");

        deepEqual(m.scale(0, 0, sz).returnMatrix(), 
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 0.25, 0,
                   0, 0, 0, 1],
                 "scaled on z");
        
    });

    test("Rotate Tests", function () {
        var m = new Matrix4x4(),

        a = 0,
        x = 1,
        y = 0,
        z = 0;
        deepEqual(m.rotate(a, x, y, z).returnMatrix(), 
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "rotated about x");

        a = (-90),
        x = 0,
        y = 1,
        z = 0;
        deepEqual(m.rotate(a, x, y, z).returnMatrix(), 
                  [ Math.cos(a * Math.PI/180), 0,                        -1, 0,
                                            0, 1,                         0, 0,
                                            1, 0, Math.cos(a * Math.PI/180), 0,
                                            0, 0,                         0, 1],
                 "rotated about y");

        a = 120,
        x = 0,
        y = 0,
        z = 1;
        deepEqual(m.rotate(a, x, y, z).returnMatrix(), 
                  [Math.cos(a * Math.PI/180), -Math.sin(a * Math.PI/180), 0, 0,
                   Math.sin(a * Math.PI/180),  Math.cos(a * Math.PI/180), 0, 0,
                                           0,                          0, 1, 0,
                                           0,                          0, 0, 1],
                 "rotated about z");

        
    });


    test("Ortho Tests", function () {
        var m = new Matrix4x4(),

        l = 0, 
        r = 1,
        t = 1.5,
        b = 0.25,
        zn = -0.25,
        zf = 0.75;

        deepEqual(m.ortho(l, r, b, t, zf, zn).returnMatrix(), 
                  [2,   0,  0,   -1,
                   0, 1.6,  0, -1.4,
                   0,   0, -2, -0.5,
                   0,   0,  0,    1],
                 "orthagonal projection");

        l = -0.75, 
        r = 1.25,
        t = -0.5,
        b = -0.75,
        zn = 0,
        zf = 2;

        deepEqual(m.ortho(l, r, b, t, zf, zn).returnMatrix(), 
                  [1, 0,  0, -0.25,
                   0, 8,  0,     5,
                   0, 0, -1,    -1,
                   0, 0,  0,     1],
                 "orthagonal projection");
        
    });

    test("Frustum Tests", function () {
        var m = new Matrix4x4(),

        l = 0, 
        r = 1,
        t = 1.5,
        b = 0.25,
        n = -0.25,
        f = 0.75;

        deepEqual(m.frustum(l, r, b, t, f, n).returnMatrix(), 
                  [-0.5,    0,   1,      0,
                      0, -0.4, 1.4,      0,
                      0,    0, -0.5, 0.375,
                      0,    0,  -1,     0],
                 "perspective projection");

        l = -0.75, 
        r = 1.25,
        t = -0.5,
        b = -0.75,
        n = 0,
        f = 2;

        deepEqual(m.frustum(l, r, b, t, f, n).returnMatrix(), 
                  [0, 0, 0.25, 0,
                   0, 0,   -5, 0,
                   0, 0,   -1, 0,
                   0, 0,   -1, 0],
                 "orthagonal projection");
        
    });

    test("Conversion to WebGL Matrix", function () {
        var m = new Matrix4x4();
        deepEqual(m.toWebGLMatrix().returnMatrix(), 
                  [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1],
                 "Identity matrix to WebGL Matrix");

        m = new Matrix4x4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        deepEqual(m.toWebGLMatrix().returnMatrix(), 
                  [0, 4,  8, 12,
                   1, 5,  9, 13,
                   2, 6, 10, 14,
                   3, 7, 11, 15],
                 "Matrix4x4 to WebGL Matrix");
        
    });



});
