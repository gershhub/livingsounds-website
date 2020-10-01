class Tree {
  constructor(p5, id, treeHeight, treeWidth, stemBottomP, nBranches) {
    // constants
    this.p5 = p5;
    this.id = id;
    this.h = treeHeight;
    this.w = treeWidth;
    this.stemBottomP = stemBottomP;
    this.nBranches = nBranches;

    this.branchColor = this.p5.color("#157a6e");
    if (coinFlip(0.5)){
      this.branchColor = this.p5.color("#e9c46a")
    } else if (coinFlip(0.5)){
      this.branchColor = this.p5.color("#f4a261")
    }
    this.stemColor = this.p5.color("#bda2a2");

    //variables
    this.stemTopP = [stemBottomP[0], stemBottomP[1] - treeHeight];
    this.branchCenterPs = [];
    for (let i = 0; i < nBranches; i++) {
      let branch = [this.stemBottomP[0], this.stemTopP[1] + i * 3, i];
      this.branchCenterPs.push(branch);
    }
    this.horzSpeed = 1;
    this.horzStartFrame = 0;
    this.horzStep = 0;
    this.horzDirect = 1;
    this.vertSpeed = 1;
    this.vertMoveRange = 0.05;
  }

  draw(controlFactor) {
    // vertical movement
    let vertStep =
      Math.floor(this.p5.frameCount * this.vertSpeed) % FOREST_DATA.steps;
    let vertOffset = FOREST_DATA.sinsq[vertStep] * this.vertMoveRange;

    // horizontal movement
    let horzMoveProb = controlFactor;
    if (this.horzStep != 0) {
      this.horzStep =
        Math.floor(
          (this.p5.frameCount - this.horzStartFrame) * this.horzSpeed
        ) % FOREST_DATA.steps;
    } else if (coinFlip(horzMoveProb)) {
      this.horzStep = 1;
      this.horzDirect = -this.horzDirect;
      this.horzStartFrame = this.p5.frameCount;
    }
    // bazier coordinates for tree branch positioning
    let bazierCoords = FOREST_DATA.bazier20[this.horzStep];

    // draw branches
    this.p5.stroke(this.branchColor);
    this.p5.noFill();
    this.branchCenterPs.forEach((item) => {
      // calculate branch center point
      let x_c = item[0];
      let y_c = item[1];
      x_c += this.horzDirect * bazierCoords[item[2]] * this.w;
      // calculate branch outter points
      let y_o = y_c + 3 + this.h * vertOffset;
      let x_o_l = x_c + this.w;
      let x_o_r = x_c - this.w;
      // draw branch
      this.p5.line(x_c, y_c, x_o_l, y_o);
      this.p5.line(x_c, y_c, x_o_r, y_o);
    });

    // draw stem
    this.p5.stroke(this.stemColor);
    this.p5.bezier(
      ...this.stemBottomP,
      ...this.stemBottomP,
      ...this.stemTopP,
      Math.floor(this.stemTopP[0] + this.horzDirect * bazierCoords[0] * this.w),
      this.stemTopP[1]
    );
  }
}
