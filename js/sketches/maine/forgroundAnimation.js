const STONE_COLOR = "#494949";
const FRONT_STONE_VERTEX = [[0.5, 192.5]];
const FRONT_STORN_BEZIER_VERTEX = [
  [0.605, 180.094, 70.618, 137.118, 239.5, 83.5],
  [301.974, 63.665, 401.654, -0.288, 504.5, 1.5],
  [886.308, -0.049, 974.313, 166.92, 974.5, 184.45],
  [974.679, 201.283, 733.303, 221.359, 514.5, 221.452],
  [298.856, 221.543, 0.358, 209.239, 0.5, 192.5],
];
const FRONT_STONE_WIDTH = 974;
const FRONT_STONE_HEIGHT = 150;

const BUOY_CIFF_POS = [-100, 50];
const BUOY_SI_POS = [-500, 60];
const BUOY_NAYO_POS = [100, 700];

class Forground {
  constructor(width, height, p5, images) {
    this.width = width;
    this.height = height;
    this.p5 = p5;
    this.images = images;

    // calculate stone vertext position
    // stone coordinates are scaled by the width of the canvas
    // with max width limit
    let span = 0.9;
    let effectiveWidth = Math.min(this.width, 500);
    let scaler = effectiveWidth * 0.001 * span;
    let stoneOffsetX = -FRONT_STONE_WIDTH * scaler + this.width * span;
    let stoneOffsetY = -FRONT_STONE_HEIGHT * scaler + this.height;
    this.frontStoneVertex = vertexScale(
      FRONT_STONE_VERTEX,
      scaler,
      stoneOffsetX,
      scaler,
      stoneOffsetY
    );
    this.frontStoneBezierVertex = bezierVertexScale(
      FRONT_STORN_BEZIER_VERTEX,
      scaler,
      stoneOffsetX,
      scaler,
      stoneOffsetY
    );

    // calculate buoy positions
    this.imgWidth = 400 * scaler;
    this.imgHeight = (1030 / 916) * this.imgWidth;
    let buoyOffsetX = -this.imgWidth + this.width * span;
    let buoyOffsetY = -this.imgHeight + this.height;
    this.buoyCIFFPos = vertexScale(
      [BUOY_CIFF_POS],
      scaler,
      buoyOffsetX,
      scaler,
      buoyOffsetY
    )[0];
    this.buoySIPos = vertexScale(
      [BUOY_SI_POS],
      scaler,
      buoyOffsetX,
      scaler,
      buoyOffsetY
    )[0];
    this.imgWidthS = this.imgWidth * 0.3;
    this.imgHeightS = this.imgHeight * 0.3;
    this.buoyNAYOPos = vertexScale(
      [BUOY_NAYO_POS],
      0.001 * this.width,
      0,
      0.001 * this.height,
      0
    )[0];
    this.impact = 0;

    // calculate crab position
    this.crab = new Crab(
      effectiveWidth,
      effectiveWidth,
      p5,
      [
        -FRONT_STONE_WIDTH * scaler * 0.55 + this.width * span,
        -FRONT_STONE_HEIGHT * scaler * 0.5 + this.height,
      ],
      100 * scaler
    );
  }

  getBuoyInfo() {
    return {
      pos: [
        this.buoyNAYOPos[0] + this.imgWidthS * 0.5,
        this.buoyNAYOPos[1] + this.imgHeightS * 0.8,
      ],
      width: this.imgWidthS,
      height: this.imgHeightS,
    };
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
    let b = this.p5.sin(0.3 * this.p5.frameCount)
    let dynPos = [
      this.buoyNAYOPos[0] + a * 5 * this.impact,
      this.buoyNAYOPos[1] + b * 6 * this.impact,
    ];
    let ellipseWidth = 70 * this.impact;
    let ellipseHeight = 20 * this.impact;
    this.p5.fill(this.p5.color(...WAVE_COLOR));
    this.p5.ellipse(
      dynPos[0] + this.imgWidthS * 0.5,
      this.buoyNAYOPos[1] + b * 3 * this.impact + this.imgHeightS * 0.85,
      ellipseWidth,
      ellipseHeight
    );
    this.p5.image(this.images[2], ...dynPos, this.imgWidthS, this.imgHeightS);

    // SI buoy
    this.p5.image(
      this.images[1],
      ...this.buoySIPos,
      this.imgWidth,
      this.imgHeight
    );

    // draw front stones
    this.p5.noStroke();
    this.p5.fill(this.p5.color(STONE_COLOR));
    this.p5.beginShape();
    this.p5.vertex(this.frontStoneVertex);
    this.frontStoneBezierVertex.forEach((item) =>
      this.p5.bezierVertex(...item)
    );
    this.p5.endShape();

    // CIFF buoy
    this.p5.image(
      this.images[0],
      ...this.buoyCIFFPos,
      this.imgWidth,
      this.imgHeight
    );

    // crab
    this.crab.draw();
  }
}
