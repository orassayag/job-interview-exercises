/*
LEGACY

func('hello')('world').join(':'); //should output 'hello:world'
func('hello')('world')('today').join(':'); //should output 'hello:world:today'
func('hello')('world')('today')('foo').join(':'); //should output 'hello:world:today:foo'

const func = (string) => {
    const result = [];
    return (string) => {
        if (!string) {
            return result;
        }
        result.push(string);
        return func(string);
    };
};

// 1. How does auth works?
// 2. What is the process of getting a web page? What specific data it returns?
*/

