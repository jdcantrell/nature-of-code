function setup() {
  createCanvas(320, 240);
  frameRate(1);
}

let t = 100;
function draw() {
  t += 0.05;
  loadPixels();
  let scale = 0.05;
  let tx = 0;
  for (let x = 0; x < 640; x += 1) {
    let ty = 0;
    for (let y = 0; y < 480; y += 1) {
      const brightness = map(noise(tx * scale, ty * scale, t), 0, 1, 0, 255);
      set(x, y, color(brightness));
      ty += 0.1;
    }
    tx += 0.1;
  }
  updatePixels();
}
