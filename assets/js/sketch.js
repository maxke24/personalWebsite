"use strict";
let vehicle;
let target;
let obstacles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    vehicle = new Vehicle(50, 200);
    vehicle.vel.set(6, -1.2);

    obstacles[0] = new Obstacle(300, 200, 50)
}

function draw() {
    background(0);

    for (let obstacle of obstacles) {
        obstacle.show();
    }

    vehicle.seek(createVector(mouseX, mouseY));

    vehicle.edges();
    vehicle.update();

    vehicle.avoid(obstacles[0]);
    vehicle.show();
}
