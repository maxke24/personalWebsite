class Star {
	constructor() {
		this.lifeTime = 255;
		this.r = random(2, 5);
		this.pos = createVector(random(width), random(height));
	}

	update() {
		this.lifeTime -= 1;
	}

	show() {
		stroke(255, this.lifeTime);
		fill(255);
		ellipse(this.pos.x, this.pos.y, this.r);
	}
}
