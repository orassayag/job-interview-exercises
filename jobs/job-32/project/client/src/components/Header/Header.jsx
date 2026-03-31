import { memo } from 'react';
import { Button } from '../';
import './Header.scss';

const Header = memo(({ onGenerateClick }) => {
    return (
        <div className="header-container">
            <div className="title">
                Emails report
            </div>
            <div className="generate">
                <Button
                    title="Generate"
                    className="btn generate"
                    onClick={onGenerateClick}
                />
            </div>
        </div>
    );
});

export default Header;