import { useState, useEffect, useCallback } from 'react';
import { ScheduleProcessGridRow, Header } from '../../components';
import useSocket from '../../hooks/useSocket';
import apiService from '../../services/api.service';
import './App.scss';

const App = () => {
    const [scheduleProcessesData, setScheduleProcessesData] = useState([]);
    const { socketData, error } = useSocket();

    /*
        ToDo: Add an option to send dynamic timestamp to the server.
    */

    const onGenerateClickHandler = useCallback(async () => {
        await apiService.get('schedule/create');
    }, []);

    useEffect(() => {
        if (!socketData) {
            return;
        }
        const updatedScheduleProcessesData = [...scheduleProcessesData];
        const index = updatedScheduleProcessesData.findIndex(r => r.id === socketData.id);
        if (index > -1) {
            updatedScheduleProcessesData[index] = socketData;
        }
        else {
            updatedScheduleProcessesData.push(socketData);
        }
        setScheduleProcessesData(updatedScheduleProcessesData);
    }, [socketData]);

    /*
        In the real world you will probably want to fetch static data to the client
        in order to handle repeated data, such as timezoneCode. For simplicity I'll
        use static data.
    */

    return (
        <div className="emails-container">
            <Header
                onGenerateClick={onGenerateClickHandler}
            />
            {error && <div className="error">{error}</div>}
            {!error &&
                <>
                    <ScheduleProcessGridRow
                        className="header header"
                        slots={['Timestamp', 'Count', 'Body Id', 'Timezone', 'Days', 'Time', 'Success', 'Failed', 'Left']}
                    />
                    {scheduleProcessesData.length > 0 && scheduleProcessesData.map(e => (
                        <ScheduleProcessGridRow
                            key={e.id}
                            className="row"
                            slots={e}
                        />
                    ))}
                </>}
        </div>
    );
};

export default App;