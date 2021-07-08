// 1. Without any debugging or running first, just look at the code and think, what would be printed, and explain why.
var x = 13;
function some() {
    // eslint-disable-next-line no-func-assign
    x = 1;
    // eslint-disable-next-line no-shadow
    function x() { }
    console.log(x);
}
some();
console.log(x);

// 2. What will be printed first, the console lines or the async operation? explain why.
const asyncOperation = () => { return new Promise((resolve, reject) => { setTimeout(() => { resolve(); }, 2000); }); };
(asyncOperation()).then(res => { console.log(res); });
console.log(1);
console.log(2);
console.log(3);
console.log(4);

// 3. Coding challenge.
// The goal is to make function1/function2 to work only when the constructor has finished its async operations.
// You CAN'T change the notifyUrls function. Imagine it's a 3th party library you don't have control on.

// CAN'T CHANGE THIS.
//===================
function notifyUrls(item, callback) {
    asyncOperation(item).then((res) => {
        callback(res);
    });
}
//===================

const URL1 = 'http://www.somerestapi/get1';
const URL2 = 'http://www.somerestapi/get2';
const URL3 = 'http://www.somerestapi/get3';

class MyClass {

    constructor() {
        [URL1, URL2, URL3].forEach(item => {
            notifyUrls(item, () => { });
        });
    }

    myFunction1() {
        // Only start working when constructor finished notifying.
        // ...
        console.log('myFunction1');
    }

    myFunction2() {
        // Only start working when constructor finished notifying.
        // ...
        console.log('myFunction2');
    }
}