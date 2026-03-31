import { useEffect, useCallback, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector, batch } from 'react-redux';
import { devicesSlices, reservationsSlices, settingsSlices } from '../../store/slices';
import { ActionsList, DevicesList, Loader } from '../../components';
import { coreUtils, timeUtils } from '../../utils';
import devices from '../../data/devices';
import './Modal.scss';

const Modal = memo(() => {
    const dispatch = useDispatch();
    const { devicesList } = useSelector(state => state.devices);
    const { checkedDevicesList, selectedTimes } = useSelector(state => state.reservations);
    const { isModalLoader } = useSelector(state => state.settings);
    const devicesActions = devicesSlices.devicesSlice.actions;
    const reservationsActions = reservationsSlices.reservationsSlice.actions;
    const settingsActions = settingsSlices.settingsSlice.actions;
    const onLoadDevices = useCallback(() => {
        dispatch(devicesActions.setDevicesList(devices));
    }, []);
    const onSetReservations = (reservations) => {
        dispatch(reservationsActions.setReservations(reservations));
    };
    const onFinishProcess = () => {
        batch(() => {
            dispatch(settingsActions.toggleField('isModalLoader'));
            dispatch(settingsActions.toggleField('isOpenModal'));
            dispatch(reservationsActions.clearModalData());
        });
    };
    const onSetField = (fieldName, fieldValue) => {
        dispatch(settingsActions.setField({ fieldName: fieldName, fieldValue: fieldValue }));
    };
    const onToggleField = (fieldName) => {
        dispatch(settingsActions.toggleField(fieldName));
    };

    useEffect(() => {
        // Next time the modal opens, no need to fetch devices again.
        if (devicesList && devicesList.length > 0) {
            return;
        }
        // Simulate fetching devices from the server.
        const simulateFetchDevices = async () => {
            try {
                toggleFieldHandler('isModalLoader');
                await coreUtils.simulateAsyncCall();
                onLoadDevices();
            }
            catch (e) { /* Handle error here. Log the error to server + Show message to the user */ }
            finally {
                toggleFieldHandler('isModalLoader');
            }
        };
        simulateFetchDevices();
    }, []);

    const toggleModal = useCallback(() => {
        toggleFieldHandler('isOpenModal');
    }, []);

    const toggleFieldHandler = (fieldName) => {
        onToggleField(fieldName);
    };

    const setError = (message) => {
        onSetField('modalError', message);
    };

    const addReservationsHandler = async () => {
        // Validate devices count.
        setError(null);
        const checkedDeviceIdsList = Object.keys(checkedDevicesList);
        if (checkedDeviceIdsList.length === 0) {
            setError('At least one device is required');
            return;
        }
        const { startHour, startMinute, endHour, endMinute } = selectedTimes;
        console.log('startHour: ' + startHour);
        console.log('endHour: ' + endHour);
        console.log('startMinute: ' + startMinute);
        console.log('endMinute: ' + endMinute);
        // Validate chronological times.
        if (endHour < startHour || (startHour === endHour) && (startMinute === endMinute)) {
            setError('Chronological times are required');
            return;
        }
        // Simulate sending reservations to the server.
        try {
            toggleFieldHandler('isModalLoader');
            await coreUtils.simulateAsyncCall();
            // If we want to save the times as DateTime (if pick other date from the current date).
            // If not, can be save in just simple number. For this task we will use datetime.
            const startDate = timeUtils.getDateFromTimes(startHour, startMinute);
            const endDate = timeUtils.getDateFromTimes(endHour, endMinute);
            onSetReservations(checkedDeviceIdsList.map(id => ({
                id: id,
                // In a real world application we will save only the device id,
                // Here we need also the model to display in the reservations panel.
                model: devicesList.find(d => d.id === id).model,
                startDate: startDate,
                endDate: endDate
            })));
        }
        catch (e) { /* Handle error here. Log the error to server + Show message to the user */ }
        finally {
            onFinishProcess();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-exit">
                    <button onClick={toggleModal} title="Exit">
                        <FontAwesomeIcon
                            icon={faTimes}
                        />
                    </button>
                </div>
                {isModalLoader && <Loader />}
                {!isModalLoader &&
                    <>
                        <DevicesList />
                        <ActionsList
                            addReservationsHandler={addReservationsHandler}
                        />
                    </>
                }
            </div>
        </div>
    );
});

export default Modal;