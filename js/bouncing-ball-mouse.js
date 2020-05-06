class Mover {
  constructor(position, velocity, acceleration) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.topSpeed = 10;
  }

  update() {
    const mouse = new p5.Vector(mouseX, mouseY);
    const dir = p5.Vector.sub(mouse, this.position);
    dir.normalize().mult(0.5);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
    this.checkEdges();
  }

  checkEdges() {
    if (this.position.x > width || this.position.x < 0) {
      this.position.x = Math.min(Math.max(0, this.position.x), width);
      this.velocity.x *= -1;
    }
    if (this.position.y > height || this.position.y < 0) {
      this.position.y = Math.min(Math.max(0, this.position.y), height);
      this.velocity.y *= -1;
    }
  }

  draw() {
    stroke(0);
    fill(175);
    ellipse(this.position.x, this.position.y, 16, 16);
  }
}

const m = [];
function setup() {
  const canvas = createCanvas(640, 480);
  background(255);
  canvas.style("max-width", "100vw");
  canvas.style("max-height", "calc(100vh - 180px)");
  for (let i = 0; i < 20; i += 1) {
    m[i] = new Mover(
      createVector(random(640), random(480)),
      createVector(0, 0),
      createVector(-0.001, 0.01)
    );
  }
}

function draw() {
  background(255);
  m.forEach((mv) => {
    mv.update();
    mv.draw();
  });
}
