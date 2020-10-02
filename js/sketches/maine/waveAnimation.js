WAVE_COLOR = [255, 204, 255];

class Wave {
  constructor(
    width,
    height,
    sketch,
    visibleLimitFactor = -0.5,
    shiftFactor = 0.5,
    waveCrashFactor = 0.8
  ) {
    // constants
    this.width = width;
    this.height = height;
    this.p5 = sketch;
    this.color = this.p5.color(...WAVE_COLOR);
    this.addLineMinDist = 0.08 * this.height; // minimum distance between lines
    this.shift = shiftFactor; // shift of one side to create waves at an angle
    this.visibleLimit = visibleLimitFactor * this.height - this.shift;
    this.waveCurveFactor = 0.03;
    this.waveCrashLimit = waveCrashFactor * this.height + this.visibleLimit;
    this.speedMin = 0.002; // minimum speed px / s
    this.speedRange = 0.02; // range of speeds px / s
    this.alphaSpeedFactor = 0.03; // wave crashing rhythm
    this.alphaSpeedMin = 1
    // variables
    this.speed = 0;
    this.deltaTimeLastLine = 0;
    this.addLineRandomDelay = 0;
    this.lines = [];
    // add 20 lines
    for (let i = 0; i < 20; i++) {
      let seed = this.height - i * this.addLineMinDist;
      this.addLine(seed, seed);
    }
    this.hitDetected = false;
  }

  setBuoyInfo(info) {
    this.buoy = info;
  }

  addLine(y = this.height, alpha = 0) {
    let length = this.p5.random(0.2, 0.6) * this.width;
    let y3 = y;
    let x3 = (1 - this.p5.random(-1, 1)) * this.width;
    let dx2 = this.p5.random(0.2, 0.5) * length;
    let dx1 = this.p5.random(0.5, 0.7) * length;
    let dx0 = length;
    this.lines.push([y3, x3, dx2, dx1, dx0, alpha]);
  }

  draw(controlFactor = 1) {
    const speedTarget = this.speedMin + this.speedRange * controlFactor;
    if (this.speed < speedTarget - 0.0005) {
      this.speed += 0.0005;
    } else if (this.speed > speedTarget + 0.0005) {
      this.speed -= 0.0005;
    }
    const dTime = this.p5.deltaTime;
    console.log(this.speed);

    // add new line
    if (this.deltaTimeLastLine > this.addLineRandomDelay) {
      // reset delta time since last line added
      this.deltaTimeLastLine = 0;
      // calculate next time to add line
      this.addLineRandomDelay =
        (this.addLineMinDist * (1 - controlFactor + this.p5.random(1))) /
        speedTarget;
      // add new line
      this.addLine();
    } else {
      this.deltaTimeLastLine += dTime;
    }

    // move lines
    const d = this.speed * dTime;
    this.lines = this.lines.map((item) => {
      item[0] -= d;
      item[1] -= d * this.shift;
      item[5] += this.alphaSpeedFactor * Math.max(d, this.alphaSpeedMin);
      return item;
    });

    // remove lines out of range
    this.lines = this.lines.filter((item) => item[0] > this.visibleLimit);

    // draw lines
    this.hitDetected = false;
    this.lines.forEach((item) => {
      // styling
      this.p5.noStroke();
      //this.p5.stroke(this.color);
      this.p5.fill(this.color);

      // calculate wave spread factor

      let a =
        Math.pow(this.p5.sin(item[5]), 2) * this.height * this.waveCurveFactor;

      // draw line
      this.p5.bezier(
        item[1] - item[4],
        item[0] + this.shift * item[4],
        item[1] - item[3] - this.shift * a,
        item[0] + this.shift * item[3] - a,
        item[1] - item[2] - this.shift * a,
        item[0] + this.shift * item[2] - a,
        item[1],
        item[0]
      );

      // calculate hit detection
      let hitDist = item[1] - this.buoy.pos[0];
      if (hitDist < item[4] && hitDist > 0) {
        let yStar = hitDist * this.shift + item[0];
        if (Math.abs(yStar - this.buoy.pos[1]) < this.buoy.height) {
          this.hitDetected = true;
        }
      }
    });
    return this.hitDetected;
  }

  limit(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }
}
