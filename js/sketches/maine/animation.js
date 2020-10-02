class MaineAnimation {
  constructor(width, height, p5, images) {
    this.width = width;
    this.height = height;
    this.p5 = p5;
    this.images = images;

    // limit island size
    this.islandWidth = limitValue(width, 750, 1000) * 0.8;
    this.islandHeight = this.islandWidth;

    // position the island in the center if possible
    // if the canvas is to narrow position alight to right side
    this.offsetX = (this.width - this.islandWidth) * 0.5;
    if (this.offsetX < 0) {
      this.offsetX = this.width - this.islandWidth;
    }
    this.offsetY = (this.height - this.islandHeight) * 0.5;

    // create objects
    this.wave = new Wave(this.width, this.height, this.p5);
    this.island = new Island(this.islandWidth, this.islandHeight, this.p5);
    this.forest = new Forest(this.islandWidth, this.islandHeight, this.p5);
    this.lighthouse = new Lighthouse(
      this.islandWidth,
      this.islandHeight,
      this.p5
    );
    this.forground = new Forground(
      this.width,
      this.height,
      this.p5,
      this.images
    );
    this.wave.setBuoyInfo(this.forground.getBuoyInfo());

    // configuration
    p5.frameRate(8);
  }

  draw = (audio) => {
    // default control factors
    let pWind = 0.05;
    let pBird = 0.01;
    let pBug = 0.01;

    // get sound analysis
    this.audio = audio;
    if (this.audio != undefined) {
      let amp = this.audio.analyse();

      // update probabilities
      let timeDate = new Date();
      let hour = timeDate.getHours;
      let ws = (amp[0] + 0.5 * (amp[1] + amp[2])) * 0.01; // wind
      let bs = amp[1] * 0.01 + (amp[4] + amp[5] + amp[6] + amp[7]) * 0.006; // bird
      let bus = (amp[2] + amp[3]) * 0.01; // bugs

      pWind = limitValue(Math.pow(ws, 2) * 0.01, 0, 1);
      pBird = Math.pow(Math.max(bs - 0.5 * ws, 0), 2) * 0.001;
      pBug = limitValue(Math.pow(Math.max(bus - 0.5 * ws, 0), 4) * 0.01, 0, 1);
      // night
      if (hour > 19 && hour < 5) {
        pBird = Math.pow(Math.max(bs - 0.5 * ws, 0), 6) * 0.0001; //low
        pBug = Math.pow(Math.max(bus - 0.5 * ws, 0), 2) * 0.001; //high
      }
    }
    //console.log(pWind, pBird, pBug);

    this.p5.background("#73a1ff");
    let hitDetected = this.wave.draw(pWind);
    this.p5.push();
    this.p5.translate(this.offsetX, this.offsetY);
    this.island.draw();
    this.forest.draw(pWind, pBird, pBug);
    this.lighthouse.draw();
    this.p5.pop();
    //this.forground.draw(hitDetected);
  };
}