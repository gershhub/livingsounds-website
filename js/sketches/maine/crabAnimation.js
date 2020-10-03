const CRAB_VERTEX = [
  [0.0, 114.0], // leg 0
  [25.0, 107.0],
  [25.0, 92.0],
  [2.0, 87.0], // leg 3
  [24.0, 80.0],
  [25.0, 66.0],
  [10.0, 33.0],
  [53.0, -0.0], // tip 7
  [46.0, 36.0],
  [75.0, 13.0], // tip 9
  [76.0, 58.0],
  [32.0, 66.0],
  [61.0, 77.0],
  [68.0, 70.0], // eye 13
  [69.0, 79.0],
  [77.0, 83.0],
  [86.0, 91.0],
  [95.0, 89.0], // eye 17
  [90.0, 97.0],
  [112.0, 118.0],
  [100.0, 74.0],
  [128.0, 41.0], // tip 21
  [134.0, 81.0],
  [166.0, 56.0], // tip 23
  [162.0, 98.0],
  [116.0, 123.0],
  [122.0, 129.0],
  [95.0, 132.0],
  [90.0, 158.0], // leg 28
  [82.0, 132.0],
  [71.0, 132.0],
  [64.0, 154.0], // leg 31
  [57.0, 133.0],
  [30.0, 136.0],
  [27.0, 118.0],
];
const CLOSE_FRAMES = [0, 1, 0, 1, 0, 0, 0, 0];
const LEG_FRAMES = [0, 1, 0, 1, 0, 1, 0, 1];
const CRAB_COLOR_PATCHES = [
  [
    [101.0, 71.0],
    [122.0, 60.0],
    [132.0, 78.0],
    [157.0, 71.0],
    [163.0, 94.0],
    [112.0, 120.0],
  ],
  [
    [28.0, 66.0],
    [14.0, 34.0],
    [37.0, 23.0],
    [46.0, 36.0],
    [64.0, 34.0],
    [71.0, 57.0],
  ],
  [
    [137.0, 80.0],
    [164.0, 97.0],
    [164.0, 60.0],
  ],
  [
    [25.0, 63.0],
    [64.0, 79.0],
    [27.0, 109.0],
    [25.0, 63.0],
  ],
  [
    [11.0, 32.0],
    [50.0, 3.0],
    [45.0, 35.0],
  ],
  [
    [101.0, 75.0],
    [132.0, 80.0],
    [127.0, 42.0],
  ],
  [
    [28.0, 70.0],
    [76.0, 84.0],
    [117.0, 126.0],
    [60.0, 104.0],
    [28.0, 70.0],
  ],
  [
    [75.0, 60.0],
    [74.0, 17.0],
    [47.0, 36.0],
  ],
  [
    [91.0, 103.0],
    [71.0, 127.0],
    [116.0, 127.0],
    [91.0, 103.0],
  ],
];

class Crab {
  constructor(width, height, p5, pos = [0, 0], radius = 100, alpha0 = 2) {
    // constants
    this.width = width;
    this.height = height;
    this.p5 = p5;
    this.crabVertex = CRAB_VERTEX.map((item) => [
      (item[0] / 2000) * this.width,
      (item[1] / 2000) * this.height,
    ]);
    this.crabColorVertex = CRAB_COLOR_PATCHES.map((item) =>
      item.map((coord) => [
        (coord[0] / 2000) * this.width,
        (coord[1] / 2000) * this.height,
      ])
    );
    // tip closed position
    this.closedL = [
      (this.crabVertex[9][0] - this.crabVertex[7][0]) * 0.5 +
        this.crabVertex[7][0],
      (this.crabVertex[9][1] - this.crabVertex[7][1]) * 0.5 +
        this.crabVertex[7][1],
    ];
    this.closedR = [
      (this.crabVertex[23][0] - this.crabVertex[21][0]) * 0.5 +
        this.crabVertex[21][0],
      (this.crabVertex[23][1] - this.crabVertex[21][1]) * 0.5 +
        this.crabVertex[21][1],
    ];

    // leg movement position
    this.legInLTop = [
      this.crabVertex[0][0] +
        0.4 * (this.crabVertex[1][0] - this.crabVertex[0][0]),
      this.crabVertex[0][1],
    ];

    this.legInLBottom = [
      this.crabVertex[3][0] +
        0.4 * (this.crabVertex[4][0] - this.crabVertex[3][0]),
      this.crabVertex[3][1],
    ];

    this.legInRTop = [
      this.crabVertex[28][0],
      this.crabVertex[28][1] -
        0.4 * (this.crabVertex[31][1] - this.crabVertex[32][1]),
    ];

    this.legInRBottom = [
      this.crabVertex[31][0],
      this.crabVertex[31][1] +
        0.4 * (this.crabVertex[4][0] - this.crabVertex[3][0]),
    ];
    this.speed = 0.0001;
    this.crabWidth = 0.2 * this.width;
    this.hidingWidth = 2 * radius + this.crabWidth;

    // variables
    this.pos = pos;
    this.alpha = alpha0;
    this.radius = radius;
    this.cut = true;
    this.walk = true;
    this.dx = this.pos[0];
    this.dy = this.pos[1];
  }

