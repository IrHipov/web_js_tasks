function deepClone(object) {
  let clone = {};

  for (let key in object) {
    if (object[key] instanceof Object)
      clone[key] = deepClone(object[key]);
    else
      clone[key] = object[key];
  }
  return clone;
}
