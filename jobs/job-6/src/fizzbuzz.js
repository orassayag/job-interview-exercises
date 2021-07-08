// 1. Write a function that do the following:
// Console logs the numbers from 1 to n, where n is the integer the function takes as its parameter.
// Logs 'fizz' instead of the number for multiples of 3.
// Logs 'buzz' instead of the number for multiples of 5.
// Logs 'fizzbuzz' for numbers that are multiples of both 3 and 5.

// Modern.
const fizzBuzz = (num) => {
    const result = [];
    for (let i = 1; i <= num; i++) {
        // Check if the number is a multiple of 3 and 5.
        if (i % 3 === 0 && i % 5 === 0) {
            result.push('fizzbuzz');
        } // Check if the number is a multiple of 3.
        else if (i % 3 === 0) {
            result.push('fizz');
        } // Check if the number is a multiple of 5.
        else if (i % 5 === 0) {
            result.push('buzz');
        } else {
            result.push(i);
        }
    }
    return result.join('\n\r');
};
console.log(fizzBuzz(30));