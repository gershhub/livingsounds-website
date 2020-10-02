const LIGHT_HOUSE_COLOR = "#395b50";
const LIGHT_HOUSE_VERTEX = [787, 508];
const LIGHT_HOUSE_BEZIER_VERTEX = [
  [788.559, 445.7, 795.425, 420, 803, 400],
  [815.034, 386.3, 828.687, 390, 833, 400],
  [837.313, 457.414, 846.081, 497.412, 847, 506],
  [847.919, 514.588, 801.042, 521.715, 787, 508],
];
class Lighthouse {
  constructor(width, height, p5) {
    // constants
    this.width = width;
    this.height = height;
    this.p5 = p5;
    this.lighthouseVertex = [
      ((LIGHT_HOUSE_VERTEX[0] + 110) / 1200.0) * this.width,
      ((LIGHT_HOUSE_VERTEX[1] + 110) / 1200.0) * this.height,
    ];
    this.lighthouseBezierVertex = LIGHT_HOUSE_BEZIER_VERTEX.map((item) =>
      item.map((value, index) => {
        if (index % 2) {
          return ((value + 110) / 1200.0) * this.width;
        } else {
          return ((value + 110) / 1200.0) * this.height;
        }
      })
    );
    this.lighthouseWidth =
      this.lighthouseBezierVertex[1][4] - this.lighthouseBezierVertex[0][4];
    // window parameters
    this.lightPos = [
      this.lighthouseBezierVertex[0][4] + this.lighthouseWidth * 0.5,
      this.lighthouseBezierVertex[0][5],
    ];
    this.lightWidth = this.lighthouseWidth * 0.5;
    // ring parameters
    this.ring1 = [
      this.lightPos[0],
      this.lightPos[1] + this.lighthouseWidth * 0.5,
      this.lighthouseWidth * 1.5,
      this.lighthouseWidth * 0.5,
      -0.5,
      3.5,
    ];
    this.ring2 = [
      this.lightPos[0],
      this.lightPos[1] + this.lighthouseWidth * 0.3,
      this.lighthouseWidth * 1.5,
      this.lighthouseWidth * 0.5,
      -0.2,
      3.2,
    ];
    // light parameters
    this.angle = 0;
    this.speed = 0.00001;
  }
  draw(dTime) {
    this.p5.noStroke();

    // draw lighthouse
    this.p5.fill(this.p5.color(LIGHT_HOUSE_COLOR));
    this.p5.beginShape();
    this.p5.vertex(...this.lighthouseVertex);
    this.lighthouseBezierVertex.forEach((item) =>
      this.p5.bezierVertex(...item)
    );
    this.p5.endShape();

    // draw window
    this.p5.fill(this.p5.color("yellow"));
    this.p5.circle(...this.lightPos, this.lightWidth);
    // draw rings
    this.p5.stroke(this.p5.color("#5a7684"));
    this.p5.noFill();
    this.p5.strokeWeight(3);
    this.p5.arc(...this.ring1);
    this.p5.stroke(this.p5.color("#1f2f16"));
    this.p5.strokeWeight(1);
    this.p5.arc(...this.ring2);

    // draw light
    this.p5.noStroke();
    this.p5.fill(this.p5.color(255, 255, 255, 50));
    this.angle += this.speed * dTime;
    this.p5.arc(
      ...this.lightPos,
      this.width,
      this.height,
      this.angle,
      this.angle + 1
    );
  }
}
