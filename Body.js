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

	/*

	TODO: Consider a composition pattern for objects

	An item:
		* Can be a body
		* Can contain stuff
		* Can equip stuff?
		

	*/


	constructor(world, mass, position) {

		this.world = world;

		this.mass = mass;
		this.position = position;
		this.velocity = 0;
		this.acceleration = 0;

		this.force = 0;
		this.forceTimeRemaining = 0;

		this.physicsComponent = new PhysicsComponent();

		this.contents = [];
	}

	update() {

		this.physicsComponent.update(this);

		// if (this.forceTimeRemaining > 0) {
		// 	this.acceleration = this.force / this.getMass();
		// 	this.forceTimeRemaining -= deltaTime / 1000;
		// } else {
		// 	this.force = 0;
		// 	this.forceTimeRemaining = 0;
		// 	this.acceleration = 0;
		// }

		// this.position += this.velocity * deltaTime / 1000;
		// this.velocity += this.acceleration * deltaTime / 1000;
	}

	render() {
		push();

		if (this.position >= this.world.prevCheckpoint && this.position <= this.world.nextCheckpoint) {
			fill(255);
			let x = map(this.position, this.world.prevCheckpoint, this.world.nextCheckpoint, 100, width - 100);
			circle(x, height / 2, 20);
		}

		pop();
	}

	applyForce(force, time) {
		this.force = force;
		this.forceTimeRemaining = time;
	}

	getMass() {
		// TODO: eventually this will also need to return contained and equipped masses

		let mass = this.mass;

		this.contents.forEach(body => {
			mass += body.getMass();
		});

		return mass;
	}

}
