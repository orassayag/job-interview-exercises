class MyStack {

    constructor() {
        this.top = 0;
        this.elements = [];
    }

    push(element) {
        this.elements[this.top] = element;
        this.top++;
    }

    pop() {
        const element = this.elements[this.top];
        this.top--;
        return element;
    }

    peek() {
        return this.elements[this.top - 1];
    }

    getLength() {
        return this.top;
    }

    clear() {
        this.top = 0;
    }
}

module.exports = MyStack;