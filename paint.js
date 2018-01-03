var population;
var lifespan = 200;
var count = 0;
var posTarget;
var pTag;

function setup() {
	createCanvas(400, 300);
	population = new Population();
	posTarget = createVector(width/2, 50);
	pTag = createP();
}

function draw() {
	background(0);
	population.run();
	pTag.html(count);

	count++;
	if (count == lifespan) {
		count = 0;
		population = new Population();
	}

	ellipse(posTarget.x, posTarget.y, 16, 16);
}

function DNA() {
	this.genes = [];
	for (var i = 0; i < lifespan; i++) {
		this.genes[i] = p5.Vector.random2D();
		this.genes[i].setMag(0.1);
	}
	console.log(this.genes);
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
	this.vel = createVector();
	this.acc = createVector();
	this.dna =new DNA();

	// Newton's law of force and acceleration
	this.applyForce = function(force) {
		this.acc.add(force);
	};

	// update the state of an arrow
	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		// make velocity consistent
		this.acc.mult(0);
		this.applyForce(this.dna.genes[count]);
	};

	// display the arrow
	this.display = function() {
		// push and pop allow's rotating and translation not to affect other objects
		push();
		fill(255, 150);
		// displace an object as much as the x, y
		translate(this.pos.x, this.pos.y);
		// let the bullet's head point to its direction
		rotate(this.vel.heading() + PI/2);
		// x,y position of the triangle vertices
		triangle(-5, 0, 0, -30, 5, 0);
		pop();
	}
}

