/* 
   1. Print only the names of the tv shows from type 'Reality'.
   2. Print the tv show name with the highest number words.
   3. Use the API endpoint for each tv show and print the image of the tv shows which belong to the 'Action' genre.
      http://api.tvmaze.com/shows/${tvshowID}
*/

import './styles.css';
import axios from 'axios';

const showsArr = [
    { name: 'Dollhouse', type: 'Scripted', id: 432 },
    { name: 'Under the Dome', type: 'Scripted', id: -1 },
    { name: 'MasterChef', type: 'Reality', id: 324 },
    { name: 'Avatar: The Last Airbende', type: 'Animation', id: 555 }
];

document.getElementById('app').innerHTML = `
    <h1>Hello Small code test!</h1>
    <ol>
      <li></li>
      <li></li>
      <li></li>
    </ol>
`;