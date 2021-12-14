function bind(fn, context) {
  return function (...arg) {
    return fn.apply(context, arg);
  };
}
