function sequence(start = 0, step = 1) {
  let acc = start;
  return function () {
    const value = acc;
    acc += step;
    return value;
  }
}

function square(x) {
  return x * x;
}

const generator = sequence();

function fmap(fn, gen) {
  let acc = gen();
  return function () {
    const value = acc;
    acc = gen();
    return fn(value);
  }
}

const fmapGenerator = fmap(square, sequence);
