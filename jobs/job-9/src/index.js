/* const search = async (string) => {

};

const searchInputHandler = (e) => {

};

(async => () => {
    let isSearching = false;
    const input = searchInputHandler(string);
    setTimeout(() => {
        await search(input);
    }, 5000);

})(); */

const sleep = async (milliseconds) => {
    return new Promise((resolve, reject) =>  { setTimeout(() => resolve()) }, milliseconds);
};