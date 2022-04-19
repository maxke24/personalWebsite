"use strict";

class Dot extends p5.Vector {
	constructor(x, y) {
		super(x, y);
		/* this = createVector(x, y); */
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxSpeed = 25;
		this.r = 16;
	}

	seek(target) {
		let force = p5.Vector.sub(target, this);
		force.setMag(this.maxSpeed);
		force.sub(this.vel);
		force.limit(this.maxForce);
		this.applyForce(force);
	}

	follow(path) {
		let predict = this.vel.copy();
		predict.normalize();
		predict.mult(50);
		let predictLoc = p5.Vector.add(this, predict);

		let normal, target, distance;
		let worldRecord = 10000000000000000;

		for (let i = 0; i < path.points.length - 1; i++) {
			let a = path.points[i].copy();
			let b = path.points[i + 1].copy();
			let normalPoint = getNormalPoint(predictLoc, a, b);
			if (normalPoint.x < min(a.x, b.x) || normalPoint.x > max(a.x, b.x)) {
				normalPoint = b.copy();
			}
			distance = p5.Vector.dist(normalPoint, predictLoc);
			if (distance < worldRecord) {
				worldRecord = distance;
				normal = normalPoint;

				let dir = p5.Vector.sub(b, a);
				dir.normalize();
				dir.mult(10);
				target = normalPoint.copy();
				target.add(dir);
			}
		}
        print(target)
		circle(target.x, target.y, 16);
		if (worldRecord > path.radius) {
			this.seek(target);
		}
	}

	edges() {
		if (this.x > width) {
			this.x = 0;
		} else if (this.x < 0) {
			this.x = width;
		}
		if (this.y > height) {
			this.y = 0;
		} else if (this.y < 0) {
			this.y = height;
		}
	}

	applyForce(force) {
		this.acc.add(force);
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.add(this.vel);
		this.acc.set(0, 0);
	}

	show() {
		stroke(255);
		strokeWeight(2);
		fill(255);
		circle(this.x, this.y, 16);
	}

	checkFoodCollision(food) {
		let search = 10;
		if (food.x >= this.x - search && food.x <= this.x + search) {
			if (food.y >= this.y - search && food.y <= this.y + search) {
				this.hasFood = true;
			}
		}
	}
}

// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, a, b) {
	// Vector from a to p
	let ap = p5.Vector.sub(p, a);
	let ab = p5.Vector.sub(b, a);
	// Vector from a to b
	ab.normalize(); // Normalize the line
	// Project vector "diff" onto line by using the dot product
	ab.mult(ap.dot(ab));
	return p5.Vector.add(a, ab);
}