// 1. Write the uniq function that removes repeated elements from the array.
const removeRepeated = (arr) => {
    return arr.reduce((acc, item) => {
        return acc.indexOf(item) > -1 ? acc : [...acc, item];
    }, []);
};

console.log(removeRepeated([1, 1, 2, 2, 3, 4, 5, 6, 6]));

// Alternative:

const shortRemoveRepeated = (arr) => {
    return Array.from(new Set([...arr]));
};

console.log(shortRemoveRepeated([1, 1, 2, 2, 3, 4, 5, 6, 6]));