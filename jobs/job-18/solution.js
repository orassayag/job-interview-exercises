/*
1. Implement a function that calculate sum.
2. Implement a memorize function. It will execute a function for the first time, keep the function for the next time.
The next time it will fetch it from memory.
3. Implement debounce logic:

const fn = debounce(() => { console.log("12345"); }, 1000);

fn();
fn();
fn();

function debounce(fn, timeout) {

}

4. Prepare for socket.io chat.

*/

// 1. Implement a function that calculate sum.

const calc = (args) => {
    return args.reduce((acc, item) => {
        acc += item;
        return acc;
    }, 0);
};

console.log(calc([3, 4]));
console.log(calc([10, 22]));

// 2. Implement a memorize function. It will execute a function for the first time, keep the function for the next time.
// The next time it will fetch it from memory.

// a simple pure function to get a value adding 10
const add = (n) => (n + 10);
console.log('Simple call', add(3));

// a simple memoize function that takes in a function
// and returns a memoized function
const memoize = (fn) => {
    let cache = {};
    return (...args) => {
        let n = args[0];
        if (n in cache) {
            console.log('Fetching from cache');
            return cache[n];
        }
        else {
            console.log('Calculating result');
            let result = fn(n);
            cache[n] = result;
            return result;
        }
    }
}

// creating a memoized function for the 'add' pure function
const memoizedAdd = memoize(add);
console.log(memoizedAdd(3));
console.log(memoizedAdd(3));
console.log(memoizedAdd(4));
console.log(memoizedAdd(4));

// 3. Implement debounce logic:

const fn = debounce(() => { console.log("12345"); }, 1000);

fn();
fn();
fn();

function debounce(fn, timeout) {
    let timer = null;
    return () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
            timer = null;
        }, timeout);
    }
}

// 4. Prepare for socket.io chat.
// https://blog.crowdbotics.com/build-chat-app-with-nodejs-socket-io/

