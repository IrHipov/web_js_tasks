function sequence(start = 0, step = 1) {
    let acc = start;
    return function () {
        const value = acc;
        acc += step;
        return value;
    }
}
