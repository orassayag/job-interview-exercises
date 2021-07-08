import { useContext } from 'react';
import GameContext from '../../context/game.context';

const Buttons = () => {
    const { state, handleClick } = useContext(GameContext);
    const toggleIsLitClassForButton = i => i === state.litButtonIndex ? 'is-lit' : '';
    return (
        <div className="simon-game__buttons">{Array(6).fill(null).map((val, i) => (<button className={`simon-game__button simon-game__button--${i} ${toggleIsLitClassForButton(i)}`} key={i} onClick={() => handleClick(i)}></button>))}</div>
    );
};

export default Buttons;