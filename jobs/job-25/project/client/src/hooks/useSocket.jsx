import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import config from '../config/config';

const NEW_COINS_EVENT = 'coins';

const useSocket = () => {
    const [coinsData, setCoins] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(config.baseUri);
        socketRef.current.on(NEW_COINS_EVENT, (incomingCoinsData) => {
            setCoins((coinsData) => [...coinsData, ...incomingCoinsData]);
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, []);
    return coinsData;
};

export default useSocket;