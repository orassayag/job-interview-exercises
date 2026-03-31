/*
   You need to build a simple application that will contain:
   1. You have the following API endpoint: http://api.tvmaze.com/shows/${tvshowID}
   2. A list of tv shows (A hard coded number 100,500,1000, think of one you want) of tv shows to display.
   3. Fetch from the API only the following fields:
   4. Display the Image, Link to the tv show's page, genres, type, rating, schedule, summary.
   5. Add Search bar. Each key will affect the results. Next to it, display a dropbox to search by name, genre, type, or word in summary.
   6. Bonus: Display scrolling down pager, each page will display 10 movies. If the search is changed, update the results and go up.
*/

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;








//=====================================================================================

/*
   You need to build a simple application that will contain:
   1. You have the following API endpoint: http://api.tvmaze.com/shows/${tvshowID}
   2. A list of tv shows (A hard coded number 100,500,1000, think of one you want) of tv shows to display.
   3. Fetch from the API only the following fields:
   4. Display the Image, Link to the tv show's page, genres, type, rating, schedule, summary.
   5. Add Search bar. Each key will affect the results. Next to it, display a dropbox to search by name, genre, type, or word in summary.
   6. Bonus: Display scrolling down pager, each page will display 10 movies. If the search is changed, update the results and go up.
*/

/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */