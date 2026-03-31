/* //set(key, value)
//get(key)
//setAll(value)

class Data {

    constructor() {
        this.setAllValue = null;
        this.map = {};
    }

    set(key, value) {
        if (this.setAllValue) {
            this.map[key] = this.setAllValue;
            this.setAllValue = null;
        }
        else {
            this.map[key] = value;
        }
    }

    get(key) {
        if (this.setAllValue) {
            return this.setAllValue;
        }
        return this.map[key];
    }

    setAll(value) {
        this.setAllValue = value;
    }
}

const data = new Data();
data.set('1', 1);
data.set('2', 2);
console.log(data.get('1'));
data.setAll(3);
data.set('2', 2);
console.log(data.get('1')); */

//=====================================











/* // Implementation
const piper = (data) => {
    return {
        pipe: (func) => {
            func(data);
            return piper(data);
        },
        result: () => {
            return data;
        }
    };
}

// Usage
const output =
    piper({})
        .pipe(function (data) {
            data.name = 'John'
            return data
        })
        .pipe(function (data) {
            data.lastName = 'Doe'
            return data
        })
        .result()

console.log(output) // => { "name": "John", "lastName": "Doe" }
 */





//====================================================


/* const str = "eecfdazz";
const alphabet = ["e", "c", "f", "d", "a", "z"]
const isSorted = (str, alphabet) => {
    const map = alphabet.reduce((acc, item, i) => {
        acc[item] = i;
        return acc;
    }, {});

    const arr = str.split('');
    let prevCharIndexValue = 0;
    let isSortted = true;
    for (let i = 0; i < arr.length; i++) {
        const char = arr[i];
        const charIndexValue = map[char];
        if (prevCharIndexValue > charIndexValue) {
            isSortted = false;
            break;
        }
        prevCharIndexValue = charIndexValue;
    }
    return isSortted;
}

console.log(isSorted(str, alphabet)); */