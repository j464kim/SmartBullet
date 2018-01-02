var population;

function setup() {
	createCanvas(400, 300);
	population = new Population();
}

function draw() {
	background(0);
	population.run();
}

function Population() {
	this.bullets = [];
	this.size = 100;

	for (var i = 0; i < this.size; i++) {
		this.bullets[i] = new Bullet();
	}

	this.run = function() {
		for (var i = 0; i < this.size; i++) {
			this.bullets[i].update();
			this.bullets[i].display();
		}
	}
}

function Bullet() {
	this.pos = createVector(width/2, height);
	this.vel = p5.Vector.random2D();
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
		fill(255, 150);
		translate(this.pos.x, this.pos.y);
		rectMode(CENTER);

		// x,y position of the triangle vertices
		triangle(-5, 0, 0, -30, 5, 0);
		pop();
	}
}

