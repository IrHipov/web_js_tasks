function pluck(objects, fieldName) {
    let objectValues = [];
    for (let object of objects) {
        objectValues.push(object[fieldName]);
    }
    return objectValues;
}
