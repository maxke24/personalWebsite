"use strict";
let dots = [];
let path;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
    path = new Path();
    path.addRoundPoint(0, 0);
    path.addRoundPoint(width/2, height/2);
    path.addRoundPoint(width, height);
	for (let i = 0; i < 100; i++) {
		dots.push(new Dot(width/2, height/2));
	}
}

function draw() {
	background(0);

	dots.forEach((ant) => {
		ant.follow(path);
		ant.edges();
		ant.update();
		ant.show();
	});
}