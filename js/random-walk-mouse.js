class Walker {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = width / 2;
    this.y = height / 2;
    this.tx = 0;
    this.ty = 1000;
  }

  step() {
    // move towards mouse, use noise to determine step size
    const moveTowardsMouse = 1 - random(1) < 0.15;
    let xStep;
    let yStep;
    if (moveTowardsMouse) {
      xStep = this.x > mouseX ? -1 : 1;
      yStep = this.y > mouseY ? -1 : 1;
    } else {
      xStep = Math.round(random(2)) - 1;
      yStep = Math.round(random(2)) - 1;
    }

    xStep *= map(noise(this.tx), 0, 1, 1, 6);
    yStep *= map(noise(this.ty), 0, 1, 1, 6);

    if (this.x + xStep > 0 && this.x + xStep < this.width) {
      this.x += xStep;
    }
    if (this.y + yStep > 0 && this.y + yStep < this.height) {
      this.y += yStep;
    }
  }

  draw() {
    this.tx += 0.01;
    this.ty += 0.01;
    noStroke();
    fill(0, 172, 91, 30);
    ellipse(this.x, this.y, 8, 8);
  }
}

function setup() {
  var canvas = createCanvas(640, 480);
  background(255);
  canvas.style("max-width", "100vw");
  canvas.style("max-height", "calc(100vh - 180px)");
  canvas.style("height", "auto");
  canvas.style("width", "auto");
}

const w = new Walker(640, 480);
function draw() {
  w.step();
  w.draw();
}
