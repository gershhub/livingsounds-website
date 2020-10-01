const STONE_COLOR = "#cacfdf"
const FRONT_STONE_VERTEX = [
  [0.27, 1.2],
  [0.27, 1.0],
  [0.673, 0.871],
  [1.0, 1.0],
  [1.0, 1.2],
];


class Rocks {
  constructor(width, height, p5) {
    this.width = width;
    this.height = height;
    this.p5 = p5;
    this.frontStoneVertex = FRONT_STONE_VERTEX.map((item) => [
      item[0] * width,
      item[1] * height,
    ]);

    this.crab = new Crab(width, height, p5, [this.frontStoneVertex[2][0], this.frontStoneVertex[1][1]])

  }

  draw() {
    this.p5.noStroke();
    // draw front stones
    this.p5.fill(this.p5.color(STONE_COLOR));
    this.p5.beginShape();
    this.frontStoneVertex.forEach((item) => this.p5.curveVertex(...item));
    this.p5.endShape();

    this.crab.draw()
  }
}
