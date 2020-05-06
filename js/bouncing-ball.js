class Mover {
  constructor(position, velocity, acceleration) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.topSpeed = 10;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
    this.checkEdges();
  }

  checkEdges() {
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x *= -1;
    }
    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y *= -1;
    }
  }

  draw() {
    stroke(0);
    fill(175);
    ellipse(this.position.x, this.position.y, 16, 16);
  }
}

class RandomMover extends Mover {
  constructor(position, velocity) {
    super(position, velocity, p5.Vector.random2D());
  }

  update() {
    this.acceleration = p5.Vector.random2D();
    this.acceleration.mult(random(2));
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
    this.checkEdges();
  }
}

let m;
let m2;
function setup() {
  const canvas = createCanvas(640, 480);
  background(255);
  canvas.style("max-width", "100vw");
  canvas.style("max-height", "calc(100vh - 180px)");
  m = new Mover(
    createVector(random(320), random(240)),
    createVector(0, 0),
    createVector(-0.001, 0.01)
  );
  m2 = new RandomMover(
    createVector(random(320), random(240)),
    createVector(0, 0)
  );
}

function draw() {
  background(255);
  m.update();
  m.draw();

  m2.update();
  m2.draw();
}