  draw(controlFactor) {
    // calculate vertext position
    let step = Math.floor(this.p5.frameCount) % 8;
    let crabVertexToDraw = [...this.crabVertex];
    let crabColorVertexToDraw = this.crabColorVertex.map((item) => [...item]);
    if (step == 0) {
      this.cut = coinFlip(0.5);
      this.walk = coinFlip(controlFactor);
    }
    if (this.cut) {
      if (CLOSE_FRAMES[step]) {
        crabVertexToDraw[7] = this.closedL;
        crabVertexToDraw[9] = this.closedL;
        crabVertexToDraw[21] = this.closedR;
        crabVertexToDraw[23] = this.closedR;
        crabColorVertexToDraw[2][2] = this.closedR;
        crabColorVertexToDraw[4][1] = this.closedL;
        crabColorVertexToDraw[5][2] = this.closedR;
        crabColorVertexToDraw[7][1] = this.closedL;
      }
    }
    if (this.walk) {
      // calculate movement
      this.alpha += this.speed * this.p5.deltaTime;
      this.dx =
        Math.sin(this.alpha) * this.radius +
        this.pos[0] +
        this.p5.random(-0.1, 0.1);
      this.dy = Math.cos(this.alpha) * this.radius + this.pos[1];
      +this.p5.random(-0.1, 0.1);
      if (LEG_FRAMES[step]) {
        crabVertexToDraw[0] = this.legInLTop;
        crabVertexToDraw[3] = this.legInLBottom;
        crabVertexToDraw[28] = this.legInRTop;
        crabVertexToDraw[31] = this.legInRBottom;
      }
    }

    // draw crab
    this.p5.noStroke();
    this.p5.fill(this.p5.color(CRAB_COLOR));
    this.p5.beginShape();
    crabVertexToDraw.forEach((item) =>
      this.p5.vertex(item[0] + this.dx, item[1] + this.dy)
    );
    this.p5.endShape(this.p5.CLOSE);
    // draw highlights
    this.p5.fill(this.p5.color(...CRAB_HIGHLIGHT_COLOR));
    crabColorVertexToDraw.forEach((item) => {
      this.p5.beginShape();
      item.forEach((coord) =>
        this.p5.vertex(coord[0] + this.dx, coord[1] + this.dy)
      );
      this.p5.endShape(this.p5.CLOSE);
    });
    // draw eyes
    this.p5.fill(this.p5.color("black"));
    this.p5.circle(
      crabVertexToDraw[13][0] + this.dx,
      crabVertexToDraw[13][1] + this.dy,
      1
    );
    this.p5.circle(
      crabVertexToDraw[17][0] + this.dx,
      crabVertexToDraw[17][1] + this.dy,
      1
    );
    // draw hiding
    //this.p5.fill(this.p5.color(ISLAND_STONES_COLOR));
    //this.p5.arc(...this.pos, this.hidingWidth, this.hidingWidth, 0, 3);
  }
}
