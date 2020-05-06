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
    // set position using noise
    this.x = map(noise(this.tx), 0, 1, 0, this.width);
    this.y = map(noise(this.ty), 0, 1, 0, this.height);
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
