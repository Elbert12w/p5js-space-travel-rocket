let raindrops = [];
let numOfDrops = 1000;
let blockNumberX = 100;
let blockNumberY = 100;

function preload() {
  img = loadImage("img/rocket.png");
}

function setup() {
  frameRate(60);
  imageMode(CENTER);
  createCanvas(400, 600);
  pixelDensity(1);
  for (var i = 0; i < numOfDrops; i++) {
    raindrops[i] = new Raindrop();
  }
}

function draw() {
  background(0);
  image(img, mouseX, mouseY, 70, 100);
  loadPixels();
  for (let i = 0; i < blockNumberX; i++) {
    for (let j = 0; j < blockNumberY; j++) {
      let index =
        (((j * height) / blockNumberY) * width + (i * width) / blockNumberX) *
        4;
      let r = pixels[index];
      let g = pixels[index + 1];
      let b = pixels[index + 2];
      let a = pixels[index + 3];
      fill(r, g, b);
      noStroke();
      rect(
        (i * width) / blockNumberX,
        (j * height) / blockNumberY,
        width / blockNumberX,
        height / blockNumberY
      );
    }
  }
  for (var i = 0; i < numOfDrops; i++) {
    raindrops[i].fall();
    raindrops[i].repulse(120);
    raindrops[i].show();
    if (raindrops[i].reachedBottom()) {
      //raindrops[i].splash();
      raindrops[i].x = random(windowWidth);
      raindrops[i].y = random(-200, -600);
      raindrops[i].z = random(1, 3);
    }
  }
}

class Raindrop {
  constructor() {
    this.x = random(windowWidth);
    this.origionalX = this.x;
    this.y = random(-200, -600);
    this.z = random(1, 3);

    this.speed = random(1, 3);
    this.origionalSpeed = this.speed;
    this.gravity = random(1, 2);
    this.xForce = 0;
    this.len = random(3, 10);
    this.origionalLen = this.len;
    this.rgb = [random(255), random(255), random(255)];
  }
  fall() {
    if (mouseIsPressed) {
      if (this.speed < 12) {
        this.speed += 0.05;
      }
      if (this.len < 80) {
        this.len += 0.2;
      }
    } else {
      if (this.speed > this.origionalSpeed) {
        this.speed -= 0.3;
      }
      if (this.len > this.origionalLen) {
        this.len -= 1;
      }
    }
    this.x += this.xForce;
    this.y += this.speed + this.gravity;
  }
  repulse(distance) {
    this.force = 3;
    this.distance = sqrt(sq(this.x - mouseX) + sq(this.y - mouseY));
    if (this.distance < distance) {
      if (this.x - mouseX > 0) {
        this.xForce =
          map(this.x - mouseX, 0, distance, this.force, 0) *
          map(this.distance, 0, distance, 1, 0);
      }
      if (this.x - mouseX < 0) {
        this.xForce =
          map(this.x - mouseX, 0, -distance, -this.force, 0) *
          map(this.distance, 0, distance, 1, 0);
      }
    } else {
      this.xForce = 0;
    }
  }
  reachedBottom() {
    if (this.y > windowHeight) {
      this.x = random(windowWidth);
      return true;
    } else {
      return false;
    }
  }
  splash() {
    strokeWeight(this.z);

    line(this.x, this.y, this.x + 10, this.y - 10); //RIGHT
    line(this.x, this.y, this.x + 10, this.y - 20);

    line(this.x, this.y, this.x, this.y - 10); //MIDDLE

    line(this.x, this.y, this.x - 10, this.y - 20);
    line(this.x, this.y, this.x - 10, this.y - 10); //LEFT
  }

  show() {
    strokeWeight(this.z);
    stroke(this.rgb[0], this.rgb[1], this.rgb[2]);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}
