let r1, x1, y1;
let r2, x2, y2;
let rsum;
let angle;
let sunD = 1392000;
let mercuryD = 4879.4;
let marsD = 6779;
let venusD = 12104;
let earthD = 12742;
let neptuneD = 49244;
let uranusD = 50724;
let saturnD = 116460;
let jupiterD = 139820;
let planets = [];
let stars = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(51);
	strokeWeight(1);
	noFill();
	stroke(255);
	r1 = 50;
	x1 = width / 2;
	y1 = height / 2;
	angle = 0;

	angleMode(DEGREES);
	planets.push(new Planet("Mercury", mercuryD, 1, 57.9, [191, 144, 114]));
	planets.push(new Planet("Venus", venusD, 1, 108.2, [191, 144, 114]));
	planets.push(new Planet("Earth", earthD, 24, 149.6, [109, 203, 231]));
	planets.push(new Planet("Mars", marsD, 1, 227.9, [109, 203, 231]));
	planets.push(new Planet("Jupiter", jupiterD, 1, 778.3, [228, 182, 132]));
	planets.push(new Planet("Saturn", saturnD, 1, 1427, [255, 243, 159]));
	planets.push(new Planet("Uranus", uranusD, 1, 2871, [255, 243, 159]));
	planets.push(new Planet("Neptune", neptuneD, 1, 4497.1, [255, 243, 159]));
}

function draw() {
	background(25);
	stroke(255, 201, 67);
	noFill();
	ellipse(x1, y1, r1);
	planets.forEach((planet) => {
		planet.update();
		planet.show();
	});

	if (random() < 0.2) {
		stars.push(new Star());
	}

	for (let i = stars.length - 1; i >= 0; i--) {
		stars[i].update();
		stars[i].show();
		if (stars[i].lifeTime <= 0) {
			stars.splice(i, 1);
		}
	}
	text(frameCount, 10, 100);
}
