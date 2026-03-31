import { useReducer, useEffect, useCallback } from 'react';
import GameContext from '../../context/game.context';
import { Buttons, Controls, Instructions } from '..';

const MAX_SERIES = 20;
let timers = [];
const sounds = Array(4).fill(null).map((val, i) => new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${i + 1}.mp3`));
sounds.push(new Audio('https://s3.us-east-2.amazonaws.com/vitamindigitalmediaassets/Wrong-answer-sound-effect.mp3'));
sounds.push(new Audio('https://s3.us-east-2.amazonaws.com/vitamindigitalmediaassets/ta-da.mp3'));

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateSeries = () => new Array(MAX_SERIES).fill(null).map(item => (
    Math.floor(Math.random() * 6)
));

const reducer = (state, action) => {
    switch (action.type) {
        case 'TURN_ON':
            return {
                ...state,
                isOn: true
            };

        case 'TURN_OFF':
            return {
                ...state,
                isOn: false
            };

        case 'START_PLAYING':
            return {
                ...state,
                isPlaying: true
            };

        case 'STOP_PLAYING':
            return {
                ...state,
                isPlaying: false
            };

        case 'SET_STRICT_MODE':
            return {
                ...state,
                isStrictMode: true
            };

        case 'SET_NORMAL_MODE':
            return {
                ...state,
                isStrictMode: false
            };

        case 'SET_PLAYERS_TURN':
            return {
                ...state,
                isPlayersTurn: true
            };

        case 'SET_COMPUTERS_TURN':
            return {
                ...state,
                isPlayersTurn: false
            };

        case 'SET_COUNT':
            return {
                ...state,
                count: action.payload
            };

        case 'CREATE_NEW_SERIES':
            return {
                ...state,
                series: generateSeries()
            };

        case 'SET_CLICKED_SERIES':
            return {
                ...state,
                clickedSeries: action.payload
            };

        case 'SET_LIT_BUTTON_INDEX':
            return {
                ...state,
                litButtonIndex: action.payload
            };

        case 'SET_IS_INCORRECT':
            return {
                ...state,
                isIncorrect: true
            };

        case 'SET_IS_INCORRECT_IF_IDLE_WITHOUT_CLICK':
            return {
                ...state,
                isIncorrect: state.isPlayersTurn && state.clickedSeries.length === 0
            };

        case 'SET_IS_INCORRECT_IF_IDLE_AFTER_CLICK':
            return {
                ...state,
                isIncorrect: state.isPlayersTurn && state.clickedSeries.length === action.payload + 1
            };

        case 'SET_IS_INCORRECT_IF_INCORRECT':
            return {
                ...state,
                isIncorrect: state.isPlayersTurn && state.clickedSeries.join('') !== state.series.slice(0, state.clickedSeries.length).join('')
            };

        case 'SET_IS_CORRECT':
            return {
                ...state,
                isIncorrect: false
            };

        case 'MARK_CELEBRATED':
            return {
                ...state,
                celebrated: true
            };

        case 'UNMARK_CELEBRATED':
            return {
                ...state,
                celebrated: false
            };

        default:
            return state;
    }
};

const INITIAL_STATE = {
    isOn: false,
    isPlaying: false,
    isStrictMode: false,
    isPlayersTurn: false,
    count: 1,
    series: generateSeries(),
    clickedSeries: [],
    litButtonIndex: null,
    isIncorrect: false,
    celebrated: false
};

const SimonGame = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const indicateErrorIfIdleWithoutClick = useCallback(() => {
        timers.push(setTimeout(() => {
            dispatch({
                type: 'SET_IS_INCORRECT_IF_IDLE_WITHOUT_CLICK'
            });
        }, 5000));
    }, []);

    const indicateClick = useCallback(i => {
        if (!state.isOn || !state.isPlaying) {
            return;
        }

        dispatch({
            type: 'SET_LIT_BUTTON_INDEX',
            payload: i
        });

        sounds[getRandomInt(0, 3)].play();
    }, [state.isOn, state.isPlaying]);

    const clickAtInterval = useCallback(i => {
        const { isOn, isPlaying, series, count } = state;
        if (!isOn || !isPlaying || count > MAX_SERIES) {
            return;
        }

        const thisSeries = series.slice(0, count);
        if (i === thisSeries.length) {
            dispatch({
                type: 'SET_PLAYERS_TURN'
            });
        } else {
            timers.push(setTimeout(() => {
                indicateClick(thisSeries[i++]);
                timers.push(setTimeout(() => {
                    dispatch({
                        type: 'SET_LIT_BUTTON_INDEX',
                        payload: null
                    });

                    clickAtInterval(i);
                }, 500));
            }, 350));
        }
    }, [state.isOn, state.isPlaying, state.series, state.count, indicateClick]);

    const runSeries = useCallback(count => {
        if (state.isOn && state.isPlaying && count <= MAX_SERIES) {
            dispatch({
                type: 'SET_COMPUTERS_TURN'
            });

            timers.push(setTimeout(() => {
                dispatch({
                    type: 'SET_IS_CORRECT'
                });

                clickAtInterval(0);
            }, 3000));
        }
    }, [state.isOn, state.isPlaying, clickAtInterval]);

    const clearTimers = useCallback(() => {
        timers.forEach(timer => clearTimeout(timer));
        timers = [];
    }, []);

    const indicateErrorIfIdleAfterClick = useCallback(oldClickedSeriesLength => {
        timers.push(setTimeout(() => {
            dispatch({
                type: 'SET_IS_INCORRECT_IF_IDLE_AFTER_CLICK',
                payload: oldClickedSeriesLength
            });
        }, 5000));
    }, []);

    const generateNewSettingsForErrorInStrictMode = useCallback(() => {
        dispatch({ type: 'SET_COMPUTERS_TURN' });
        dispatch({ type: 'CREATE_NEW_SERIES' });
        dispatch({ type: 'SET_COUNT', payload: 1 });
        dispatch({ type: 'UNMARK_CELEBRATED' });
        dispatch({ type: 'SET_CLICKED_SERIES', payload: [] });
        dispatch({ type: 'SET_LIT_BUTTON_INDEX', payload: null });
    }, []);

    const handleClick = i => {
        const { isOn, isPlaying, isPlayersTurn, clickedSeries } = state;
        if (isOn && isPlaying && isPlayersTurn) {
            clearTimers();
            indicateClick(i);
            timers.push(setTimeout(() => {
                dispatch({
                    type: 'SET_CLICKED_SERIES',
                    payload: [...clickedSeries, i]
                });

                dispatch({
                    type: 'SET_LIT_BUTTON_INDEX',
                    payload: null
                });
                indicateErrorIfIdleAfterClick(clickedSeries.length);
            }, 350));
        }
    };

    const generateNewSettings = useCallback(() => {
        generateNewSettingsForErrorInStrictMode();
        dispatch({ type: 'SET_IS_CORRECT' });
    }, [generateNewSettingsForErrorInStrictMode]);

    const indicateError = useCallback(() => {
        sounds[4].play();
    }, []);

    const indicateErrorAndRestartInStrictMode = useCallback(() => {
        if (state.isStrictMode) {
            clearTimers();
            indicateError();
            generateNewSettingsForErrorInStrictMode();
        }
    }, [state.isStrictMode, clearTimers, indicateError, generateNewSettingsForErrorInStrictMode]);

    const repeatSeries = useCallback(() => {
        dispatch({
            type: 'SET_CLICKED_SERIES',
            payload: []
        });
    }, []);

    const indicateErrorAndRepeatSeriesInNonStrictMode = useCallback(() => {
        if (!state.isStrictMode) {
            clearTimers();
            indicateError();
            repeatSeries();
        }
    }, [state.isStrictMode, clearTimers, indicateError, repeatSeries]);

    const indicateErrorIfIncorrect = useCallback(() => {
        dispatch({ type: 'SET_IS_INCORRECT_IF_INCORRECT' });
    }, []);

    const startNextSeriesIfCorrect = useCallback(() => {
        const { clickedSeries, count, series } = state;
        if (clickedSeries.length === count && series.slice(0, count).join('') === clickedSeries.join('')) {
            clearTimers();
            dispatch({ type: 'SET_COUNT', payload: count + 1 });
            dispatch({ type: 'SET_CLICKED_SERIES', payload: [] });
        }
    }, [state.clickedSeries, state.count, state.series, clearTimers]);

    const startGame = () => {
        dispatch({ type: 'START_PLAYING' });
        dispatch({ type: 'SET_COUNT', payload: 1 });
    };

    const restartGame = useCallback(() => {
        clearTimers();
        generateNewSettings();
    }, [clearTimers, generateNewSettings]);

    const celebrateIfGameWonAndRestart = useCallback(count => {
        const { series, celebrated } = state;
        if (count === MAX_SERIES + 1 && !celebrated) {
            let intervalId = setInterval(() => {
                dispatch({
                    type: 'SET_LIT_BUTTON_INDEX',
                    payload: null
                });

                timers.push(setTimeout(() => {
                    dispatch({
                        type: 'SET_LIT_BUTTON_INDEX',
                        payload: series[series.length - 1]
                    });

                    dispatch({
                        type: 'MARK_CELEBRATED'
                    });
                }, 175));
            }, 350);

            sounds[5].play();
            timers.push(setTimeout(() => {
                clearInterval(intervalId);
                restartGame();
            }, 3000));
        }
    }, [state.series, state.celebrated, restartGame]);

    const handleStartButtonClick = () => {
        const { isOn, isPlaying } = state;
        if (isOn && !isPlaying) {
            startGame();
        } else if (isOn) {
            restartGame();
        }
    };

    const toggleIsLitClassForStrictModeIndicator = () => {
        return state.isStrictMode ? ' is-lit' : '';
    };

    const handleStrictModeButtonClick = () => {
        const { isOn, isStrictMode } = state;
        if (isOn) {
            if (isStrictMode) {
                dispatch({ type: 'SET_NORMAL_MODE' });
            } else {
                dispatch({ type: 'SET_STRICT_MODE' });
            }
        }
    };

    const toggleIsOnClass = () => {
        return state.isOn ? ' is-on' : '';
    };

    const powerOff = () => {
        clearTimers();
        dispatch({ type: 'TURN_OFF' });
        dispatch({ type: 'STOP_PLAYING' });
        dispatch({ type: 'SET_NORMAL_MODE' });
        generateNewSettings();
    };

    const handlePowerButtonClick = () => {
        if (state.isOn) {
            powerOff();
        } else {
            dispatch({ type: 'TURN_ON' });
        }
    };

    useEffect(() => {
        const { isOn, isPlaying, clickedSeries, count } = state;
        if (isOn && isPlaying && clickedSeries.length === 0) {
            runSeries(count);
        }
    }, [state.isOn, state.isPlaying, state.count, state.clickedSeries, state.clickedSeries, runSeries]);

    useEffect(() => {
        if (state.isOn && state.isPlaying) {
            celebrateIfGameWonAndRestart(state.count);
        }
    }, [state.isOn, state.isPlaying, state.count, celebrateIfGameWonAndRestart]);

    useEffect(() => {
        if (state.isPlayersTurn) {
            indicateErrorIfIdleWithoutClick();
        }
    }, [state.isPlayersTurn, indicateErrorIfIdleWithoutClick, clearTimers]);

    useEffect(() => {
        const { isOn, isPlaying, isIncorrect } = state;
        if (isOn && isPlaying && isIncorrect) {
            indicateErrorAndRestartInStrictMode();
            indicateErrorAndRepeatSeriesInNonStrictMode();
        }
    }, [state.isOn, state.isPlaying, state.isIncorrect, indicateErrorAndRestartInStrictMode, indicateErrorAndRepeatSeriesInNonStrictMode]);

    useEffect(() => {
        if (state.isOn && state.isPlaying && state.clickedSeries.length > 0) {
            indicateErrorIfIncorrect();
            startNextSeriesIfCorrect();
        }
    }, [state.isOn, state.isPlaying, state.clickedSeries, indicateErrorIfIncorrect, startNextSeriesIfCorrect, clearTimers]);

    return (
        <GameContext.Provider value={{ state, dispatch, handleClick, handleStartButtonClick }}>
            <div className="simon-game">
                <Controls
                    toggleIsLitClassForStrictModeIndicator={toggleIsLitClassForStrictModeIndicator}
                    handleStrictModeButtonClick={handleStrictModeButtonClick}
                    toggleIsOnClass={toggleIsOnClass}
                    handlePowerButtonClick={handlePowerButtonClick}
                />
                <Instructions />
                <Buttons />
            </div>
        </GameContext.Provider>
    );
};

export default SimonGame;