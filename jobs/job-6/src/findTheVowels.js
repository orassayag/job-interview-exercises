// 1. write a function that takes a string as argument and returns the number of vowels contained in that string.
// Return both the number of total vowels, and array of indexes.
// The vowels are 'a', 'e', 'i', 'o', 'u'.

const findAllVowels = (string) => {
    const characters = string.split('');
    const result = [];
    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        if (char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u') {
            result.push(i);
        }
    }
    return `${string} => ${result.length} (${result})`;
};

console.log(findAllVowels('hello'));