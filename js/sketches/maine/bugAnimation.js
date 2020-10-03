
class Bug {
  constructor(p5, id, trees) {
    // constants
    this.id = id;
    this.p5 = p5;
    this.om = 6.28 / FOREST_DATA.steps;
    this.h = 1;
    this.speed = 1;

    // variables
    this.tree = trees[Math.floor(this.p5.random(0, N_TREES))];
    this.side = 1;
    this.fly_step = 0;
    this.x = this.tree.stemBottomP[0] + this.tree.w * 0.5;
    this.y = this.tree.stemTopP[1] + this.tree.nBranches * 3;
	this.d = 0;
  }

  fly(p) {
    let c = this.p5.color(BUG_COLOR);
    this.p5.stroke(c);
    this.p5.fill(c);
    if (this.fly_step != 0) {
      // flying path
      let curve = this.side * FOREST_DATA.sinsq[this.fly_step] * 2;
      let y = Math.floor(this.y + curve * this.p5.random(this.d - 2, this.d));
      let x = Math.floor(this.x - Math.sin(this.fly_step * this.om) * this.d);
      let h = this.h;
      // draw bug flying
      if (this.fly_step % 2) {
        this.p5.triangle(x, y, x + h, y - h, x - h, y - h);
      } else {
        this.p5.triangle(x, y - h, x + h, y, x - h, y);
      }
      // draw a halo
      let c = this.p5.color(...BUG_COLOR_GLOW, this.p5.random(0, 70));
      this.p5.stroke(c);
      this.p5.fill(c);
      this.p5.circle(x, y, h * 5);
      // next step
      this.fly_step = this.fly_step + this.speed;
      if (this.fly_step >= FOREST_DATA.steps) this.fly_step = 0;
    } else if (coinFlip(p)) {
      this.fly_step = 1;
      this.side = -this.side;
      this.d = this.p5.random(0.5, 1) * this.tree.h * 0.25;
    } else {
      let x = this.x;
      let y = this.y;
      let h = this.h;
      this.p5.triangle(x, y - h, x + h * 0.5, y, x - h * 0.5, y);
    }
  }
}
