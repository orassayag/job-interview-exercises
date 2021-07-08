// 1. What is reduce? Please implement the map and filter functions with reduce.
// Simple reduce.
const array = [1, 4, 5, 7];
const sum = array.reduce((acc, item) => {
    acc += item;
    return acc;
}, 0);
console.log(sum);

// Reduce.
const arrayPerson = [
    {
        id: 1,
        name: 'Gil'
    },
    {
        id: 2,
        name: 'Avi'
    },
    {
        id: 3,
        name: 'Or'
    }
];
const names = arrayPerson.reduce((acc, item) => {
    acc = [...acc, { id: item.id, fullName: `${item.name} Assayag` }];
    return acc;
}, []);
console.log(names);