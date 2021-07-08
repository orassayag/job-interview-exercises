// 1. Flatten is a function that puts elements from the inner arrays into the top array. Write a function that flat numbers from arrays.
// deepFlatten([1, [2], [[3], [4, [5]]]]); // => [1, 2, 3, 4, 5]

const deepFlatten = (array) => {
    return array.reduce((acc, el) => Array.isArray(el) ? [...acc, ...deepFlatten(el)] : [...acc, el], []);
};

console.log(deepFlatten([1, [2], [[3], [4, [5]]]]));