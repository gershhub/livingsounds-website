function limitValue(val, min, max) {
  return val < min ? min : val > max ? max : val;
}

function coinFlip(p) {
  let chance = Math.random(0, 1);
  return chance < p;
}

function vertexScale(vertexList, xa, xb, ya, yb) {
  return vertexList.map((item) => [xa * item[0] + xb, ya * item[1] + yb]);
}

function bezierVertexScale(bezierVertexList, xa, xb, ya, yb) {
  return bezierVertexList.map((item) =>
    item.map((value, index) => {
      if (index % 2) {
        return ya * value + yb;
      } else {
        return xa * value + xb;
      }
    })
  );
}
