import { useDispatch, useSelector } from 'react-redux';
import { reservationsSlices } from '../../../store/slices';
import { DevicesGridHeader, DevicesGridRow } from '../../';
import './DevicesList.scss';

const DevicesList = () => {
    const dispatch = useDispatch();
    const { devicesList } = useSelector(state => state.devices);
    const { checkedDevicesList } = useSelector(state => state.reservations);
    const reservationsActions = reservationsSlices.reservationsSlice.actions;
    const onCheckedDevicesList = (deviceId, isChecked) => {
        dispatch(reservationsActions.setCheckedDevice({ deviceId: deviceId, isChecked: isChecked }));
    };

    const checkDeviceHandler = (e) => {
        onCheckedDevicesList(e.target.name, e.target.checked);
    };

    return (
        <div className="devices-list-container">
            <DevicesGridHeader />
            <div className="devices-list">
                {devicesList.map(device => (
                    <DevicesGridRow
                        key={device.id}
                        checked={checkedDevicesList[device.id]}
                        device={device}
                        checkDeviceHandler={checkDeviceHandler}
                    />
                ))}
            </div>
        </div>
    );
};

export default DevicesList;