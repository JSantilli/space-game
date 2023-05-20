class World {

	constructor() {

		this.checkpoints = [];

		this.checkpoints.push(0);
		this.checkpoints.push(1000);
		this.checkpoints.push(10000);

		this.prevCheckpoint = 0;
		this.nextCheckpoint = 0;
	}

	update() {

		const nextCheckpointIndex = this.getNextCheckpointIndex();
		this.prevCheckpoint = this.checkpoints[nextCheckpointIndex - 1];
		this.nextCheckpoint = this.checkpoints[nextCheckpointIndex];
	}

	render() {
		push();

		/* 
		TODO: There should be a render mode for both normal play and as you transition to a new checkpoint

		Normal: As below. Show the previous checkpoint and the next checkpoint on the left and right.

		Transition: Some kind of 'interpolation' between the current checkpoint state and the next one.
		* Move the accomplished checkpoint left to the left side of the line
		* Move the next checkpoint in to the right side of the line
		* 'Stretch' the space between to give the sense of the space expanding
			* Sense of an opening abyss of space
		*/

		let lineStartX = 100;
		let lineEndX = width - 100;
		let lineY = height / 2;

		stroke(255);
		line(lineStartX, lineY, lineEndX, lineY);

		fill(255);
		textAlign(CENTER, CENTER);

		push();
		translate(lineStartX, lineY);
		triangle(0, 10, 5, 15, -5, 15);
		noStroke();
		text(this.prevCheckpoint, 0, 50);
		pop();

		push();
		translate(lineEndX, lineY);
		triangle(0, 10, 5, 15, -5, 15);
		noStroke();
		text(this.nextCheckpoint, 0, 50);
		pop();

		pop();
	}

	getNextCheckpointIndex() {

		for (let i = 0; i < this.checkpoints.length; i++) {
			const checkpoint = this.checkpoints[i];
			if (checkpoint > this.player.position) {
				return i;
			}
		}

		return -1;
	}

	setPlayer(player) {
		this.player = player;
	}
}
