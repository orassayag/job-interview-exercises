import { memo } from 'react';
import './Loader.scss';

const Loader = memo(() => {

    return (
        <div className="loader-container">
            <div className="loader-body">
                <div className="loader loader_1"></div>
                <div className="loader loader_2"></div>
                <div className="loader loader_3"></div>
                <div className="loader loader_4"></div>
                <div className="loader loader_5"></div>
                <div className="loader loader_6"></div>
                <div className="loader loader_7"></div>
                <div className="loader loader_8"></div>
            </div>
        </div>
    );
});

export default Loader;