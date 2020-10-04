const LOBSTER_VERTEX = [
  [0.595, 12.585],
  [0.472, 23.898],
  [6.797, 27.502],
  [12.469, 26.15],
  [14.613, 24.052],
  [16.027, 24.067],
  [23.036, 29.801],
  [32.174, 34.85],
  [30.699, 40.492],
  [33.542, 39.108],
  [35.003, 34.881],
  [38.546, 34.213],
  [38.576, 31.384],
  [34.319, 32.752],
  [28.77, 22.792],
  [21.761, 17.058],
  [26.795, 9.334],
  [24.044, 2.233],
  [12.746, 0.696],
  [19.74, 7.843],
  [14.068, 9.196],
  [17.565, 12.77],
  [20.393, 12.8],
  [18.233, 16.313],
  [13.307, 14.138],
  [14.66, 19.809],
  [12.531, 20.493],
  [8.35, 14.791],
  [7.573, 21.147],
  [1.295, 13.3],
];
const LOBSTER_VERTEX1 = [
  [343.5, 492.5],
  [223.5, 489.5],
  [19.5, 401.5],
  [0.5, 203.5],
  [129.5, 74.5],
  [149.5, 260.5],
  [170.5, 115.5],
  [246.5, 198.5],
  [261.5, 314.5],
  [213.5, 408.5],
  [334.5, 406.5],
  [338.5, 351.5],
  [367.5, 224.5],
  [437.5, 241.5],
  [495.5, 310.5],
  [526.5, 371.5],
  [574.5, 323.5],
  [501.5, 237.5],
  [464.5, 125.5],
  [481.5, 38.5],
  [560.5, 118.5],
  [582.5, 168.5],
  [561.5, 83.5],
  [487.5, 0.5],
  [656.5, 7.5],
  [742.5, 158.5],
  [673.5, 298.5],
  [629.5, 386.5],
  [556.5, 434.5],
  [555.5, 543.5],
  [513.5, 634.5],
  [453.5, 708.5],
  [372.5, 736.5],
  [391.5, 875.5],
  [269.5, 854.5],
  [286.5, 770.5],
  [183.5, 811.5],
  [145.5, 684.5],
  [309.5, 698.5],
  [343.5, 604.5],
  [343.5, 492.5],
];

const LOBSTER_VERTEX2 = [
  [387.5, 476.5],
  [267.5, 473.5],
  [70.5, 441.5],
  [0.5, 299.5],
  [35.5, 173.5],
  [206.5, 304.5],
  [155.5, 179.5],
  [284.5, 237.5],
  [311.5, 313.5],
  [322.5, 362.5],
  [378.5, 390.5],
  [382.5, 335.5],
  [411.5, 208.5],
  [481.5, 225.5],
  [539.5, 294.5],
  [570.5, 355.5],
  [618.5, 307.5],
  [587.5, 236.5],
  [582.5, 155.5],
  [638.5, 70.5],
  [654.5, 119.5],
  [678.5, 207.5],
  [700.5, 91.5],
  [733.5, 0.5],
  [804.5, 80.5],
  [841.5, 225.5],
  [749.5, 327.5],
  [673.5, 370.5],
  [600.5, 418.5],
  [599.5, 527.5],
  [604.5, 588.5],
  [613.5, 645.5],
  [623.5, 668.5],
  [757.5, 712.5],
  [680.5, 781.5],
  [615.5, 757.5],
  [621.5, 822.5],
  [508.5, 871.5],
  [500.5, 704.5],
  [413.5, 581.5],
  [387.5, 476.5],
];

