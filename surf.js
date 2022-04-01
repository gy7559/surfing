// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/IKB1hWWedMk
// https://thecodingtrain.com/CodingChallenges/011-perlinnoiseterrain.html

// Edited by SacrificeProductions

var cols, rows;
var scl = 40;
var w = 1400;
var h = 1000;

var flying = 0;
let delta = 0.01;
var terrain = [];


let cam;
function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
  cam = createCamera();
  cam.pan(-0.9);
  
}



function draw() {
  ambientLight(200);
  cam.pan(delta);
  if (frameCount % 160 === 0) {
    delta *= -1;
  }
  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
   noStroke();//


  
  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  fill(0, 0, 255,150);
  translate(-w / 2, -h / 2);

  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  push();
  fill(255,0,0);
  beginShape();
  ambientMaterial(255, 102, 94);
  translate(w / 2, h / 2+250);
  rotateX(30);
  cylinder(100, 0);
  endShape();
  pop();
  
}
