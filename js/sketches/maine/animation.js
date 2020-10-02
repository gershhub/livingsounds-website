class MaineAnimation {
  constructor(width, height, audioStream, p5, images) {
    this.width = width;
    this.height = height;
    this.p5 = p5;
    this.images = images;
    this.offset = (this.width - this.height) * 0.4;
    this.wave = new Wave(this.width, this.height, this.p5);
    this.island = new Island(this.height, this.height, this.p5);
    this.forest = new Forest(this.height, this.height, this.p5);
    this.lighthouse = new Lighthouse(this.height, this.height, this.p5);
    this.forground = new Forground(this.width, this.height, this.p5, this.images);
    this.wave.setBuoyInfo(this.forground.getBuoyInfo())
    p5.frameRate(8);
  }

  draw = () => {
    this.p5.background("#73a1ff");
    let hitDetected = this.wave.draw(this.p5.deltaTime, 1);
    this.p5.push();
    this.p5.translate(this.offset, 0);
    this.island.draw();
    this.forest.draw(0.01);
    this.lighthouse.draw(this.p5.deltaTime);
    this.p5.pop();
    this.forground.draw(hitDetected);
  };
}