const LOBSTER_VERTEX3 = [
[387.500,478.500], [267.500,475.500 ],[70.500,443.500 ],
[0.500,301.500  ], [35.500,175.500 ],[183.500,321.500 ],
[308.500,138.500], [349.500,239.500], [351.500,329.500 ],
[322.500,364.500], [378.500,392.500], [382.500,337.500 ],
[411.500,210.500], [481.500,227.500], [539.500,296.500 ],
[570.500,357.500], [618.500,309.500 ],[540.500,258.500 ],
[473.500,178.500], [473.500,90.500 ],[578.500,172.500 ],
[678.500,209.500], [700.500,93.500 ],[729.500,0.500 ],
[804.500,82.500],  [841.500,227.500 ],[ 749.500,329.500 ],
[673.500,372.500 ],[600.500,420.500 ],[599.500,529.500],
[604.500,590.500 ],[613.500,647.500 ],[623.500,670.500 ],
[757.500,714.500 ],[680.500,783.500 ],[615.500,759.500 ],
[621.500,824.500 ],[508.500,873.500], [500.500,706.500 ],
[413.500,583.500 ],[387.500,478.500 ]
]
const LOBSTER_POS = [
  [0.3, 0.7],
  [0.35, 0.75],
  [0.2, 0.7],
  [0.3, 0.8],
  [0.6, 0.9],
  [0.7, 0.7],
  [0.8, 0.77],
  [0.4, 0.72],
  [0.35, 0.85],
];
//LOBSTER_HEIGHT = 40.492;
//LOBSTER_WIDTH = 38.576;
LOBSTER_HEIGHT = 822.5;
LOBSTER_WIDTH = 742.5;
class Lobster {
  constructor(width, height, p5) {
    this.width = width;
    this.height = height;
    this.p5 = p5;
    let scaler = 0.00002 * Math.max(this.width, 1000);
    /*
    this.lobsterVertex = LOBSTER_VERTEX.map((item) => [
      item[0] * scaler,
      (item[1] - LOBSTER_HEIGHT) * scaler,
    ]);
    */
    this.lobsterVertex1 = LOBSTER_VERTEX1.map((item) => [
      item[0] * scaler,
      (item[1] - LOBSTER_HEIGHT) * scaler,
    ]);
    this.lobsterVertex2 = LOBSTER_VERTEX3.map((item) => [
      item[0] * scaler,
      (item[1] - LOBSTER_HEIGHT) * scaler,
    ]);
    this.imgHeight = LOBSTER_HEIGHT * scaler;
    this.imgWidth = LOBSTER_WIDTH * scaler;

    let offScreenSize = this.imgWidth * 3;
    this.offScreen = this.p5.createGraphics(offScreenSize, offScreenSize);
    this.offScreen.translate(offScreenSize * 0.5, offScreenSize);
    this.offScreen.noStroke();
    this.offScreen.fill(this.p5.color(CRAB_COLOR));
    this.offScreen.angleMode(this.p5.DEGREES);
    this.jump = true;
    this.omega = 0;
    this.r1 = 0;
    this.r2 = 0;
    this.f = 0;

    this.posList = LOBSTER_POS.map((item) => [
      item[0] * this.width,
      item[1] * this.height,
    ]);
    this.pos = this.posList[Math.floor(this.p5.random(0, this.posList.length))];
  }

  getCollider() {
    return [
      this.pos[0] + this.imgWidth * 0.5,
      this.pos[1] + this.imgHeight * 0.5,
      this.imgWidth,
      this.imgHeight,
    ];
  }

  draw(controlFactor) {
    // calcualte movement
    let step = this.p5.frameCount % 36;
    let phase = Math.floor(step / 9);

    if (step == 27) {
      this.jump = coinFlip(controlFactor);
      this.pos = this.posList[
        Math.floor(this.p5.random(0, this.posList.length))
      ];
    }
    if (this.jump) {
      if (phase == 3) {
        this.r1 += 0.2;
      } else if (phase == 0) {
        this.r1 -= 0.2;
        this.f +=0.2
      } else if (phase == 1) {
        this.r2 += 0.2;
        this.f -=0.2
      } else if (phase == 2) {
        this.r2 -= 0.2;
      }

      this.r1 = limitValue(this.r1, 0, 1);
      this.r2 = limitValue(this.r2, 0, 1);
      this.f = limitValue(this.f, 0, 1);
      let a = this.p5.sin(0.3 * this.p5.frameCount);
      let ellipseW = 30;
      let ellipseH = 5;
      let ellipseX = this.pos[0] + this.imgWidth * 2.22;
      let ellipseY = this.pos[1] + a * 2 + this.imgHeight * 2.8;

      // draw puddle
      this.p5.noStroke();
      this.p5.fill(this.p5.color(...WAVE_COLOR));
      this.p5.ellipse(
        ellipseX,
        ellipseY,
        ellipseW * this.r1,
        ellipseH * this.r1
      );
      this.p5.ellipse(
        ellipseX - this.imgWidth * 1.5,
        ellipseY,
        ellipseW * this.r2,
        ellipseH * this.r2
      );
      // draw lobster
      this.offScreen.clear();
      this.offScreen.rotate(-10);
      this.offScreen.beginShape();
      this.lobsterVertex2.forEach((item, index) => {
        this.offScreen.vertex(
          (1 - this.f) * item[0] + this.f * this.lobsterVertex1[index][0],
          (1 - this.f) * item[1] + this.f * this.lobsterVertex1[index][1]
        );
      });
      this.offScreen.endShape(this.p5.CLOSE);
      this.p5.image(this.offScreen, this.pos[0], this.pos[1]);
    }
  }
}
