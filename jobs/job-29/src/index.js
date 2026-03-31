/*
Node.js JSON Cleaning
In the JavaScript file, write a program to perform a GET request on the route https://coderbyte.com/api/challenges/json/json-cleaning
and then clean the object according to the following rules: Remove all keys that have values of N/A, -, or empty strings. If one of
these values appear in an array, remove that single item from the array. Then console log the modified object as a string.

Example Input
{"name":{"first":"Daniel","middle":"N/A","last":"Smith"},"age":45}

Example Output
{"name":{"first":"Daniel","last":"Smith"},"age":45}
 */
const https = require('https');

const isValid = (value) => {
  return value && value !== '-' && value !== 'N/A';
};

const scanObject = (obj) => {
  const newObj = Object.keys(obj).reduce((object, key) => {
    const value = obj[key];
    if (isValid(value)) {
      object[key] = value;
    }
    return object;
  }, {});
  return newObj;
};

https.get('https://coderbyte.com/api/challenges/json/json-cleaning', (resp) => {

  let data = '';

  // parse json data here...

  resp.on('data', chunk => {
    data += chunk;
  });

  resp.on('end', () => {
    const parsed = JSON.parse(data);
    const objEn = Object.entries(parsed);
    const newObj = {};
    for (const [key, value] of objEn) {
      if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
        newObj[key] = scanObject(value);
      }
      else if (Array.isArray(value)) {
        newObj[key] = value.filter(k => isValid(k));
      }
      else if (isValid(value)) {
        newObj[key] = value;
      }
    }
    console.log(JSON.stringify(newObj));
  });

  resp.on('error', error => {
    process.stdout.write(error);
  });

});