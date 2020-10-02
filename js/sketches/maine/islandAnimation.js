const ISLAND_STONES_COLOR = "#AEBFBC";
const ISLAND_STONES_VERTEX = [970, 479];
const ISLAND_STONES_BEZIER_VERTEX = [
  [1004.53, 350.368, 628.887, 73.9, 286, 107],
  [143.614, 120.743, 71.36, 172.032, 47, 218],
  [5.729, 295.882, 41.126, 383.651, 60, 419],
  [79.228, 455.012, 163.312, 535.505, 303, 576],
  [413.922, 608.155, 542.313, 616.627, 712, 582],
  [866.685, 550.434, 961.045, 512.361, 970, 479],
];

const ISLAND_GRASS_COLOR = "#1F1208";
const ISLAND_GRASS_VERTEX = [198, 139];
const ISLAND_GRASS_BEZIER_VERTEX = [
  [167.846, 157.727, 111.429, 145.525, 104, 283],
  [97.186, 354.978, 134.145, 410.845, 168, 440],
  [211.188, 477.192, 256.884, 478.762, 312, 487],
  [400.72, 500.261, 448.544, 538.958, 542, 537],
  [613.518, 535.5, 666.446, 508.385, 742.842, 488.968],
  [824.007, 468.337, 874.779, 462.975, 886, 431],
  [907.244, 370.465, 791.218, 279.8, 753, 253],
  [675.376, 198.568, 607.824, 182.6, 519, 161],
  [362.088, 122.839, 270.281, 94.11, 198, 139],
];

class Island {
  constructor(width, height, sketch) {
    this.width = width;
    this.height = height;
    this.p5 = sketch;
    this.islandStoneVertex = [
      (ISLAND_STONES_VERTEX[0] / 1000.0) * width,
      (ISLAND_STONES_VERTEX[1] / 1000.0) * height,
    ];
    this.islandStoneBezierVertex = ISLAND_STONES_BEZIER_VERTEX.map((item) =>
      item.map((value, index) => {
        if (index % 2) {
          return (value / 1000.0) * this.height;
        } else {
          return (value / 1000.0) * this.width;
        }
      })
    );
    this.islandGrassVertex = [
      (ISLAND_GRASS_VERTEX[0] / 1000.0) * width,
      (ISLAND_GRASS_VERTEX[1] / 1000.0) * height,
    ];
    this.islandGrassBezierVertex = ISLAND_GRASS_BEZIER_VERTEX.map((item) =>
      item.map((value, index) => {
        if (index % 2) {
          return (value / 1000.0) * this.height;
        } else {
          return (value / 1000.0) * this.width;
        }
      })
    );
  }

  draw() {
    this.p5.noStroke();

    // draw island stones
    this.p5.fill(this.p5.color(ISLAND_STONES_COLOR));
    this.p5.beginShape();
    this.p5.vertex(...this.islandStoneVertex);
    this.islandStoneBezierVertex.forEach((item) =>
      this.p5.bezierVertex(...item)
    );
    this.p5.endShape();

    // draw island grass
    this.p5.fill(this.p5.color(ISLAND_GRASS_COLOR));
    this.p5.beginShape();
    this.p5.vertex(...this.islandGrassVertex);
    this.islandGrassBezierVertex.forEach((item) =>
      this.p5.bezierVertex(...item)
    );
    this.p5.endShape();

  }
}
