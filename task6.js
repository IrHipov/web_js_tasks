function partialAny(fn, ...a1) {
    return function(...a2) {
        let a2Index = 0;
        let argumentsListWithoutUndefined = a1.map((item) => {
            if (item === undefined) return a2[a2Index++];
            return item;
        });
        return fn.call(this, ...argumentsListWithoutUndefined);
    };
}
