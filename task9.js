function isEven(x) {
    return x % 2 === 0;
}


function filter(input, isEven) {
    let result = [];
    input.forEach(elem => {
        if (isEven(elem)) result.push(elem);
    });
    return result;
}
