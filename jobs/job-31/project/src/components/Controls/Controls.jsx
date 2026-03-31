import { useContext } from 'react';
import GameContext from '../../context/game.context';

const MAX_SERIES = 20;

const Controls = (props) => {
    const { state, handleStartButtonClick } = useContext(GameContext);
    const displayCount = () => {
        const { isOn, isPlaying, isIncorrect, count } = state;
        if (isOn) {
            if (!isPlaying) {
                return '--';
            }

            if (isIncorrect) {
                return '!!';
            }

            if (count === MAX_SERIES + 1) {
                return '**';
            }
            return count * 10;
        }
    };

    return (
        <div className="simon-game__settings">
            <h1 className="simon-game__heading">SIMON</h1>
            <div className="simon-game__settings-middle-row">
                <div className="simon-game__settings-group simon-game__settings-group--count-display">
                    <div className="simon-game__settings-count-display">{displayCount()}</div>
                    <p className="simon-game__settings-label">Count</p>
                </div>
                <div className="simon-game__settings-group simon-game__settings-group--start-button">
                    <button className="simon-game__settings-button simon-game__settings-button--start" onClick={handleStartButtonClick}></button>
                    <p className="simon-game__settings-label">Start</p>
                </div>
                <div className="simon-game__settings-group simon-game__settings-group--strict-button">
                    <div className={`simon-game__settings-strict-mode-indicator${props.toggleIsLitClassForStrictModeIndicator()}`}></div>
                    <button
                        className="simon-game__settings-button simon-game__settings-button--strict"
                        onClick={props.handleStrictModeButtonClick}
                    ></button>
                    <p className="simon-game__settings-label">Strict</p>
                </div>
            </div>
            <div className="simon-game__settings-bottom-row">
                <span className="simon-game__settings-bottom-row-label simon-game__settings-bottom-row-label--left">Off</span>
                <button
                    className={`simon-game__settings-power-button${props.toggleIsOnClass()}`}
                    onClick={props.handlePowerButtonClick}></button>
                <span className="simon-game__settings-bottom-row-label simon-game__settings-bottom-row-label--left">On</span>
            </div>
        </div>
    );
};

export default Controls;