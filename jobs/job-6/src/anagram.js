// 1. Write a function that checks if strings provided are anagrams of each other;
// letter casing shouldn’t matter. Also, consider only characters, not spaces or punctuation.

// Modern.
const findAnagrams = (strings) => {
    const results = [];
    for (let i = 0; i < strings.length; i++) {
        const string = strings[i].toLowerCase();
        const stringCharacters = string.split('').sort().join('');
        for (let y = 0; y < strings.length; y++) {
            if (i === y) {
                continue;
            }
            const other = strings[y].toLowerCase();
            const otherString = other.split('').sort().join('');
            if (stringCharacters === otherString) {
                results.push(`${string} - ${other}: (${i}, ${y})`);
            }
        }
    }
    return results;
};
console.log(findAnagrams(['monk', 'konm', 'bbc', 'cbb', 'dell', 'ledl']).join('\r\n'));
console.log(findAnagrams(['finder', 'Friend']).join('\r\n'));
console.log(findAnagrams(['hello', 'bye']).join('\r\n'));