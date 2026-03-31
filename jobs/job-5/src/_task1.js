const MyArray = require('./array');
const MyQueue = require('./queue');
const MyStack = require('./stack2');
const { MyLinkNode, MyLinkedList } = require('./linkedlist');
/*
  1. Build the 6 most common data structures in JavaScript.
  2. Thanks to: https://www.educative.io/blog/javascript-data-structures
*/

// ARRAY
// =====
/*
The most basic of all data structures, an array stores data in memory for
later use. Each array has a fixed number of cells decided on its creation,
and each cell has a corresponding numeric index used to select its data.
Whenever you’d like to use the array, all you need are the desired indices,
and you can access any of the data within.
Advantages =>
* Simple to create and use.
* Foundational building block for complex data structures
Disadvantages =>
* Fixed size
* Expensive to insert/delete or resequence values
* Inefficient to sort
Applications =>
* Basic spreadsheets
* Within complex structures such as hash tables
*/

console.log('===ARRAY===');
const array = new MyArray(); //we are instantiating an object of Array class
array.push(12);
array.push(13); // Pushing element.
array.push(14);
array.push(10);
array.push(989);
console.log('Print element in an array');
for (let key in array.data) {
  console.log(array.data[key]);
}

console.log('Pop element in an array');
array.pop(); // Popping element 989.
for (let key in array.data) {
  console.log(array.data[key]);
}

console.log('Inserting element at position 2');
array.insertAt(456, 2); // Inserting element 456.
for (let key in array.data) {
  console.log(array.data[key]);
}

console.log('Deleting element at position 3');
array.deleteAt(3); // Deleting 14.
for (let key in array.data) {
  console.log(array.data[key]);
}

console.log('Getting element at position 2');
console.log(array.getElementAtIndex(2));

// QUEUE & STACK
// =============
/*
Queues are conceptually similar to stacks; both are sequential structures,
but queues process elements in the order they were entered rather than
the most recent element.
As a result, queues can be thought of as a FIFO (First In, First Out)
version of stacks. These are helpful as a buffer for requests, storing
each request in the order it was received until it can be processed.
For a visual, consider a single-lane tunnel: the first car to enter is the
first car to exit. If other cars should wish to exit, but the first stops,
all cars will have to wait for the first to exit before they can proceed.
Advantages =>
* Dynamic size
* Orders data in the order it was received
* Low runtime
Disadvantages =>
* Can only retrieve the oldest element
Applications =>
* Effective as a buffer when receiving frequent data
* Convenient way to store order-sensitive data such as stored voicemails
* Ensures the oldest data is processed first
*/

console.log('===QUEUE===');

const queue = new MyQueue();

queue.enqueue(7);
queue.enqueue(2);
queue.enqueue(6);
queue.enqueue(4);

console.log(queue.dequeue()); // => 7

console.log(queue.peek()); // => 2

console.log(queue.getLength());  // => 3

console.log('===STACK===');

const stack = new MyStack();

stack.push(5);
stack.push(5);
stack.push(7);
stack.push(3);
stack.push(4);

console.log(stack);
// Stack {data: [ 5, 5, 7, 3, 4 ], size: 5, maxValues: [ 5, 5, 7, 7, 7 ]}
console.log('max', stack.getMaxValue());
// max 7

stack.pop();
console.log(stack);
// Stack { data: [ 5, 5, 7, 3 ], size: 4, maxValues: [ 5, 5, 7, 7 ] }
console.log('max', stack.getMaxValue());
// max 7

stack.pop();
console.log(stack);
// Stack { data: [ 5, 5, 7 ], size: 3, maxValues: [ 5, 5, 7 ] }
console.log('max', stack.getMaxValue());
// max 7

stack.pop();
console.log(stack);
// Stack { data: [ 5, 5 ], size: 2, maxValues: [ 5, 5 ] }
console.log('max', stack.getMaxValue());
// max 5


// LINKED LIST
// ===========
/*
Linked lists are a data structure which, unlike the previous three,
does not use physical placement of data in memory. This means that,
rather than indexes or positions, linked lists use a referencing system:
elements are stored in nodes that contain a pointer to the next node,
repeating until all nodes are linked.
This system allows efficient insertion and removal of
items without the need for reorganization.
Advantages =>
* Efficient insertion and removal of new elements
* Less complex than restructuring an array
Disadvantages =>
* Uses more memory than arrays
* Inefficient to retrieve a specific element
* Inefficient to traverse the list backward
Applications =>
* Best used when data must be added and removed in quick succession from unknown locations
*/

console.log('===LINKED LIST===');

const list = new MyLinkedList();
list.insertAtBeginning(new MyLinkNode(2));
list.insertAtBeginning(new MyLinkNode(5));
list.insertAtBeginning(new MyLinkNode(7));
console.log(list);
console.log(list.getAt(1));

// TREE
// ====
/*
Trees are another relation-based data structure, which specialize in representing hierarchical structures.
Like a linked list, nodes contain both elements of data and pointers marking its relation to immediate nodes.
Each tree has a “root” node, off of which all other nodes branch. The root contains references to all
elements directly below it, which are known as its “child nodes”. This continues, with each child node,
branching off into more child nodes.
Nodes with linked child nodes are called internal nodes while those without child nodes are external
nodes. A common type of tree is the “binary search tree” which is used to easily search stored data.
These search operations are highly efficient, as its search duration is dependent not on the number
of nodes but on the number of levels down the tree.
This type of tree is defined by four strict rules:
1. The left subtree contains only nodes with elements lesser than the root.
2. The right subtree contains only nodes with elements greater than the root.
3. Left and right subtrees must also be a binary search tree. They must follow the above rules with the “root” of their tree.
4. There can be no duplicate nodes, i.e. no two nodes can have the same value.
Advantages =>
* Ideal for storing hierarchical relationships
* Dynamic size
* Quick at insert and delete operations
* In a binary search tree, inserted nodes are sequenced immediately.
* Binary search trees are efficient at searches; length is only O(height)O(height).
Disadvantages =>
* Slow to rearrange nodes
* Child nodes hold no information about their parent node
* Binary search trees are not as fast as the more complicated hash table
* Binary search trees can degenerate into linear search (scanning all elements) if not implemented with balanced subtrees.
Applications =>
* Storing hierarchical data such as a file location.
* Binary search trees are excellent for tasks needing searching or ordering of data.
*/