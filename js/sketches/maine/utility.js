function limitValue(val, min, max) {
  return val < min ? min : val > max ? max : val;
}

function coinFlip(p) {
  let chance = Math.random(0, 1);
  return chance < p;
}
