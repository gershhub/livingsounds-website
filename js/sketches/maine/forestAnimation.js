class Forest {
  constructor(width, height, p5) {
    // constants
    this.width = width;
    this.height = height;
    this.p5 = p5;

    // variables
    // trees
    this.trees = [];
    for (let i = 0; i < N_TREES; i++) {
      let hRandom = this.p5.random(0.8, 1) * 0.1 * this.height;
      let wRandom = this.p5.random(0.2, 1) * 10;
      let nRandom = this.p5.random(0.3, 1) * 0.02 * this.height;
      let pos = TREE_POS[i];
      pos[0] =
        ((pos[0] + POS_OFFSET[0]) / 1000 + this.p5.random(-0.01, 0.01)) *
        this.width;
      pos[1] =
        ((pos[1] + POS_OFFSET[1]) / 1000 + this.p5.random(-0.01, 0.01)) *
        this.height;
      let tree = new Tree(this.p5, i, hRandom, wRandom, pos, nRandom);
      this.trees.push(tree);
    }

    // generate birds
    this.birds = [];
    for (let i = 0; i < N_BIRDS; i++) {
      this.birds.push(new Bird(this.p5, i, this.trees));
    }

    // generate bugs
    this.bugs = [];
    for (let i = 0; i < N_BUGS; i++) {
      this.bugs.push(new Bug(this.p5, i, this.trees));
    }
  }

  draw(controlTree, controlBird, controlBug) {
    for (let id = 0; id < N_TREES; id++) {
      this.trees[id].draw(controlTree);
    }
    // draw birds
    for (let id = 0; id < N_BIRDS; id++) {
      this.birds[id].fly(controlBird);
    }
    //draw bugs
    for (let id = 0; id < N_BUGS; id++) {
      this.bugs[id].fly(controlBug);
    }
  }
}
