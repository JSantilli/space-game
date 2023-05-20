class PhysicsComponent {

	update(gameObject) {

		// TODO: I end up with tiny errors probably as a result of the delta time variable evenly dividing a second, idk how to fix that

		if (gameObject.forceTimeRemaining > 0) {
			gameObject.acceleration = gameObject.force / gameObject.getMass();
			gameObject.forceTimeRemaining -= deltaTime / 1000;
		} else {
			gameObject.force = 0;
			gameObject.forceTimeRemaining = 0;
			gameObject.acceleration = 0;
		}

		gameObject.position += gameObject.velocity * deltaTime / 1000;
		gameObject.velocity += gameObject.acceleration * deltaTime / 1000;
	}
}
