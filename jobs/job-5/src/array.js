class MyArray {

    constructor() {
        this.length = 0;
        this.data = {};
    }

    // It returns the element at given index.
    getElementAtIndex(index) {
        return this.data[index];
    }

    // This function is used to push an element at the end of the array.
    push(element) {
        this.data[this.length] = element;
        this.length++;
        return this.data;
    }

    // It is used to delete an element at the end of the array.
    pop() {
        delete this.data[this.length - 1];
        this.length--;
        return this.data;
    }

    // This function is used to insert an element at given index.
    insertAt(element, index) {
        for (let i = this.length; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[index] = element;
        this.length++;
        return this.data;
    }

    // This function is used to remove an element at given index or property in a data object.
    deleteAt(index) {
        for (let i = index; i < this.length; i++) {
            this.data[i] = this.data[i + 1];
        }
        delete this.data[this.length - 1];
        this.length--;
        return this.data;
    }
}

module.exports = MyArray;