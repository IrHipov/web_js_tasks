function typeCheck(v) {
    if (v === undefined) return 'undefined';
    if (v === null) return 'null';
    if (v === true || v === false) return 'boolean';
    if (String(v)) return 'String';
    if (Array.isArray(v)) return 'array';
    if (v.length) return 'array-like';
    return "I don't know this type";
}
