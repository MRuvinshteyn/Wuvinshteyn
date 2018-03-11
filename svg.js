var svg = document.getElementById("vimage");

var frame;
var anim = true;
var interval;

var rad = 10;
var color = "#000000";

var circles = [];

var createCircle = function(){
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var ret = {
        x: rad + Math.floor(Math.random() * (500-rad)),
        y: rad + Math.floor(Math.random() * (500-rad)),
        r: rad,
        col: color,
        dx: Math.floor(Math.random() * 10),
        dy: Math.floor(Math.random() * 10),
        c: circle,
        draw: function(){
            this.c.setAttribute("cx",this.x);
            this.c.setAttribute("cy",this.y);
            this.c.setAttribute("r",this.r);
            this.c.setAttribute("fill",this.col);
            svg.appendChild(this.c);
        },
        move: function(){
            if (this.x <= this.r || this.x >= 500 - this.r) {
                this.dx *= -1;
            }
            if (this.y <= this.r || this.y >= 500 - this.r) {
                this.dy *= -1;
            }
            this.x += this.dx;
            this.y += this.dy;
        },
    }
    return ret;
}

var clicked = function(e){
    if (anim) {
        interval = setInterval(animate, 20);
        anim = !anim;
    }
    if (e.target == this){
        circles.push(createCircle());
        // dot.display();
    }
}

var animate = function(){
    circles.forEach(function(c){
        c.move();
    })
    circles.forEach(function(c){
        c.draw();
    })
}

var clearSVG = function(){
    clearInterval(interval);
    circles = [];
    while(svg.children.length > 0){
        svg.removeChild(svg.lastChild);
    }
    anim = true;
}

svg.addEventListener("click",clicked);
document.getElementById("csvg").addEventListener("click",clearSVG);