import './styles.css';
import axios from 'axios';

const showsArr = [
    { name: 'Dollhouse', type: 'Scripted', id: 432 },
    { name: 'Under the Dome', type: 'Scripted', id: -1 },
    { name: 'MasterChef', type: 'Reality', id: 324 },
    { name: 'Avatar: The Last Airbende', type: 'Animation', id: 555 }
];

const getShowsByType = (showsList, type) => {
    return showsList.filter(s => s.type === type).map(s => s.name).join(', ');
};

const getLongestName = (showsList) => {
    return showsList.reduce((acc, item) => {
        acc = item.name.split(' ').length > acc.name.split(' ').length ? item : acc;
        return acc;
    }).name;
};

const getGenreImage = async (showsList, genre) => {
    return (await Promise.all(showsList.map(s => axios.get(`http://api.tvmaze.com/shows/${s.id}`)))).map(d => d.data).filter(d => d.genres.includes(genre)).map(d => `<img src='${d.image.original}' />`);
};

// 1. Print only the names of the tv shows from type 'Reality'
// 2. Print the tv show name with the highest number words
// 3. use the API endpoint for each tv show and print the image of the tv shows which belong to the Action genre
//    http://api.tvmaze.com/shows/${tvshowID}

(async () => {
    document.getElementById('app').innerHTML = `
    <h1>Hello Small code test!</h1>
    <ol>
      <li>${getShowsByType(showsArr, 'Scripted')}</li>
      <li>${getLongestName(showsArr)}</li>
      <li>${await getGenreImage(showsArr, 'Action')}</li>
    </ol>
    `;
})();