// 1. Write debounce custom hook. You need to wait a few seconds between each key-press typings.
// 2. Implement a sleep function.

// 1.
import { useState, useEffect } from 'react';

// Search API function.
const searchAPI = async (search) => {
    try {
        search = search.toLowerCase();
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, { method: 'GET' });
        const results = await response.json();
        if (results) {
            return results.filter(s => s.title.includes(search));
        }
        return [];
    }
    catch (error) {
        console.log(error);
        return [];
    }
};

// Custom Hook - useDebounce.
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);
    return debouncedValue;
};

// App Componenet.
const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const searchWorker = async () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                const resultsData = await searchAPI(debouncedSearchTerm);
                setIsSearching(false);
                setResults(resultsData);
            }
            else {
                setResults([]);
                setIsSearching(false);
            }
        };
        searchWorker();
    }, [debouncedSearchTerm]);

    const searchTypeHandler = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <input type="text" placeholder="Search Marvel Comics" onChange={searchTypeHandler} />
            {isSearching && <div>Searching...</div>}
            {results.map(h =>
                <div key={h.id}>
                    <h4>{h.title}</h4>
                    <h6>{h.userId}</h6>
                    <p>Completed? {h.completed}</p>
                </div>
            )}
        </>
    );
};

export default App;

// 2.
const sleep = (millisecondsCount) => {
    return new Promise(resolve => setTimeout(resolve, millisecondsCount)).catch();
};
sleep(1000);