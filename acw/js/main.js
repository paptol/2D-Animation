window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var animation_x, animation_y, animation_heightIterator = 0, animation_sunbeamAngle = 0, animation_heightState = true;
var r, g, b;
function animate(playground) {
    if (playground.animating) {
        r = 200 * (255 - playground.myPercentage) / 255;
        g = 240 * (255 - playground.myPercentage) / 255;
        b = 255 * (255 - playground.myPercentage) / 255;
        playground.sky(r, g, b);
        animation_x = playground.my * 0.6;
        animation_y = 0.01 * animation_x * animation_x + 0.9 * animation_x;
        playground.sun(new Vector(playground.canvas.width / 4 + animation_x - 25 + playground.mxPercentage * 0.6, animation_y / 2 - 25), 1.0, 1.0);

        if (animation_heightIterator < 10 && animation_heightState)
            animation_heightIterator += 0.5;
        else
            animation_heightState = false;

        if (animation_heightIterator > 0 && !animation_heightState)
            animation_heightIterator -= 0.5;
        else
            animation_heightState = true;

        for (var i = 0; i < 16; i++)
            playground.sunbeam(new Vector(playground.canvas.width / 4 + animation_x - 25 + playground.mxPercentage * 0.6, animation_y / 2 - 25), (Math.PI / 360) * (animation_sunbeamAngle - 315 + 45 * i), 1.0, i % 2 ? "yellow" : "white", i % 2 ? (10 - animation_heightIterator) : animation_heightIterator);
        animation_sunbeamAngle += 3.0;
        playground.water(new Vector(playground.canvas.width / 2 + playground.mxPercentage * 0.4, 1650), 1.0, 1.0, "rgb(100, 100, 240)");
        playground.ground(new Vector(playground.canvas.width / 2 + 150 + playground.mxPercentage, 1600), 1.0, 1.0, "rgb(100, 240, 100)");
        playground.cloud(new Vector(100 + playground.mxPercentage * 0.3, 150), (Math.PI / 360) * 1.0, 0.8, "rgb(235, 235, 235)", "rgb(255, 255, 255)");
        playground.cloud(new Vector(200 + playground.mxPercentage * 0.3, 350), (Math.PI / 360) * 1.0, 2.0, "rgb(220, 220, 220)", "rgb(240, 240, 240)");
        playground.clock(new Vector(30, 50), "rgb(25, 25, 10)");
        playground.pointer();
    }
    else {
        playground.clear();
        playground.info("Hull, City of Culture 2017 ! !");
    }
    requestAnimFrame(function () {
        animate(playground);
    });
}

function start() {
    var canvas = document.getElementById("mainCanvas");
    if (!canvas) {
        alert("Error. Cannot find the canvas element.");
        console.log("Error. Cannot find the canvas element.");
        return;
    }
    var context = canvas.getContext("2d");
    if (!context) {
        alert("Error. Cannot get the context.");
        console.log("Error. Cannot get the context.");
        return;
    }
    var playground = new playgroundCorp(canvas, context);
    animate(playground);
    canvas.addEventListener("mousemove", function (e) {
        playground.mx = e.clientX - canvas.getBoundingClientRect().left;
        playground.my = e.clientY - canvas.getBoundingClientRect().top;
        playground.mxPercentage = playground.mx / playground.canvas.width * 100;
        playground.myPercentage = playground.my / playground.canvas.height * 100;
        playground.animating = true;
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        playground.animating = false;
    }, false);
}
window.addEventListener("load", start, false);