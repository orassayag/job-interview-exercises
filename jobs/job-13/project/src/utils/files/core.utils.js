class CoreUtils {

    constructor() { }

    simulateAsyncCall () {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
}

export default new CoreUtils();