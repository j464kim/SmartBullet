var bullet;

function setup() {
	createCanvas(400, 300);
	bullet = new Bullet();
}

function draw() {
	background(0);
	bullet.update();
	bullet.display();
}

function Bullet() {
	this.pos = createVector(width/2, height);
	this.vel = createVector(0, -1);
	this.acc = createVector();


	// Newton's law of force and acceleration
	this.applyForce = function(force) {
		this.acc.add(force);
	};

	// update the state of an arrow
	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	};

	// display the arrow
	this.display = function() {
		push();
		translate(this.pos.x, this.pos.y);
		rectMode(CENTER);

		// x,y position of the triangle vertices
		triangle(-5, 0, 0, -30, 5, 0);
		pop();
	}
}

