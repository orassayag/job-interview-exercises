class MyLinkNode {

    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class MyLinkedList {

    constructor() {
        this.head = null;
    }

    insertAtBeginning(data) {
        // A newNode object is created with property data and next = null
        const newNode = new MyLinkNode(data);
        // The pointer next is assigned head pointer so that both pointers now point at the same node.
        newNode.next = this.head;
        // As we are inserting at the beginning the head pointer needs to now point at the newNode.
        this.head = newNode;
        return this.head;
    }

    insertAtEnd(data) {
        // A newNode object is created with property data and next = null
        const newNode = new MyLinkNode(data);
        // When head = null i.e. the list is empty, then head itself will point to the node.
        if (!this.head) {
            this.head = newNode;
            return this.head;
        }
        // Else, traverse the list to find the tail (the tail node will initially be pointing at null), and update the tail's next pointer.
        let tail = this.head;
        while (tail.next !== null) {
            tail = tail.next;
        }
        tail.next = newNode;
        return this.head;
    }

    getAt(index) {
        // A helper function getAt() is defined to get to the desired position.
        // This function can also be later used for performing delete operation from a given position.
        let counter = 0;
        let node = this.head;
        while (node) {
            if (counter === index) {
                return node;
            }
            counter++;
            node = node.next;
        }
        return null;
    }

    insertAt(data, index) {
        // If the list is empty i.e. head = null
        if (!this.head) {
            this.head = new Node(data);
            return;
        }

        // If new node needs to be inserted at the front of the list i.e. before the head.
        if (index === 0) {
            this.head = new Node(data, this.head);
            return;
        }

        // Else, use getAt() to find the previous node.
        const previous = this.getAt(index - 1);
        const newNode = new Node(data);
        newNode.next = previous.next;
        previous.next = newNode;
        return this.head;
    }

    deleteFirstNode() {
        if (!this.head) {
            return;
        }
        this.head = this.head.next;
        return this.head;
    }

    deleteLastNode() {
        if (!this.head) {
            return null;
        }

        // If only one node in the list
        if (!this.head.next) {
            this.head = null;
            return;
        }

        let previous = this.head;
        let tail = this.head.next;
        while (tail.next !== null) {
            previous = tail;
            tail = tail.next;
        }
        previous.next = null;
        return this.head;
    }

    deleteAt(index) {
        // When list is empty i.e. head = null
        if (!this.head) {
            this.head = new Node(null);
            return;
        }

        // Node needs to be deleted from the front of the list i.e. before the head.
        if (index === 0) {
            this.head = this.head.next;
            return;
        }

        // Else, use getAt() to find the previous node.
        const previous = this.getAt(index - 1);
        if (!previous || !previous.next) {
            return;
        }
        previous.next = previous.next.next;
        return this.head;
    }

    getSize() {
        let count = 0;
        let node = this.head;
        while (node) {
            count++;
            node = node.next;
        }
        return count;
    }

    clear() {
        this.head = null;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next;
            }
        }
        return lastNode;
    }

    isEmpty() {
        return this.getSize() === 0;
    }

    printList() {
        if (this.isEmpty()) {
            console.log('Empty List');
            return false;
        } else {
            let temp = this.head;
            while (temp != null) {
                console.log(temp.data);
                console.log(' -> ');
                temp = temp.next;
            }
            console.log('null');
            return true;
        }
    }
}

module.exports = { MyLinkNode, MyLinkedList };