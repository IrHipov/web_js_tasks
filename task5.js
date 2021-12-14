function add(a, b) { return a + b; }

function mult(a, b, c, d) { return a * b * c * d; }

function partial(fn, ...a1) {
    return function(...a2) {
        return fn.call(this, ...a1, ...a2);
    }
}
