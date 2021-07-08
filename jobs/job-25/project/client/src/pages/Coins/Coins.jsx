import { useState, useCallback } from 'react';
import useSocket from '../../hooks/useSocket';
import coins from '../../data/coins';
import sources from '../../data/sources';
import { CoinBox, SelectSource, Loader, Shoutbox } from '../../components';
import './Coins.scss';

const Coins = () => {
    const [source, setSource] = useState(sources[0].name);
    const coinsData = useSocket();

    const changeSourceHandler = useCallback((e) => {
        setSource(e.target.value);
    }, []);

    const isReady = coins && coinsData && coinsData.length > 0;

    return (
        <div className="coins-container">
            {!isReady && <Loader />}
            {isReady &&
                <>
                    <div className="sources">
                        <SelectSource
                            source={source}
                            sources={sources}
                            onChange={changeSourceHandler}
                        />
                    </div>
                    <div className="coins">
                        {coins.map(c => (
                            <CoinBox
                                key={c.id}
                                source={source}
                                shortName={c.shortName}
                                displayName={c.displayName}
                                colors={c.colors}
                                coinsData={coinsData}
                            />
                        ))}
                    </div>
                    <div className="shout-box">
                        <Shoutbox />
                    </div>
                </>}
        </div>
    );
};

export default Coins;