/*
	Check out the following link if I want to switch to instance mode for p5.js,
		which would put all p5 variables and functions in their own namespace.

	https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
*/

let aspectRatio = 16 / 9;
let currentFrameRate = 0;

let ship;
let box;

function setup() {

	let { canvasWidth, canvasHeight } = getCanvasDimensions();
	createCanvas(canvasWidth, canvasHeight);

	ship = new Ship();
	box = new Box();
}

function windowResized() {
	let { canvasWidth, canvasHeight } = getCanvasDimensions();
	resizeCanvas(canvasWidth, canvasHeight);
}

function getCanvasDimensions() {
	let canvasHeight = windowHeight;
	let canvasWidth = canvasHeight * aspectRatio;

	if (canvasWidth > windowWidth) {
		canvasWidth = windowWidth;
		canvasHeight = windowWidth / aspectRatio;
	}

	return {
		canvasWidth,
		canvasHeight
	}
}

function draw() {

	background(0);

	if (frameCount % 4 === 0) {
		currentFrameRate = frameRate().toFixed(2);
	}

	fill(255);
	textSize(26);
	text(currentFrameRate, 10, 30);

	ship.update();
	ship.render();

	box.update();
	box.render();
}

function keyPressed() {
	ship.setAcceleration(10);
}

function keyReleased() {
	ship.setAcceleration(0);
}

function mousePressed() {
	box.setSelected(true);
}

function mouseReleased() {
	box.setSelected(false);
}

function Ship() {

	this.distance = 0;		// m
	this.velocity = 0;		// m/s
	this.acceleration = 0;	// m/s^2

	this.update = () => {
		this.distance += this.velocity * (deltaTime / 1000);
		this.velocity += this.acceleration * (deltaTime / 1000);
	}

	this.setAcceleration = (a) => {
		this.acceleration = a;
	}

	this.render = () => {
		// Display ship stats
		let widthOffset = 200;
		let x = width - widthOffset;

		fill(255);
		rectMode(CORNER);
		rect(x, 0, widthOffset, 100);
		fill(0);
		textSize(20);
		text("Distance: " + this.distance, x, 20);
		text("Velocity: " + this.velocity, x, 40);
		text("Acceleration: " + this.acceleration, x, 60);

		// Display a demo ship
		fill(255);
		circle(this.distance % width, height / 2, 20);
	}
}

function Box() {

	this.length = 20;
	this.mass = 10;
	this.position = createVector(500, 500);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	this.isSelected = false;

	this.update = () => {
		this.position.add(p5.Vector.mult(this.velocity, deltaTime / 1000));
		this.velocity.add(p5.Vector.mult(this.acceleration, deltaTime / 1000));

		if (this.isSelected) {
			this.moveTowardCursor();
		}
	}

	this.render = () => {
		fill(255);
		rectMode(CENTER);
		rect(this.position.x, this.position.y, this.length);
	}

	this.moveTowardCursor = () => {
		let mouseP = createVector(mouseX, mouseY);
		let res = p5.Vector.sub(mouseP, this.position);
		res.limit(1);
		this.setAcceleration(res);

		// box.setAcceleration(createVector(0, 0));
	}

	this.setAcceleration = (vector) => {
		this.acceleration.add(vector);
	}

	this.setSelected = (b) => {
		this.isSelected = b;
	}
}
