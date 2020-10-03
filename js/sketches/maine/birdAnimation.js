class Bird {
  constructor(p5, id, trees) {
    // constants
    this.id = id;
    this.p5 = p5;
    this.trees = trees;
    this.birdColor = this.p5.color(BIRD_COLOR);
    this.speed = 1;
    this.h = 3;
    // variables
    this.tree = trees[Math.floor(this.p5.random(0, N_TREES))];
    this.branch = Math.floor(this.p5.random(0, this.tree.nBranches));
    this.side = 1;
    this.x = this.tree.stemBottomP[0] + this.tree.w * 0.5;
    this.y = this.tree.stemTopP[1] + this.branch * 3;
    this.nextTree = null;
    this.dx = 0;
    this.dy = 0;
    this.next_x = 0;
    this.next_y = 0;
    this.fly_step = 0;
  }

  fly(p) {
    this.p5.stroke(this.birdColor);
    this.p5.fill(this.birdColor);
    if (this.fly_step != 0) {
      let h = this.h;
      let curve = FOREST_DATA.sinsq[this.fly_step] * h * 10;
      let x = this.dx * this.fly_step + this.x + curve;
      let y = this.dy * this.fly_step + this.y + curve;

      if (this.fly_step % 2) {
        this.p5.triangle(x, y, x + h, y - h, x - h, y - h);
      } else {
        this.p5.triangle(x, y - h, x + h, y, x - h, y);
      }
      // next step
      this.fly_step = this.fly_step + this.speed;
      if (this.fly_step >= FOREST_DATA.steps) {
        this.x = this.next_x;
        this.y = this.next_y;
        this.tree = this.next_tree;
        this.fly_step = 0;
      }
    } else if (coinFlip(p)) {
      this.fly_step = 1;
      // find random next tree
      let next_id = this.tree.id;
      while (next_id == this.tree.id || next_id < 0 || next_id >= N_TREES) {
        next_id = Math.floor(this.p5.random(-5, 5)+this.tree.id);
      }
      this.next_tree = this.trees[next_id];
      this.next_x = this.next_tree.stemBottomP[0] + this.next_tree.w * 0.5;
      this.next_y = this.next_tree.stemTopP[1] + this.branch * 3;
      this.dy = (this.next_y - this.y) / FOREST_DATA.steps;
      this.dx = (this.next_x - this.x) / FOREST_DATA.steps;
    } else {
      let curve = FOREST_DATA.bazier20[this.tree.horzStep];
      let x = this.x + this.tree.horzDirect * curve[this.branch] * this.tree.w;
      let y = this.y;
      let h = this.h;
      this.p5.triangle(x, y - h, x + h * 0.5, y, x - h * 0.5, y);
    }
  }
}
