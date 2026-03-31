// 1. For each hobby, count the number of users occupied with it.

const users = [
    { name: 'John', hobbies: ['singing', 'walking', 'playing guitar'] },
    { name: 'Terry', hobbies: ['swimming', 'playing guitar'] },
    { name: 'Anna', hobbies: ['walking', 'swimming', 'playing guitar'] },
    { name: 'Paul', hobbies: ['swimming', 'singing'] }
];

const hobbiesCounter = (usersList) => {
    return Array.from(new Set(...usersList.map(h => h.hobbies))).reduce((acc, item) => {
        return [...acc, { hobby: item, count: usersList.filter(c => c.hobbies.indexOf(item) > -1).length }];
    }, []);
};

console.log(hobbiesCounter(users));