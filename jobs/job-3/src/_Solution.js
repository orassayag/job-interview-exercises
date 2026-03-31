/*
   You need to build a simple application that will contain:
   1. You have the following API endpoint: http://api.tvmaze.com/shows/${tvshowID}
   2. A list of tv shows (A hard coded number 100,200,3000, think of one you want) of tv shows to display.
   3. Fetch from the API only the following fields:
   4. Display the Image, Link to the tv show's page, genres, type, rating, schedule, summary.
   5. Add Search bar. Each key will affect the results. Next to it, display a dropbox to search by name, genre, type, or word in summary.
   6. Bonus: Display scrolling down pager, each page will display 10 movies. If the search is changed, update the results and go up.
*/

import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchMovie = async (id) => {
    try {
        return await axios.get(`http://api.tvmaze.com/shows/${id}`);
    }
    catch (e) {
        return null;
    }
};

const App = () => {
    const moviesFetchCount = 100;
    const [searchText, setSearchText] = useState(null);
    const [searchBy, setSearchBy] = useState('name');
    const [showsList, setShowsList] = useState([]);
    const [displayShows, setDisplayShows] = useState([]);

    useEffect(() => {
        const getShows = async () => {
            const idsList = [...Array(moviesFetchCount).keys()];
            idsList.shift();
            const shows = (await Promise.all(idsList.map(t => fetchMovie(t)))).filter(t => t).reduce((acc, item) => {
                const { id, name, url, type, genres, rating, schedule, summary, image } = item.data;
                acc.push({ id, name, url, type, genres, rating, schedule, summary, image });
                return acc;
            }, []);
            setShowsList(shows);
            setDisplayShows(shows);
        };
        getShows();
    }, []);

    useEffect(() => {
        if (searchText) {
            if (searchBy === 'genres') {
                setDisplayShows(showsList.filter(t => t.genres.map(t => t.toLowerCase()).indexOf(searchText.toLowerCase()) > -1));
            }
            else {
                setDisplayShows(showsList.filter(t => t[searchBy].toLowerCase().includes(searchText.toLowerCase())));
            }
        }
        else {
            setDisplayShows(showsList);
        }
    }, [searchText, searchBy]);

    const onSearchByChangeHandler = (e) => {
        setSearchBy(e.target.value);
    };

    const onSearchTextChangeHandler = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="app">
            <div className="search-bar">
                <div className="search-text-control">
                    <div className="search-text-wrapper">
                        <div className="search-text-title">
                            Search:
                        </div>
                        <input className="search-text" onChange={onSearchTextChangeHandler} />
                    </div>
                </div>
                <div className="search-by-control">
                    <div className="search-by-wrapper">
                        <div className="search-by-title">
                            By:
                        </div>
                        <select className="search-by" value={searchBy} onChange={onSearchByChangeHandler}>
                            <option value="name">Name</option>
                            <option value="genres">Genre</option>
                            <option value="type">Type</option>
                            <option value="summary">Summary</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="shows-list">
                {displayShows.map(t => (
                    <div className="show" key={t.id}>
                        <div className="show-identity">
                            <h1 className="title">{t.name}</h1>
                            <div className="image" style={{ backgroundImage: `url(${t.image.medium})` }}></div>
                        </div>
                        <div className="show-details">
                            <div className="summary" dangerouslySetInnerHTML={{ __html: t.summary }}></div>
                            <div>Type: {t.type}</div>
                            <div>Genres: {t.genres.join(', ')}</div>
                            <div>Rating: {t.rating.average}</div>
                            <div>When: {t.schedule.time}, {t.schedule.days.join(', ')}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;