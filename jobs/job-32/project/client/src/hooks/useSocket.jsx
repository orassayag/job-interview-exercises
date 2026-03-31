import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import config from '../config/config';

const useSocket = () => {
    const [error, setError] = useState(null);
    const [socketData, setSocketData] = useState(null);
    const socketRef = useRef();

    useEffect(() => {
        try {
            socketRef.current = socketIOClient(config.baseUri);
            socketRef.current.on('bulk', (incomingSocketProcessData) => {
                setSocketData(incomingSocketProcessData);
            });
            socketRef.current.on('error', (error) => {
                setError(error);
            });
            return () => {
                socketRef.current.disconnect();
            };
        }
        catch (error) {
            setError(error);
        }
    }, []);
    return { socketData, error };
};

export default useSocket;