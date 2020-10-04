class WalkablePath {
  constructor(p5, vertexPoint, bezierVertexPoints, seed = 0, speed = 0.001) {
    // constants
    this.p5 = p5;
    this.vertexPoint = vertexPoint;
    this.bezierVertexPoints = bezierVertexPoints;
    this.nSections = this.bezierVertexPoints.length;
    this.speed = speed;
    // variables
    this.d = seed;
    this.sectionCounter = 5;
    this.setSection();
  }

  setSection() {
    if (this.sectionCounter == 0) {
      this.p0 = this.vertexPoint;
    } else {
      this.c = this.bezierVertexPoints[this.sectionCounter - 1];
      this.p0 = [this.c[4], this.c[5]];
    }
    this.c = this.bezierVertexPoints[this.sectionCounter];
  }

  walkOneStep() {
    /*
    // draw walkable path
    this.p5.noFill();
    this.p5.stroke(this.p5.color("red"));
    this.p5.beginShape();
    this.p5.vertex(...this.vertexPoint);
    this.bezierVertexPoints.forEach((item) => this.p5.bezierVertex(...item));
    this.p5.endShape();
    */

    this.d += this.speed;
    if (this.d >= 1) {
      // reset steps
      this.d = 0;
      this.sectionCounter += 1;
      this.sectionCounter = this.sectionCounter % this.nSections;
      this.setSection();
    }
    let x = this.p5.bezierPoint(
      this.p0[0],
      this.c[0],
      this.c[2],
      this.c[4],
      this.d
    );
    let y = this.p5.bezierPoint(
      this.p0[1],
      this.c[1],
      this.c[3],
      this.c[5],
      this.d
    );
    return [x, y];
  }
}
