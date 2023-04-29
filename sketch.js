/*
	Check out the following link if I want to switch to instance mode for p5.js,
		which would put all p5 variables and functions in their own namespace.

	https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
*/

let aspectRatio = 16 / 9;
let currentFrameRate = 0;

function setup() {

	let { canvasWidth, canvasHeight } = getCanvasDimensions();
	createCanvas(canvasWidth, canvasHeight);
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
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight
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

	if (mouseIsPressed) {
		fill(0);
	} else {
		fill(255);
	}
	ellipse(mouseX, mouseY, 80, 80);
}
