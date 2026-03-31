class MyStack {

    constructor() {
        this.elements = [];
        this.maxElements = [];
    }

    push(element) {
        if (this.elements.length === 0 || element >= this.getMaxValue()) {
            this.maxElements.push(element);
        }
        else {
            this.maxElements.push(this.getMaxValue());
        }
        this.elements.push(element);
    }

    pop() {
        this.maxElements.pop();
        return this.elements.pop();
    }

    peek() {
        return this.elements[this.elements.length - 1];
    }

    getLength() {
        return this.elements.length;
    }

    clear() {
        this.elements = [];
    }

    isEmpty() {
        return this.elements.length === 0;
    }

    getMaxValue() {
        return this.maxElements[this.elements.length - 1];
    }

    printStack() {
        this.elements.map(e => console.log(e));
    }
}

module.exports = MyStack;