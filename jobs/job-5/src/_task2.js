const MyQueue = require('./queue');
const MyStack = require('./stack2');
const { MyLinkedList } = require('./linkedlist');
const MyBinarySearchTree = require('./tree');

/*
1. Array: Remove all even integers from an array.
2. Stack: Check for balanced parentheses using a stack
3. Queue: Generate Binary Numbers from 1 to n
4. Linked List: Reverse a linked list
5. Tree: Find the Minimum Value in a Binary Search Tree
*/



// 1.
//[3,2,41,3,34]
//[1,2,4,5,10,6,3] => [1,5,3]
const removeEven = (arr) => {
  return arr.filter((v => (v % 2) != 0));
};

// 2.
// {[({})]} => true
// {[()]} => true
// {[([({))]}} => false
const isBalanced = (exp) => {
  const myStack = new MyStack();
  // Iterate through the string exp
  for (let i = 0; i < exp.length; i++) {
    debugger;
    const curr = exp[i];
    // For every closing parenthesis check for its opening parenthesis in stack
    if (curr === '}' || curr === ')' || curr === ']') {
      if (myStack.isEmpty()) {
        return false;
      }
      let output = myStack.pop();
      // If you can't find the opening parentheses for any closing one then returns false.
      if (((curr === '}') && (output !== '{')) || ((curr === ')') && (output !== '(')) || ((curr === ']') && (output !== '['))) {
        return false;
      }
    } else {
      // For each opening parentheses, push it into stack
      myStack.push(curr);
    }
  }
  // After complete traversal of string exp, if there's any opening parentheses left
  // in stack then also return false.
  if (myStack.isEmpty() == false) {
    return false;
  }
  // At the end return true if you haven't encountered any of the above false conditions.
  return true;
};

// 3.
// 3 => ['1','10','11']
const findBin = (n) => {
  let result = [];
  let myQueue = new MyQueue();
  let s1, s2;
  myQueue.enqueue('1');
  for (let i = 0; i < n; i++) {
    result.push(myQueue.dequeue());
    s1 = result[i] + '0';
    s2 = result[i] + '1';
    myQueue.enqueue(s1);
    myQueue.enqueue(s2);
  }
  return result;
};

/*
1 => 1;
2 => 1, 10
3 => 1, 10, 11
4 => 1, 10, 11, 100
5 => 1, 10, 11, 100, 101,
6 => 1, 10, 11, 100, 101, 110
*/

// 4.
const reverse = (list) => {
  let previousNode = null;
  let currentNode = list.head; // The current node
  let nextNode = null; // The next node in the list
  // Reversal
  while (currentNode != null) {
    nextNode = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }
  // Set the last element as the new head node
  list.head = previousNode;
};

/*
const list = new MyLinkedList();
list.insertAtBeginning(4);
list.insertAtBeginning(9);
list.insertAtBeginning(6);
list.insertAtBeginning(1);
list.insertAtBeginning(0);
list.printList();
reverse(list);
list.printList();
*/

// 5.

const findMin = (rootNode) => {
  if (rootNode == null) {
    return null;
  }
  else if (rootNode.left == null) {
    return rootNode.data;
  }
  else {
    return findMin(rootNode.left);
  }
};
const BST = new MyBinarySearchTree();
BST.insert(-80);
BST.insert(6);
BST.insert(20);
BST.insert(-1);
console.log(findMin(BST.root));