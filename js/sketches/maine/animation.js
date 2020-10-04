class MaineAnimation {
  constructor(width, height, p5) {
    this.width = width;
    this.height = height;
    this.p5 = p5;

    // limit island size
    this.islandWidth = limitValue(width, 750, 1000) * 0.8;
    this.islandHeight = this.islandWidth;

    // position the island in the center if possible
    // if the canvas is to narrow position alight to right side
    this.offsetX = (this.width - this.islandWidth) * 0.2;
    if (this.offsetX < 0) {
      this.offsetX = this.width - this.islandWidth;
    }
    this.offsetY = (this.height - this.islandHeight) * 0.5;

    // create objects
    this.island = new Island(this.islandWidth, this.islandHeight, this.p5);
    this.forest = new Forest(this.islandWidth, this.islandHeight, this.p5);
    this.lighthouse = new Lighthouse(
      this.islandWidth,
      this.islandHeight,
      this.p5
    );
    this.forground = new Forground(this.width, this.height, this.p5);
    this.wave = new Wave(this.width, this.height, this.p5);
    this.colliders = { forground: this.forground.getCollider() };
    this.wave.addCollision(this.colliders);
    this.crab1 = new Crab(
      this.islandWidth * 0.2,
      this.islandHeight * 0.2,
      this.p5,
      this.island.getWalkPath(0.95),
      0.4,
      0.001
    );
    this.crab2 = new Crab(
      this.islandWidth * 0.2,
      this.islandHeight * 0.2,
      this.p5,
      this.island.getWalkPath(0.94),
      0.5,
      0.00095
    );
    this.lobster = new Lobster(this.width, this.height, this.p5);

    // configuration
    this.p5.frameRate(8);
  }

  draw(audio) {
    // default control factors
    let pWind = 0.8;
    let pBird = 0.01;
    let pBug = 0.01;
    let pTree = 0.05;

    // get sound analysis
    this.audio = audio;
    if (this.audio != undefined) {
      let amp = this.audio.analyse();
      let resample = 2;
      let counter = -1;
      let ampResampled = [];
      amp.forEach((item, index) => {
        if (index % resample == 0) {
          counter += 1;
          ampResampled[counter] = item / resample;
        } else {
          ampResampled[counter] += item / resample;
        }
      });
      amp = ampResampled;

      // update probabilities
      let timeDate = new Date();
      let hour = timeDate.getHours;
      let ws = (amp[0] + 0.5 * (amp[1] + amp[2])) * 0.01; // wind
      let bs = amp[1] * 0.01 + (amp[4] + amp[5] + amp[6] + amp[7]) * 0.006; // bird
      let bus = (amp[2] + amp[3]) * 0.01; // bugs

      pTree = limitValue(Math.pow(ws, 2) * 0.01, 0, 0.2);
      pWind = pTree * 5;
      pBird = Math.pow(Math.max(bs - 0.5 * ws, 0), 2) * 0.001;
      pBug = limitValue(Math.pow(Math.max(bus - 0.5 * ws, 0), 4) * 0.01, 0, 1);
      // night
      if (hour > 19 && hour < 5) {
        pBird = Math.pow(Math.max(bs - 0.5 * ws, 0), 6) * 0.0001; //low
        pBug = Math.pow(Math.max(bus - 0.5 * ws, 0), 2) * 0.001; //high
      }
    }
    //console.log(pWind, pTree, pBird, pBug);

    // draw ocean
    this.wave.draw(pWind);
    let hitForground = "forground" in this.wave.hitDetected;
    this.forground.draw(hitForground);
    this.lobster.draw(pWind);
    // draw island
    this.p5.push();
    this.p5.translate(this.offsetX, this.offsetY);
    this.island.draw();
    this.forest.draw(pTree, pBird, pBug);
    this.crab1.draw(1-pWind);
    this.crab2.draw(1-pWind);
    this.lighthouse.draw();
    this.p5.pop();
  }
}
