
// 1. Write a function that determine if a string is Pailandrome or not.

// Modern.
const isPalindrome = (string) => {
    string = string.toLowerCase();
    return string === string.split('').reverse().join('');
};

// Classic/Legacy.
{
    const isPalindrome = (string) => {
        const len = string.length;
        const mid = Math.floor(len / 2);
        for (let i = 0; i < mid; i++) {
            if (string[i] !== string[len - 1 - i]) {
                return false;
            }
        }
        return true;
    };
}

console.log('racecar => ' + isPalindrome('racecar'));
console.log('table => ' + isPalindrome('table'));
console.log('t => ' + isPalindrome('t'));
console.log('212121 => ' + isPalindrome('212121'));
console.log('aa12321 => ' + isPalindrome('aa12321'));
console.log('madam => ' + isPalindrome('madam'));
console.log('()()() => ' + isPalindrome('()()()'));
console.log('({[]}) => ' + isPalindrome('({[]})'));
console.log('orassayag => ' + isPalindrome('orassayag'));

// 2. Write a function that print all the Pailandromes in a string.
const getAllPailandromes = (string) => {
    const worker = ([character, ...rest], right = '') => {
        if (isPalindrome(right) && !result.includes(right)) {
            result.push(right);
        }
        if (!character) {
            return;
        }
        worker(rest, right + character);
        worker(rest, right);
    };
    const result = [];
    worker([...string]);
    return result.filter(f => f.length > 0);
};
console.log(getAllPailandromes('aa12321'));
console.log(getAllPailandromes('madamracecar12321'));

// 3. Write a function that return the min/max pailandrome (by characters length) from all Pailandromes found in a string.
// Max.
const getMaxPailandrome = (string) => {
    const list = getAllPailandromes(string).sort((a, b) => a - b);
    return list[list.length - 1];
};
console.log(getMaxPailandrome('aa12321'));
// Min.
const getMinPailandrome = (string) => {
    const list = getAllPailandromes(string).sort((a, b) => a - b);
    return list[0];
};
console.log(getMinPailandrome('aa12321'));