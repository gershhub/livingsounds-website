const BOAT_POS = [0.1, 0.7];

class Forground {
  constructor(width, height, p5, images) {
    this.width = width;
    this.height = height;
    this.p5 = p5;
    this.images = images;

    // calculate buoy positions
    let effectiveWidth = Math.min(this.width, 500);
    this.imgWidth = 0.08 * effectiveWidth;
    this.imgHeight = this.imgWidth;
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
    let ellipseWidth = 40 * (1+ this.impact);
    let ellipseHeight = 20 * this.impact;
    this.p5.fill(this.p5.color(...WAVE_COLOR));
    this.p5.ellipse(
      dynPos[0] + this.imgWidth * 0.5,
      this.boatPos[1] + b * 3 * this.impact + this.imgHeight * 0.8,
      ellipseWidth,
      ellipseHeight
    );
    this.p5.image(this.images[0], ...dynPos, this.imgWidth, this.imgHeight);
  }
}
