/*
	Check out the following link if I want to switch to instance mode for p5.js,
		which would put all p5 variables and functions in their own namespace.

	https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
*/

let aspectRatio = 16 / 9;
let currentFrameRate = 0;

let astronaut;
let ship;

let world;

function setup() {

	let { canvasWidth, canvasHeight } = getCanvasDimensions();
	createCanvas(canvasWidth, canvasHeight);

	world = new World();

	astronaut = new Body(world, 10, 0);

	ship = new Body(world, 1000, 1000);

	world.setPlayer(astronaut);
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

	astronaut.update();
	astronaut.render();

	ship.update();
	ship.render();

	world.update();
	world.render();

	// Display astronaut stats
	let widthOffset = 200;
	let x = width - widthOffset;

	fill(255);
	rectMode(CORNER);
	rect(x, 0, widthOffset, 100);
	fill(0);
	textSize(20);
	text("Position: " + astronaut.position, x, 20);
	text("Velocity: " + astronaut.velocity, x, 40);
	text("Acceleration: " + astronaut.acceleration, x, 60);
	text("Force: " + astronaut.force, x, 80);
	text("FTR: " + astronaut.forceTimeRemaining, x, 100);
}

function keyPressed() {
}

function keyReleased() {
}

function mousePressed() {

	astronaut.applyForce(100, 2);
}

function mouseReleased() {
}
