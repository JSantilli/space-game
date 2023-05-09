class Body {

	/*

	A Body is something that has mass and either moves or can be jettisoned.

	mass:

		kg

		For some Bodies the mass will simply be the complete mass of the object
			E.g. a matter cube is an atomic mass unit that cannot be broken down further.

		For some Bodies the mass is entirely composed of contained or composing Bodies
			E.g. the ship contains cargo that contributes to its mass, and can be fully decomposed down to zero mass

		For some Bodies the mass is partly composed of contained or composing Bodies, but also has inherent mass
			E.g. the astronaut has gear that contribues to mass, but is themselves a mass
			E.g. a crate contains Bodies, and has mass

	position, velocity, acceleration:

		position: m
		velocity: m/s
		acceleration: m/s^2

		Bodies exist in 1 dimension. Therefore, position, velocity, and acceleration can all be defined as a single value each

		positive = right
		negative = left

		TODO: are these essentially ignored when contained or equiped by another Body?

	*/

	constructor(mass, position) {

		this.mass = mass;
		this.position = position;
		this.velocity = 0;
		this.acceleration = 0;

		this.force = 0;
		this.forceTimeRemaining = 0;
	}

	update() {
		this.position += this.velocity * deltaTime / 1000;
		this.velocity += this.acceleration * deltaTime / 1000;

		// TODO: I end up with tiny errors probably as a result of the delta time variable evenly dividing a second, idk how to fix that

		if (this.forceTimeRemaining > 0) {
			this.acceleration = this.force / this.getMass();
			this.forceTimeRemaining -= deltaTime / 1000;
		} else {
			this.force = 0;
			this.forceTimeRemaining = 0;
			this.acceleration = 0;
		}
	}

	render() {
		push();

		fill(255);
		circle(this.position % width, height / 2, 20);

		// Display Body stats
		let widthOffset = 200;
		let x = width - widthOffset;

		fill(255);
		rectMode(CORNER);
		rect(x, 0, widthOffset, 100);
		fill(0);
		textSize(20);
		text("Position: " + this.position, x, 20);
		text("Velocity: " + this.velocity, x, 40);
		text("Acceleration: " + this.acceleration, x, 60);
		text("Force: " + this.force, x, 80);
		text("FTR: " + this.forceTimeRemaining, x, 100);

		pop();
	}

	applyForce(force, time) {
		this.force = force;
		this.forceTimeRemaining = time;
	}

	getMass() {
		// TODO: eventually this will also need to return contained and equipped masses
		return this.mass;
	}

}
