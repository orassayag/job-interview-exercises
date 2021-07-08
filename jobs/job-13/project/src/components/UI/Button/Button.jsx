import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';

const Button = memo(({ label, icon, onClickHandler }) => {

    return (
        <div className="button-container">
            <button onClick={onClickHandler}>
                {icon && <FontAwesomeIcon icon={icon} />} {label}
            </button>
        </div>
    );
});

export default Button;