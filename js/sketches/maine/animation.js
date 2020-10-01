class MaineAnimation {
  constructor(width, height, audioStream, p5) {
    this.width = width;
    this.height = height;
    this.p5 = p5;
    let offset = (this.width - this.height) * 0.2;

    this.wave = new Wave(this.width, this.height, this.p5);
    this.island = new Island(this.height, this.height, this.p5);
    this.forest = new Forest(this.height, this.height, this.p5);
    this.lighthouse = new Lighthouse(this.height, this.height, this.p5);
    this.rocks = new Rocks(this.height, this.height, this.p5);
    p5.frameRate(8);
  }

  draw = () => {
    this.p5.background("#73a1ff");
    this.wave.draw(this.p5.deltaTime, 1);
    this.p5.push();
    this.p5.translate(this.offset, 0);
    this.island.draw();
    this.forest.draw(0.01);
    this.lighthouse.draw(this.p5.deltaTime);
    this.rocks.draw();
    this.p5.pop();
  };
}

