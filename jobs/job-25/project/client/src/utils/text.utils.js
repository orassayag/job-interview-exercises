class TextUtils {

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    escapeHTML(data) {
        const div = document.createElement('div');
        div.textContent = data;
        return div.innerHTML;
    }

    getAvarage(array) {
        const calcArray = array.slice(1);
        return ((calcArray.reduce((a, b) => parseFloat(a.toString().replace(',', '')) + parseFloat(b.toString().replace(',', '')), 0) / calcArray.length) || 0).toFixed(2);
    }
}

export default new TextUtils;