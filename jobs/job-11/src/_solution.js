/* // 1. Without any debugging or running first, just look at the code and think, what would be printed, and explain why.
var x = 1;
function some() {
    // eslint-disable-next-line no-func-assign
    x = 13;
    // eslint-disable-next-line no-shadow
    function x() { }
    console.log(x);
}
some();
console.log(x);

// The output will be:
// 13
// 1
// Here is why: Inside of some, there is the declaration of x. In running time, x = 13, even after x = 1, because it
// will look for the local scope. Only after the function is run, it will be 1, because of the assignment of x = 1
// that has been changed in some function, and effect the global scope.

// 2. What will be printed first, the console lines or the async operation? explain why.
const asyncOperation = () => { return new Promise((resolve, reject) => { setTimeout(() => { console.log('Timeout execute'); resolve(); }, 2000); }); };
(asyncOperation()).then(res => { console.log(`Some data: ${res}`); });
console.log(1);
console.log(2);
console.log(3);
console.log(4);
 */
// The console lines will be printed first, and then the async operation. The async operation will
// keep a reference and continue to work. In the minetime, the console will print his console logs,
// Because of its synchronized actions in the memory. After 2 seconds, the asynchronous operation
// will be executed and return the results.

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
        this.ready = Promise.all([URL1, URL2, URL3].map((url) => { return this.myAsyncCall(url); }));
    }

    myAsyncCall(item) {
        return new Promise((resolve, reject) => {
            notifyUrls(item, (res) => { resolve(res); });
        });
    }

    async myFunction1() {
        if (await this.ready) {
            // Only start working when constructor finished notifying.
            // ...
            console.log('myFunction1');
        }
    }

    myFunction2() {
        // Only start working when constructor finished notifying.
        // ...
        console.log('myFunction2');
    }
}

(async () => {
    const myClass = new MyClass();
    await myClass.myFunction1();
})();