// 1. Write a function that sort 2 arrays.

const mergeArrays = (array1, array2) => {
    return [...array1, ...array2].sort((a, b) => a - b);
};

const arr1 = [3, 5, 6, 10, 11, 20];
const arr2 = [1, 2, 7, 8, 15, 19];
console.log(mergeArrays(arr1, arr2));