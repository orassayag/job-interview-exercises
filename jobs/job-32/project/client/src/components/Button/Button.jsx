import { memo, useState, useCallback } from 'react';
import './Button.scss';

const Button = memo(({ title, className, onClick }) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const onClickHandler = useCallback(() => {
        onClick();
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), 2000);
    }, []);

    return (
        <button className={className} disabled={isDisabled} onClick={onClickHandler}>
            {title}
        </button>
    );
});

export default Button;