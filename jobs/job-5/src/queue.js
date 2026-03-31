class MyQueue {

    constructor() {
        this.elements = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }

    enqueue(element) {
        this.elements[this.tailIndex] = element;
        this.tailIndex++;
    }

    dequeue() {
        const element = this.elements[this.headIndex];
        delete this.elements[this.headIndex];
        this.headIndex++;
        return element;
    }

    peek() {
        return this.elements[this.headIndex];
    }

    getLength() {
        return this.tailIndex - this.headIndex;
    }
}

module.exports = MyQueue;