import { createContext } from 'react';

const GameContext = createContext({
    state: null,
    dispatch: null,
    handleClick: () => { },
    handleStartButtonClick: () => { }
});

export default GameContext;