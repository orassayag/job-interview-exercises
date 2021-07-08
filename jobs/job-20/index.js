// Implement JSON.stringify without using it or toString.

function myStringify(obj) {
    const keys = Object.keys(obj);
    return keys.map(k => {
        const val = obj[k];
        if (typeof (val) === 'object') {
            return myStringify(val);
        }
        const valToDisplay = typeof (val) === "string" ? `"${val}"` : val;
        return `"${k}": ${valToDisplay}`;
    });
}


const dummyObj = {
    text: "Or",
    number: 23,
    child: {
        innerText: "Or2",
    },
    arr: [1, "str"],
    nnn: null
};

console.log(JSON.stringify(dummyObj));
console.log(myStringify(dummyObj));

//==============

function objToString(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}

  //==============

/*   JavaScript environment ready. Hit run to try out some code!

  Everyone can modify this shell in real time.
  It's a sandbox that works exactly like a native shell.

  >

  guy.nimni ran 7 lines of JavaScript (finished in 885ms):

  {}
  >

  Or Assayag ran 20 lines of JavaScript (finished in 702ms):

  solution.js:7
      return `{k}: `{values[k]}`;
                    ^

  SyntaxError: Unexpected token '{'
  >

  Or Assayag ran 20 lines of JavaScript (finished in 866ms):

  solution.js:7
      return `{k}: `{values[k]}`;
                    ^

  SyntaxError: Unexpected token '{'
  >

  Or Assayag ran 20 lines of JavaScript (finished in 779ms):

  solution.js:7
      return `${k}: `${values[k]}`;
                     ^

  SyntaxError: Unexpected identifier
  >

  Or Assayag ran 20 lines of JavaScript (finished in 613ms):

  solution.js:7
      return `{k}: `{values[k]}`;
                    ^

  SyntaxError: Unexpected token '{'
  >

  Or Assayag ran 20 lines of JavaScript (finished in 708ms):

  {"text":"Or","number":23}
  {}
  >

  Or Assayag ran 18 lines of JavaScript (finished in 751ms):

  {"text":"Or","number":23}
  [ 'text: undefined', 'number: undefined' ]
  >

  Or Assayag ran 18 lines of JavaScript (finished in 740ms):

  {"text":"Or","number":23}
  [ 'undefined: undefined', 'undefined: undefined' ]
  >

  Or Assayag ran 18 lines of JavaScript (finished in 796ms):

  {"text":"Or","number":23}
  [ 'text: undefined', 'number: undefined' ]
  >

  Or Assayag ran 18 lines of JavaScript (finished in 681ms):

  {"text":"Or","number":23}
  [ 'text: Or', 'number: 23' ]
  >

  Or Assayag ran 17 lines of JavaScript (finished in 749ms):

  {"text":"Or","number":23}
  [ 'text: Or', 'number: 23' ]
  >

  guy.nimni ran 20 lines of JavaScript (finished in 764ms):

  {"text":"Or","number":23,"child":{"innerText":"Or2"}}
  [ 'text: Or', 'number: 23', 'child: [object Object]' ]
  >

  Or Assayag ran 24 lines of JavaScript (finished in 890ms):

  {"text":"Or","number":23,"child":{"innerText":"Or2"}}
  solution.js:6
      if (typeOf(obj[k]) === object)
      ^

  ReferenceError: typeOf is not defined
      at solution.js:6:5
      at Array.map (<anonymous>)
      at myStringify (solution.js:5:15)
      at solution.js:24:13
      at Script.runInContext (vm.js:143:18)
      at Script.runInNewContext (vm.js:148:17)
      at Object.runInNewContext (vm.js:303:38)
      at /home/coderpad/repl.js:33:10
      at processTicksAndRejections (internal/process/task_queues.js:75:11)
  >

  Or Assayag ran 24 lines of JavaScript (finished in 703ms):

  {"text":"Or","number":23,"child":{"innerText":"Or2"}}
  solution.js:6
      if (typeof(obj[k]) === object)
                             ^

  ReferenceError: object is not defined
      at solution.js:6:28
      at Array.map (<anonymous>)
      at myStringify (solution.js:5:15)
      at solution.js:24:13
      at Script.runInContext (vm.js:143:18)
      at Script.runInNewContext (vm.js:148:17)
      at Object.runInNewContext (vm.js:303:38)
      at /home/coderpad/repl.js:33:10
      at processTicksAndRejections (internal/process/task_queues.js:75:11)
  >

  Or Assayag ran 24 lines of JavaScript (finished in 704ms):

  {"text":"Or","number":23,"child":{"innerText":"Or2"}}
  [ 'text: Or', 'number: 23', [ 'innerText: Or2' ] ]
  >

  Or Assayag ran 24 lines of JavaScript (finished in 771ms):

  solution.js:7
      if (typeof() === 'object') {
                 ^

  SyntaxError: Unexpected token ')'
  >

  Or Assayag ran 24 lines of JavaScript (finished in 918ms):

  solution.js:10
      return `"${k}": ${isNaN(val) ? `"${val}"` : ${val}}`;
                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^

  SyntaxError: Missing } in template expression
  >

  Or Assayag ran 24 lines of JavaScript (finished in 797ms):

  solution.js:10
      return `"${k}": ${typeof(val) === string ? `"${val}"` : ${val}}`;
                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  SyntaxError: Missing } in template expression
  >

  Or Assayag ran 24 lines of JavaScript (finished in 651ms):

  solution.js:10
      return `"${k}": ${typeof(val) === string ? `"${val}"` : ${val}`;
                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  SyntaxError: Missing } in template expression
  >

  guy.nimni ran 24 lines of JavaScript (finished in 796ms):

  solution.js:10
      return `"${k}": ${typeof(val) === string ? `"${val}"` : ${val}}`;
                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  SyntaxError: Missing } in template expression
  >

  guy.nimni ran 25 lines of JavaScript (finished in 719ms):

  {"text":"Or","number":23,"child":{"innerText":"Or2"}}
  [ '"text": "Or"', '"number": 23', [ '"innerText": "Or2"' ] ]
  >

  guy.nimni ran 25 lines of JavaScript (finished in 686ms):

  {"text":"Or","number":23,"child":{"innerText":"Or2"}}
  [ '"text": "Or"', '"number": 23', '{"innerText": "Or2"}' ]
  >

  guy.nimni ran 27 lines of JavaScript (finished in 685ms):

  {"text":"Or","number":23,"child":{"innerText":"Or2"},"arr":[1,"str"],"nnn":null}
  solution.js:4
    const keys = Object.keys(obj);
                        ^

  TypeError: Cannot convert undefined or null to object
      at Function.keys (<anonymous>)
      at myStringify (solution.js:4:23)
      at solution.js:8:14
      at Array.map (<anonymous>)
      at myStringify (solution.js:5:15)
      at solution.js:27:13
      at Script.runInContext (vm.js:143:18)
      at Script.runInNewContext (vm.js:148:17)
      at Object.runInNewContext (vm.js:303:38)
      at /home/coderpad/repl.js:33:10
  >
  (To exit, press Ctrl+C again or Ctrl+D or type .exit)
  >   */