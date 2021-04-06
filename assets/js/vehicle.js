"use strict";
class Vehicle  extends p5.Vector{
    constructor(x, y) {
        super(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 4;
        this.maxForce = 0.25;
        this.r = 16;
        this.seeingFactor = 50;


    }

    avoid(obstacle){
        let pos = obstacle.copy();
        let vehiclePos = createVector(this.x, this.y);

        let normal = getNormalPoint(pos, vehiclePos, this.vel.copy());

        stroke(255)
        line(normal.x, normal.y, pos.x, pos.y);
        fill(255, 0, 0);
        noStroke();
        circle(normal.x, normal.y, 16);
    }

  seek(target) {
        let force = p5.Vector.sub(target, this);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force);
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
        push();
        translate(this.x, this.y);
        rotate(this.vel.heading());
        triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
        noFill();
        let seeingDistance = this.vel.mag() * 50
        stroke(255);
        rect(0, -this.r / 2, seeingDistance, this.r);
        pop();
    }
}

function getNormalPoint(pos, a, v){
    const ap = p5.Vector.sub(pos, a);
    const ab = p5.Vector.sub(b, a);

    v.normalize();
    v.mult(ap.dot(ab));

    return p5.Vector.add(a, ab);
}
