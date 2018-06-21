
var playgroundCorp = (function () {
    function playgroundCorp(a, b) {
        this.canvas = a;
        this.context = b;
        this.animating = false;
        this.mx = 0;
        this.my = 0;
        this.mxPercentage = 0;
        this.myPercentage = 0;
    }
    playgroundCorp.prototype.clear = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    playgroundCorp.prototype.sky = function (a, b, c) { // 80 50 40
        this.context.save();
        this.context.beginPath();
        this.context.rect(0, 0, this.canvas.width, this.canvas.height);
        this.context.closePath();
        this.context.fillStyle = "rgb(" + Math.round(a) + ", " + Math.round(b) + ", " + Math.round(c) + ")";
        this.context.fill();
        this.context.restore();
    };
    playgroundCorp.prototype.sun = function (a, b, c) {
        this.context.save();
        this.transformation(a, b, c);
        this.context.beginPath();
        this.context.arc(0, 0, 50, 0, 2 * Math.PI, false);
        this.context.closePath();
        this.context.fillStyle = "yellow";
        this.context.fill();
        this.context.restore();
    };
    playgroundCorp.prototype.sunbeam = function (a, b, c, colour, height) {
        this.context.save();
        this.transformation(a, b, c);
        this.context.beginPath();
        this.context.moveTo(-10, 52);
        this.context.lineTo(10, 52);
        this.context.lineTo(0, 62 + height);
        this.context.lineTo(-10, 52);
        this.context.closePath();
        this.context.fillStyle = colour;
        this.context.fill();
        this.context.restore();
    };
    playgroundCorp.prototype.water = function (a, b, c, colour) {
        this.context.save();
        this.transformation(a, b, c);
        this.context.beginPath();
        this.context.arc(0, 0, 1400, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fillStyle = colour;
        this.context.fill();
        this.context.restore();
    };
    playgroundCorp.prototype.ground = function (a, b, c, colour) {
        this.context.save();
        this.transformation(a, b, c);
        this.context.beginPath();
        this.context.arc(0, 0, 1300, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fillStyle = colour;
        this.context.fill();
        this.context.restore();
    };
    playgroundCorp.prototype.cloud = function (a, b, c, strokeStyle, fillStyle) {
        this.context.save();
        this.transformation(a, b, c);
        this.context.beginPath();
        this.context.moveTo(170, 80);
        this.context.bezierCurveTo(130, 100, 130, 150, 230, 150);
        this.context.bezierCurveTo(250, 180, 320, 180, 340, 150);
        this.context.bezierCurveTo(420, 150, 420, 120, 390, 100);
        this.context.bezierCurveTo(430, 40, 370, 30, 340, 50);
        this.context.bezierCurveTo(320, 5, 250, 20, 250, 50);
        this.context.bezierCurveTo(200, 5, 150, 20, 170, 80);
        this.context.closePath();
        this.context.lineWidth = 2;
        this.context.strokeStyle = strokeStyle;
        this.context.stroke();
        this.context.fillStyle = fillStyle;
        this.context.fill();
        this.context.restore();
    };
    playgroundCorp.prototype.clock = function (vector, date, fillStyle) {
        var date = new Date(this.myPercentage / 200 * 86400000), hours = date.getHours() + 12, minutes = date.getMinutes();
        this.context.save();
        this.context.font = "30px Cambria";
        this.context.fillStyle = fillStyle;
        this.context.fillText(hours + ":" + (minutes < 10 ? "0" + minutes : minutes), vector.getX(), vector.getY());
        this.context.restore();
    };
    playgroundCorp.prototype.pointer = function () {
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.mx, this.my, 3, 0, 2 * Math.PI, false);
        this.context.closePath();
        this.context.fillStyle = "red";
        this.context.fill();
        this.context.restore();
    };
    playgroundCorp.prototype.info = function (info) {
        this.context.save();
        this.context.font = "20px Georgia";
        this.context.fillStyle = "black";
        this.context.fillText(info, (this.canvas.width - this.context.measureText(info).width) / 2, this.canvas.height / 2);
        this.context.restore();
    };
    playgroundCorp.prototype.transformation = function (t, r, s) {
        var matrix = Matrix.createIdentity();
        var translate = Matrix.createTranslation(t);
        matrix = matrix.multiply(translate);
        var rotate = Matrix.createRotation(r);
        matrix = matrix.multiply(rotate);
        var scale = Matrix.createScale(new Vector(s, s, 1));
        matrix = matrix.multiply(scale);
        matrix.transform(this.context);
    };
    return playgroundCorp;
}());
