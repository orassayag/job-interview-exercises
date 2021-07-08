class MyNode {

    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Binary Search tree class
class MyBinarySearchTree {

    constructor() {
        // Root of a binary search tree
        this.root = null;
    }

    // Helper method which creates a new node to
    // be inserted and calls insertNode
    insert(data) {
        // Creating a node and initializing
        // with data.
        const newNode = new MyNode(data);
        // Root is null then node will
        // be added to the tree and made root.
        if (this.root === null) {
            this.root = newNode;
        }
        else {
            // find the correct position in the
            // tree and add the node
            this.insertNode(this.root, newNode);
        }
    }

    // Method to insert a node in a tree
    // it moves over the tree to find the location
    // to insert a node with a given data
    insertNode(node, newNode) {
        // If the data is less than the node
        // data move left of the tree
        if (newNode.data < node.data) {
            // If left is null insert node here
            if (node.left === null) {
                node.left = newNode;
            }
            else {
                // If left is not null recur until
                // null is found
                this.insertNode(node.left, newNode);
            }
        }

        // If the data is more than the node
        // data move right of the tree
        else {
            // If right is null insert node here
            if (node.right === null) {
                node.right = newNode;
            }
            else {
                // If right is not null recur until
                // null is found
                this.insertNode(node.right, newNode);
            }
        }
    }

    // Helper method that calls the
    // removeNode with a given data
    remove(data) {
        // Root is re-initialized with
        // root of a modified tree.
        this.root = this.removeNode(this.root, data);
    }

    // Method to remove node with a
    // given data
    // it recur over the tree to find the
    // data and removes it
    removeNode(node, key) {
        // If the root is null then tree is
        // empty
        if (node === null) {
            return null;
        }
        // If data to be delete is less than
        // roots data then move to left subtree
        else if (key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        }
        // If data to be delete is greater than
        // roots data then move to right subtree
        else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        }
        // If data is similar to the root's data
        // then delete this node
        else {
            // Deleting node with no children
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            // Deleting node with one children
            if (node.left === null) {
                node = node.right;
                return node;
            }
            else if (node.right === null) {
                node = node.left;
                return node;
            }
            // Deleting node with two children
            // minimum node of the right subtree
            // is stored in aux
            const aux = this.findMinNode(node.right);
            node.data = aux.data;
            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
    }

    // Performs inorder traversal of a tree
    inorder(node) {
        if (node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }

    // Performs preorder traversal of a tree
    preorder(node) {
        if (node !== null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    // Performs postorder traversal of a tree
    postorder(node) {
        if (node !== null) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }

    findMinNode(node) {
        // If left of a node is null
        // then it must be minimum node
        if (node.left === null) {
            return node;
        }
        else {
            return this.findMinNode(node.left);
        }
    }

    // returns root of the tree
    getRootNode() {
        return this.root;
    }

    // search for a node with given data
    search(node, data) {
        // If trees is empty return null
        if (node === null) {
            return null;
        }
        // If data is less than node's data
        // move left
        else if (data < node.data) {
            return this.search(node.left, data);
        }
        // If data is less than node's data
        // move left
        else if (data > node.data) {
            return this.search(node.right, data);
        }
        // If data is equal to the node data
        // return node
        else {
            return node;
        }
    }
}

module.exports = MyBinarySearchTree;