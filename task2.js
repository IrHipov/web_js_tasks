function sequence(start = 0, step = 1) {
    let acc = start;
    return function () {
        const value = acc;
        acc += step;
        return value;
    }
}

function take(gen, x) {
    let result = [];
    for (let i = 0; i < x; i++) result.push(gen());
    return result;
}
