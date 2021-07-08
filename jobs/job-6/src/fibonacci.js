// 1. A Fibonacci sequence is an ordering of numbers where each number is the sum of the
// preceding two. For example, the first ten numbers of the Fibonacci
// sequence are: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.
// write a function that returns the nth entry in the Fibonacci sequence,
// where n is a number you pass in as argument to the function.

// Modern.
const fibonacci = (number) => {
    // If num is either 0 or 1 return num.
    if (number < 2) {
        return number;
    }
    // Recursion here.
    return fibonacci(number - 1) + fibonacci(number - 2);
};

// Classic/Legacy.
{
    const fibonacci = (number) => {
        // Store the Fibonacci sequence you're going
        // to generate inside an array and
        // initialize the array with the first two
        // numbers of the sequence.
        const result = [0, 1]
        for (let i = 2; i <= number; i++) {
            // Push the sum of the two numbers
            // preceding the position of i in the result array
            // at the end of the result array.
            const prevNum1 = result[i - 1]
            const prevNum2 = result[i - 2]
            result.push(prevNum1 + prevNum2);
        }
        // Return the last value in the result array.
        return result[number];
    };
}

console.log(fibonacci(3));
console.log(fibonacci(5));
console.log(fibonacci(10));
console.log(fibonacci(13));