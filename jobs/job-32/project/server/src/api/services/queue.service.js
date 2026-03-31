class Queue {

    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
        this.action = null;
    }

    initiate(action) {
        this.action = action;
    }

    async enqueue(item) {
        this.items[this.tailIndex] = item;
        await this.action(item);
        this.tailIndex++;
    }

    dequeue() {
        const item = this.items[this.headIndex];
        delete this.items[this.headIndex];
        this.headIndex++;
        return item;
    }

    peek() {
        return this.items[this.headIndex];
    }

    getLength() {
        return this.tailIndex - this.headIndex;
    }
}

module.exports = new Queue();