/*
	Check out the following link if I want to switch to instance mode for p5.js,
		which would put all p5 variables and functions in their own namespace.

	https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
*/

let aspectRatio = 16 / 9;
let currentFrameRate = 0;

let ship;

function setup() {

	let { canvasWidth, canvasHeight } = getCanvasDimensions();
	createCanvas(canvasWidth, canvasHeight);

	ship = new Ship();
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

	fill(0);
	rect(0, 0, width, height);

	if (frameCount % 4 === 0) {
		currentFrameRate = frameRate().toFixed(2);
	}

	fill(255);
	textSize(26);
	text(currentFrameRate, 10, 30);

	// if (mouseIsPressed) {
	// 	fill(0);
	// } else {
	// 	fill(255);
	// }
	// ellipse(mouseX, mouseY, 80, 80);

	ship.update();
	ship.render();
}

function keyPressed() {
	ship.setAcceleration(10);
}

function keyReleased() {
	ship.setAcceleration(0);
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
