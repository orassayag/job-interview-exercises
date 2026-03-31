const deepClone = (aObject) => {
    if (!aObject) {
        return aObject;
    }
    let variable;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const key in aObject) {
        variable = aObject[key];
        bObject[key] = (typeof variable === 'object') ? deepClone(variable) : variable;
    }
    return bObject;
};

const foo = { a: 'bar', b: ['test'], c: 'cat' };
console.log(foo);
console.log(deepClone(foo));