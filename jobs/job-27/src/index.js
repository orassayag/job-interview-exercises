/* Changing Sequence
Have the function ChangingSequence(arr) take the array of numbers stored in arr and return the index at which the numbers
stop increasing and begin decreasing or stop decreasing and begin increasing. For example: if arr is [1, 2, 4, 6, 4, 3, 1]
then your program should return 3 because 6 is the last point in the array where the numbers were increasing and the next
number begins a decreasing sequence. The array will contain at least 3 numbers and it may contains only a single sequence,
increasing or decreasing. If there is only a single sequence in the array, then your program should return -1.
Indexing should begin with 0.

Examples
Input: [-4, -2, 9, 10]
Output: -1
Input: [5, 4, 3, 2, 10, 11]
Output: 3 */

const changingSequence = (a) => {
  if ((a[0] <= a[1] && a[a.length - 2] <= a[a.length - 1]) || (a[0] >= a[1] && a[a.length - 2] >= a[a.length - 1])) {
      return -1;
  }
  let index = 0;
  let minOrMaxNumber = a[0];
  const isStartIncreasing = a[0] <= a[1] && a[a.length - 2] >= a[a.length - 1];
  for (let i = 1; i < a.length; i++) {
    if (isStartIncreasing) {
      if (a[i] > minOrMaxNumber) {
        minOrMaxNumber = a[i];
        index = i + 1;
      }
      else {
        break;
      }
    }
    else {
      if (a[i] < minOrMaxNumber) {
        minOrMaxNumber = a[i];
        index = i;
      }
      else {
        break;
      }
    }
  }
  return index;
};
const numbers = [1, 2, 4, 6, 11, 15, 19, 20, 21, 31, 41, 51, 55, 46, 35, 24, 18, 14, 13, 12, 11, 4, 2, 1];
//const numbers = [1, 2, 4, 55, 46, 35, 24, 4, 2, 1];
//const numbers = [5, 4, 3, 2, 10, 11];
//const numbers = [-4, -2, 9, 10];
console.log(changingSequence(numbers));