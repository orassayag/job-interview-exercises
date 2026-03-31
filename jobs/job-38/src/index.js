const isPalindrom = (string) => {
    // return string === string.split('').reverse().join('');
};

// Or
const reverse = (string) => {


    const newString = [];
    for (let i = string.length - 1; i >= 0; i--) {
        newString.push(string[i]); // r
    }
    return newString.join('');
};