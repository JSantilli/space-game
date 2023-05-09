/*
	Check out the following link if I want to switch to instance mode for p5.js,
		which would put all p5 variables and functions in their own namespace.

	https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
*/

let aspectRatio = 16 / 9;
let currentFrameRate = 0;

// let ship;
// let box;

let ship;

function setup() {

	let { canvasWidth, canvasHeight } = getCanvasDimensions();
	createCanvas(canvasWidth, canvasHeight);

	ship = new Body(10, 0);

	// ship = new Ship();
	// box = new Box();
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
}

function keyPressed() {
	// ship.setAcceleration(10);
}

function keyReleased() {
	// ship.setAcceleration(0);
}

function mousePressed() {
	// box.setSelected(true);

	ship.applyForce(10, 2);
}

function mouseReleased() {
	// box.setSelected(false);
}
