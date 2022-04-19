"use strict";
let dots = [];
let path;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
    path = new Path();
    let y = height / 10;
    let x = width / 10;
    path.addRoundPoint(0, height);
    while (path.points.length < 10) {
        x = x + random(50, 100);
        y = y + random(50, 100);
        path.addRoundPoint(x, y);
    }
	for (let i = 0; i < 100; i++) {
		dots.push(new Dot(height/2, width/2));
	}

    path.addRoundPoint(width, 0);
}

// function mouseClicked() {
// 	path.addRoundPoint(mouseX, mouseY);
// }

function draw() {
	background(0);
    // if (path.points.length > 3) {
	// 	// 
	// 	dots[1].follow(path);
	// }
    path.display();
	dots.forEach((ant) => {
        ant.follow(path);
		ant.edges();
		ant.update();
		ant.show();
	});
}