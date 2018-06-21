/*property
    _matrix
*/
//491564
var Matrix = (function() {
    function Matrix(x0, x1, x2, y0, y1, y2, z0, z1, z2) {
        this._matrix = [
         [x0, x1, x2],
         [y0, y1, y2],
         [z0, z1, z2]
        ];
    };
    Matrix.prototype.getElement = function(row, column) {
        return this._matrix[row][column];
    };
    Matrix.createIdentity = function () {
        // 1 0 0
        // 0 1 0
        // 0 0 1
        return new Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);
    };
    Matrix.createTranslation = function (vector) {
        // 1 0 vx
        // 0 1 vy
        // 0 0  1
        return new Matrix(
            1, 0, vector.getX(),
            0, 1, vector.getY(),
            0, 0, 1
            );
    };
    Matrix.createScale = function (vector) {
        // vx  0 0
        //  0 vy 0
        //  0  0 1
        return new Matrix(
            vector.getX(), 0, 0,
            0, vector.getY(), 0,
            0, 0, 1
            );
    };
    Matrix.createRotation = function (rotation) {
        // cosx -cosx 0
        // sinx  cosx 0
        //    0     0 0
        return new Matrix(
            Math.cos(rotation), -Math.sin(rotation), 0,
            Math.sin(rotation), Math.cos(rotation), 0,
            0, 0, 1
            );
    };
    Matrix.prototype.multiplyVector = function (vector) {
        return new Vector(
            vector.getX() * this.getElement(0, 0) + vector.getY() * this.getElement(0, 1) + vector.getZ() * this.getElement(0, 2),
            vector.getX() * this.getElement(1, 0) + vector.getY() * this.getElement(1, 1) + vector.getZ() * this.getElement(1, 2),
            vector.getX() * this.getElement(2, 0) + vector.getY() * this.getElement(2, 1) + vector.getZ() * this.getElement(2, 2)
            );
    };
    Matrix.prototype.multiply = function (matrix) {
        // [a_00 a_01 a_02]   [a_00 a_01 a_02]
        // [a_10 a_11 a_12] x [a_10 a_11 a_12]
        // [a_20 a_21 a_22]   [b_20 b_21 b_22]

        var a = matrix,
            b = this;
        return new Matrix(
            // a_00*b_00                          + a_01*b_10                             + a_02*b_20
            b.getElement(0, 0) * a.getElement(0, 0) + b.getElement(1, 0) * a.getElement(0, 1) + b.getElement(2, 0) * a.getElement(0, 2),
            // a_00*b_01                          + a_01*b_11                             + a_02*b_21
            b.getElement(0, 1) * a.getElement(0, 0) + b.getElement(1, 1) * a.getElement(0, 1) + b.getElement(2, 1) * a.getElement(0, 2),
            // a_00*b_02 ???                      + a_01*b_12 ???                         + a_02*b_22
            b.getElement(0, 0) * a.getElement(0, 2) + b.getElement(0, 1) * a.getElement(1, 2) + b.getElement(0, 2) * a.getElement(2, 2),
            // a_10*b_00                          + a_11*b_10                             + a_12*b_20
            b.getElement(0, 0) * a.getElement(1, 0) + b.getElement(1, 0) * a.getElement(1, 1) + b.getElement(2, 0) * a.getElement(1, 2),
            // a_10*b_01                          + a_11*b_11                             + a_12*b_21
            b.getElement(0, 1) * a.getElement(1, 0) + b.getElement(1, 1) * a.getElement(1, 1) + b.getElement(2, 1) * a.getElement(1, 2),
            // a_10*b_02 ???                      + a_11*b_12 ???                         + a_12*b_22
            b.getElement(1, 0) * a.getElement(0, 2) + b.getElement(1, 1) * a.getElement(1, 2) + b.getElement(1, 2) * a.getElement(2, 2),
            // a_20*b_00                          + a_21*b_10                             + a_22*b_20
            b.getElement(0, 0) * a.getElement(2, 0) + b.getElement(1, 0) * a.getElement(2, 1) + b.getElement(2, 0) * a.getElement(2, 2),
            // a_20*b_01                          + a_21*b_11                             + a_22*b_21
            b.getElement(0, 1) * a.getElement(2, 0) + b.getElement(1, 1) * a.getElement(2, 1) + b.getElement(2, 1) * a.getElement(2, 2),
            // a_20*b_02 ???                      + a_21*b_12 ???                         + a_22*b_22
            b.getElement(2, 0) * a.getElement(0, 2) + b.getElement(2, 1) * a.getElement(1, 2) + b.getElement(2, 2) * a.getElement(2, 2)
            );
    };
    Matrix.prototype.multiply2 = function (matrix) {
        // [a_00 a_01 a_02]   [a_00 a_01 a_02]
        // [a_10 a_11 a_12] x [a_10 a_11 a_12]
        // [a_20 a_21 a_22]   [b_20 b_21 b_22]

        var a = matrix,
            b = this;
        return new Matrix(
            // a_00*b_00                          + a_01*b_10                             + a_02*b_20
            b.getElement(0, 0) * a.getElement(0, 0) + b.getElement(1, 0) * a.getElement(0, 1) + b.getElement(2, 0) * a.getElement(0, 2),
            // a_00*b_01                          + a_01*b_11                             + a_02*b_21
            b.getElement(0, 1) * a.getElement(0, 0) + b.getElement(1, 1) * a.getElement(0, 1) + b.getElement(2, 1) * a.getElement(0, 2),
            // a_00*b_02                          + a_01*b_12                             + a_02*b_22
            b.getElement(0, 2) * a.getElement(0, 0) + b.getElement(1, 2) * a.getElement(0, 1) + b.getElement(2, 2) * a.getElement(0, 2),
            // a_10*b_00                          + a_11*b_10                             + a_12*b_20
            b.getElement(0, 0) * a.getElement(1, 0) + b.getElement(1, 0) * a.getElement(1, 1) + b.getElement(2, 0) * a.getElement(1, 2),
            // a_10*b_01                          + a_11*b_11                             + a_12*b_21
            b.getElement(0, 1) * a.getElement(1, 0) + b.getElement(1, 1) * a.getElement(1, 1) + b.getElement(2, 1) * a.getElement(1, 2),
            // a_10*b_02                          + a_11*b_12                             + a_12*b_22
            b.getElement(0, 2) * a.getElement(1, 0) + b.getElement(1, 2) * a.getElement(1, 1) + b.getElement(2, 2) * a.getElement(1, 2),
            // a_20*b_00                          + a_21*b_10                             + a_22*b_20
            b.getElement(0, 0) * a.getElement(2, 0) + b.getElement(1, 0) * a.getElement(2, 1) + b.getElement(2, 0) * a.getElement(2, 2),
            // a_20*b_01                          + a_21*b_11                             + a_22*b_21
            b.getElement(0, 1) * a.getElement(2, 0) + b.getElement(1, 1) * a.getElement(2, 1) + b.getElement(2, 1) * a.getElement(2, 2),
            // a_20*b_02                          + a_21*b_12                             + a_22*b_22
            b.getElement(0, 2) * a.getElement(2, 0) + b.getElement(1, 2) * a.getElement(2, 1) + b.getElement(2, 2) * a.getElement(2, 2)
            );
    };
    Matrix.prototype.setTransform = function (context) {
        context.setTransform(this.getElement(0, 0), this.getElement(0, 1), this.getElement(1, 0), this.getElement(1, 1), this.getElement(0, 2), this.getElement(1, 2));
    };
    Matrix.prototype.transform = function (context) {
        context.transform(this.getElement(0, 0), this.getElement(0, 1), this.getElement(1, 0), this.getElement(1, 1), this.getElement(0, 2), this.getElement(1, 2));
    };
    return Matrix;
}());
