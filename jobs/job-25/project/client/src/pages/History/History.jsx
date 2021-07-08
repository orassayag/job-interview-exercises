import { useState, useEffect } from 'react';
import apiService from '../../services/api.service';
import coins from '../../data/coins';
import { HistoryGridRow, Loader } from '../../components';
import { dataUtils, textUtils } from '../../utils';
import './History.scss';

const History = ({ match }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coinsData, setCoinData] = useState(null);

    useEffect(() => {
        const coinData = coins.find(c => c.shortName === match.params.id);
        if (!coinData) {
            history.push('/');
        }
        const fetchData = async () => {
            const responseData = await apiService.get(`record/getHistory?coin=${match.params.id}&top=100`);
            if (responseData.error) {
                setError(responseData.error);
            }
            setIsLoading(false);
            setCoinData({ coin: coinData, data: dataUtils.convertCoinData(responseData.data.data) });
        };
        fetchData();
    }, []);

    return (
        <div className="history-container">
            {error && <div>{error}</div>}
            {isLoading && <Loader />}
            {!isLoading && !error && coinsData &&
                <>
                    <div className="coin-title">
                        <div className={`logo ${coinsData.coin.shortName}-logo`}></div>
                        <h1>{coinsData.coin.displayName} - History Rates</h1>
                    </div>
                    <HistoryGridRow
                        type="head"
                        className={`header header-${coinsData.coin.shortName}`}
                        slots={['Time', 'Coingecko', 'Cryptocompare', 'Bitstamp', 'Avarage']}
                    />
                    {coinsData.data.map(s => (
                        <HistoryGridRow
                            key={s[0]}
                            type="row"
                            className="row"
                            slots={[...s, textUtils.getAvarage(s)]}
                        />
                    ))}
                </>}
        </div>
    );
};

export default History;