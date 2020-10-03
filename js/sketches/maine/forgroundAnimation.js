const BOAT_POS = [0.1, 0.7];
const BOAT_COLOR = "white";
const BOAT_VERTEX = [
  [469.287, 75.597],
  [435.0, 176.0],
  [138.0, 160.0],
  [-0.0, 36.0],
  [132.718, 47.198],
  [152.858, 0.46],
  [355.306, 5.893],
  [362.475, 66.585],
  [469.287, 75.597],
];
BOAT_LINE = [0.0, 30.0, 472.0, 69.0];
BOAT_HEIGHT = 176;
BOAT_WIDTH = 469.287;
class Forground {
  constructor(width, height, p5) {
    this.width = width;
    this.height = height;
    this.p5 = p5;

    let scaler = 0.0001 * this.width;
    this.boatVertex = BOAT_VERTEX.map((item) => [
      item[0] * scaler,
      item[1] * scaler,
    ]);

    this.boatLine = BOAT_LINE.map((item) => item * scaler);
    this.imgHeight = BOAT_HEIGHT * scaler;
    this.imgWidth = BOAT_WIDTH * scaler;
    this.boatPos = [BOAT_POS[0] * this.width, BOAT_POS[1] * this.height];
    this.impact = 0;
  }

  getCollider() {
    return [
      this.boatPos[0] + this.imgWidth * 0.5,
      this.boatPos[1] + this.imgHeight * 0.5,
      this.imgWidth,
      this.imgHeight,
    ];
  }

  draw(hitDetected) {
    // nayo buoy
    if (hitDetected) {
      this.impact += 0.01;
    } else {
      this.impact -= 0.01;
    }
    this.impact = limitValue(this.impact, 0.3, 1);
    let a = this.p5.sin(0.196 * this.p5.frameCount);
    let b = this.p5.sin(0.3 * this.p5.frameCount);
    let dynPos = [
      this.boatPos[0] + a * 5 * this.impact,
      this.boatPos[1] + b * 6 * this.impact,
    ];

    // draw buddle
    let ellipseWidth = 40 * (1 + this.impact);
    let ellipseHeight = 20 * this.impact;
    this.p5.fill(this.p5.color(...WAVE_COLOR));
    this.p5.ellipse(
      dynPos[0] + this.imgWidth * 0.5,
      this.boatPos[1] + b * 3 * this.impact + this.imgHeight,
      ellipseWidth,
      ellipseHeight
    );

    // draw boat
    let dx = this.boatPos[0] + a * 5 * this.impact;
    let dy = this.boatPos[1] + b * 6 * this.impact;
    this.p5.noStroke();
    this.p5.fill(this.p5.color(BOAT_COLOR));
    this.p5.beginShape();
    this.boatVertex.forEach((item) =>
      this.p5.vertex(item[0] + dx, item[1] + dy)
    );
    this.p5.endShape(this.p5.CLOSE);
    this.p5.stroke(this.p5.color(ISLAND_GRASS_COLOR));
    this.p5.line(
      this.boatLine[0] + dx,
      this.boatLine[1] + dy,
      this.boatLine[2] + dx,
      this.boatLine[3] + dy
    );
  }
}
