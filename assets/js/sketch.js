let w = window.innerWidth;
let h = window.innerHeight;
let circles = {};
let jsondict;
const nodes = [];
let offset = 200;
let nodeDiff = 1.6;
let activeCircle;

let anchor;
let velocity;
let restLength = 100;
let k = 0.001;
let gravity;

fetch('/assets/experiences.json')
	.then((response) => {
		return response.json();
	})
	.then((output) => {
		jsondict = output;
		setupLayers();
	});

function setup() {
	const canvas = createCanvas(w, h);
	canvas.style('z-index', '-1');
	background(53);
	frameRate(60);
	document.querySelector('a').addEventListener('click', (e) => {
		document.querySelector('article').remove();
	});
	velocity = createVector(0, 0);
	gravity = createVector(0, 0.1);
}

function setupLayers() {
	w = window.innerWidth;
	h = window.innerHeight;
	spacing = (w - 300) / 6;
	const L1 = spacing * 1;
	const L2 = spacing * 2;
	const L3 = spacing * 3;
	const L4 = spacing * 4;
	const L5 = spacing * 5;
	const L6 = spacing * 6;
	drawingContext.shadowOffsetX = 5;
	drawingContext.shadowOffsetY = 2;
	drawingContext.shadowBlur = 20;
	drawingContext.shadowColor = 'black';

	createLayer1(L1, 'About', '#89CFF0');
	createLayer5(L2, 'Education', '#FFD700');
	createLayer4(L3, 'Experiences', '#FFD700');
	createLayer4(L4, 'Projects', '#FFD700');
	createLayer5(L5, 'Events', '#FFD700');
	createLayer3(L6, 'Output', '#89CFF0');
}

function draw() {
	background(53);
	w = window.innerWidth;
	h = window.innerHeight;
	spacing = (w - 300) / 6;
	stroke('#8D918D');
	strokeWeight(1);
	drawLinesNew();

	for (let i = 0; i < nodes.length; i++) {
		updateNode(nodes[i]);
	}
}

function updateNode(node) {
	anchor = createVector(540, 300);
	let mapValue = random(0.1, 1);
	diffX = map(mouseX, 0, width, -mapValue, mapValue);
	diffY = map(mouseY, height, 0, mapValue, -mapValue);
	node.x += diffX;
	node.y += diffY;

	let force = p5.Vector.sub(node, createVector(node.pos.x, node.pos.y - 200));
	let x = force.mag() - restLength;
	force.normalize();
	force.mult(-1 * k * x);

	// F = A
	velocity.add(force);
	velocity.add(gravity);
	node.add(velocity);
	velocity.mult(0.99);
	node.show();
}

function drawLinesNew() {
	let i = 1;
	for (let [key, value] of Object.entries(circles)) {
		if (i < Object.keys(circles).length) {
			let tempNodes = Object.values(circles)[i];
			for (let [key1, value1] of Object.entries(value)) {
				for (let [key2, value2] of Object.entries(tempNodes)) {
					line(value1.x, value1.y, value2.x, value2.y);
				}
			}
		}
		i++;
	}
}

function createLayer1(x, layerPurpose, color) {
	nodeDiff = 1.6;
	offset = 200;

	const NH = h / nodeDiff / 6;
	let p = createP(layerPurpose);
	p.position(x - p.width / 2, NH * 3 + offset - 65);
	p.addClass('blue');
	const y = NH * 3 + offset;
	let imgPath = jsondict[layerPurpose][1].Link;
	let node = new Node(x, y, color, imgPath);
	let a = createA('#', '');
	a.position(x - 15, y - 15);
	nodes.push(node);
	let circ = {};
	circ[1] = node;
	circles[layerPurpose] = circ;
}

function createLayer3(x, layerPurpose, color) {
	nodeDiff = 1.6;
	offset = 200;

	const NH = h / nodeDiff / 6;

	let p = createP(layerPurpose);
	p.position(x - p.width / 2, NH * 2 + offset - 65);
	p.addClass('blue');

	let circ = {};
	for (let i = 1; i <= 3; i++) {
		const y = NH * (i + 1) + offset;
		let imgPath = jsondict[layerPurpose][i].Link;
		let node = new Node(x, y, color, imgPath);
		let a = createA('#', '');
		a.position(x - 15, y - 15);
		nodes.push(node);
		circ[i] = node;
	}
	circles[layerPurpose] = circ;
	let y = NH * 2 + offset - p.height / 2;
	let xPos = w - p.width * 3.6;
	p = createP('80% Datascientist');
	p.position(xPos, y);

	y = NH * 3 + offset - p.height / 2;
	xPos = w - p.width * 1.4;
	p = createP('15% Data analyst');
	p.position(xPos, y);

	y = NH * 4 + offset - p.height / 2;
	xPos = w - p.width * 1.45;
	p = createP('5% Data engineer');
	p.position(xPos, y);
}

function createLayer4(x, layerPurpose, color) {
	nodeDiff = 1.9;
	offset = 250;

	const NH = h / nodeDiff / 5;

	let p = createP(layerPurpose);
	p.position(x - p.width / 2, NH + offset - 65);
	p.addClass('yellow');

	let circ = {};
	for (let i = 1; i <= 4; i++) {
		const y = NH * i + offset;
		let imgPath = jsondict[layerPurpose][i].Link;
		let node = new Node(x, y, color, imgPath);
		let a = createA('#', '');
		a.position(x - 15, y - 15);
		nodes.push(node);
		circ[i] = node;
	}
	circles[layerPurpose] = circ;
}

function createLayer5(x, layerPurpose, color) {
	nodeDiff = 1.6;
	offset = 200;

	const NH = h / nodeDiff / 6;

	let p = createP(layerPurpose);
	p.position(x - p.width / 2, NH + offset - 65);
	p.addClass('yellow');

	let circ = {};
	for (let i = 1; i <= 5; i++) {
		const y = NH * i + offset;
		let imgPath = jsondict[layerPurpose][i].Link;
		let node = new Node(x, y, color, imgPath);
		let a = createA('#', '');
		a.position(x - 15, y - 15);
		nodes.push(node);
		circ[i] = node;
	}
	circles[layerPurpose] = circ;
}

function mousePressed() {
	document.querySelectorAll('.scaled').forEach((el) => {
		el.remove();
	});
	for (let [key, value] of Object.entries(circles)) {
		for (let [key2, value2] of Object.entries(value)) {
			value2.activeColor = '';
			if (
				dist(mouseX, mouseY, value2.x, value2.y) < 25 &&
				!document.querySelector('article')
			) {
				value2.activeColor = '#0CF574';
				value2.activeColor = '#64b6ac';
				const body = jsondict[key][key2];
				const el = `<h2>${body.Title}</h2><p>${body.Description}</p>`;
				createDiv(el);
				const div = document.querySelector('div');
				div.classList.add('scaled');
			}
		}
	}
}
