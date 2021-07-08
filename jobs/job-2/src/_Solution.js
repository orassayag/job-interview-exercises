// Fix the timer to work.

import React, { useState, useEffect } from 'react';
import './styles.css';

const App = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(time => time + 1), 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className='App'>
      <h1>Timer</h1>
      <h2>{time}</h2>
    </div>
  );
};

export default App;