var Vector = (function() {
    function Vector(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    };

    Vector.prototype.getX = function() {
        return this.mX;
    };
    Vector.prototype.setX = function(pX) {
        this.mX = pX;
    };

    Vector.prototype.getY = function() {
        return this.mY;
    };
    Vector.prototype.setY = function(pY) {
        this.mY = pY;
    };

    Vector.prototype.getZ = function() {
        return this.mZ;
    };
    Vector.prototype.setZ = function(pZ) {
        this.mZ = pZ;
    };

    Vector.prototype.add = function(v) {
        return new Vector(this.getX() + v.getX(), this.getY() + v.getY(), this.getZ() + v.getZ());
    };
    Vector.prototype.subtract = function(v) {
        return new Vector(
            this.getX() - v.getX(),
            this.getY() - v.getY(),
            this.getZ() - v.getZ()
        );
    };
    Vector.prototype.multiply = function(v) {
        return new Vector(
            v * this.mX,
            v * this.mY,
            v * this.mZ
        );
    };
    Vector.prototype.divide = function(v) {
        return new Vector(this.mX / v, this.mY / v, this.mZ / v);
    };
    Vector.prototype.interpolate = function(a, b) {
        return new Vector(
            a.getX() + (this.mX - a.getX()) * b,
            a.getY() + (this.mY - a.getY()) * b,
            a.getZ() + (this.mZ - a.getZ()) * b
        );
    };
    Vector.prototype.magnitude = function() {
        return Math.sqrt(Math.pow(this.mX, 2) + Math.pow(this.mY, 2) + Math.pow(this.mZ, 2));
    };
    Vector.prototype.limitTo = function(limit) {
        var ratio = 1,
            magnitudeSquared = Math.pow(this.magnitude(), 2);
        if(magnitudeSquared > Math.pow(limit, 2))
            ratio = (limit / (Math.sqrt(magnitudeSquared)));
        return new Vector(
            this.mX * ratio,
            this.mY * ratio,
            this.mZ * ratio
        );
    };
    Vector.prototype.normalise = function() {
        return new Vector(
            this.mX / this.magnitude(),
            this.mY / this.magnitude(),
            this.mZ / this.magnitude()
        );
    };
    Vector.prototype.dotProduct = function (vector) {
        return this.mX * vector.getX() + this.mY * vector.getY() + this.mZ * vector.getZ();
    };
    Vector.prototype.rotate = function (rotation) {
        return new Vector(
            Math.cos(rotation) * this.mX - Math.sin(rotation) * this.mY,
            Math.sin(rotation) * this.mX + Math.cos(rotation) * this.mY,
            1
        );
    };
    Vector.prototype.angleBetween = function(vector) {
        return Math.acos(this.dotProduct(vector));
    };
    return Vector;
}());