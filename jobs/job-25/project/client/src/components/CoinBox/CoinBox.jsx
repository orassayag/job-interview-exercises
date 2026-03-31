import { memo, useState, useRef, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Chart } from 'chart.js';
import { timeUtils, textUtils } from '../../utils';
import './CoinBox.scss';

const CoinBox = memo(({ source, shortName, displayName, colors, coinsData }) => {
    const chartContainer = useRef(null);
    const [chartItem, setChartItem] = useState(null);
    const history = useHistory();
    const coins = coinsData.filter(c => c.source === source && shortName === c.coin);
    const times = coins.map(obj => obj.created_at);
    const prices = coins.map(obj => obj.rate);

    const boxClickHandler = useCallback((e) => {
        history.push(`/history/${e.target.getAttribute('name') || e.currentTarget.getAttribute('name')}`);
    }, []);

    const createChart = () => {
        let gradient = chartContainer.current.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, `rgba(${colors.colorStop1})`);
        gradient.addColorStop(.425, `rgba(${colors.colorStop2})`);

        const chartConfig = {
            type: 'line',
            data: {
                labels: times,
                datasets: [{
                    label: '$',
                    data: prices,
                    backgroundColor: gradient,
                    borderColor: `rgba(${colors.borderColor})`,
                    borderJoinStyle: 'round',
                    borderCapStyle: 'round',
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHitRadius: 10,
                    lineTension: .2
                }]
            },
            options: {
                title: {
                    display: false,
                    text: `${shortName} Chart`,
                    fontSize: 35
                },

                legend: {
                    display: false
                },

                animation: {
                    duration: 0
                },

                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },

                scales: {
                    xAxes: [{
                        display: false,
                        gridLines: {}
                    }],
                    yAxes: [{
                        display: false,
                        gridLines: {}
                    }]
                },

                tooltips: {
                    callbacks: {
                        label: (tti) => {
                            return `${timeUtils.convertToTime(tti.xLabel)}: $${textUtils.numberWithCommas(tti.yLabel)}`;
                        },
                        title: () => { }
                    },
                    displayColors: false,
                    yPadding: 10,
                    xPadding: 10,
                    position: 'nearest',
                    caretSize: 10,
                    backgroundColor: 'rgba(255,255,255,.9)',
                    bodyFontSize: 15,
                    bodyFontColor: '#303030'
                }
            }
        };
        Chart.defaults.defaultFontFamily = 'Red Hat Text';
        Chart.defaults.defaultFontSize = 12;
        return new Chart(chartContainer.current.getContext('2d'), chartConfig);
    };

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            chartItem?.destroy();
            setChartItem(createChart());
        }
    }, [source, coinsData, chartContainer]);

    return (
        <div name={shortName} className={shortName} onClick={boxClickHandler}>
            <div className="asset-info">
                <div className="title">
                    <div className={`logo ${shortName}-logo`}></div>
                    <h1>{displayName}</h1>
                </div>
                <div className="details">
                    <h2 className="asset-price">${textUtils.numberWithCommas(prices[prices.length - 1])}</h2>
                </div>
            </div>
            <div className="details">
                <canvas name={shortName} className={`${shortName}Chart`} ref={chartContainer} />
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.coinData !== nextProps.coinData;
});

export default CoinBox;