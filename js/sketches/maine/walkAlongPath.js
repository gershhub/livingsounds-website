class walkablePath {
  constructor(p5, vertexPoint, bezierVertexPoints, speed = 0.1) {
    this.p5 = p5;
    this.vertexPoint = vertexPoint;
    this.bezierVertexPoints = bezierVertexPoints;
    this.speed = speed;
    this.d = 0;
  }
  walkOneStep() {
    this.d += this.speed;
    let p0 = this.vertexPoint;
    let c = this.bezierVertexPoints[0];
    let x = this.p5.bezierPoint(p0[0], c[0], c[2], c[4], this.d);
    let y = this.p5.bezierPoint(p0[1], c[1], c[3], c[5], this.d);
  }
}
