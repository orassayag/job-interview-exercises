import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './DevicesGridRow.scss';

const DevicesGridRow = ({ checked, device, checkDeviceHandler }) => {
    const { id, model, isAvailable, isSound, osVersion, locattion, macAddress, imei, imsi } = device;
    const isAvailableDisplay = isAvailable ? 'Available' : 'In Use';

    return (
        <div className={`devices-list-row${checked ? ' checked' : ''}`}>
            <div className="device-row device-row-check">
                <input type="checkbox" name={id} defaultChecked={checked ? true : false}
                    disabled={!isAvailable} onChange={checkDeviceHandler} />
            </div>
            <div className="device-row device-row-model">
                {model}
            </div>
            <div className={`device-row device-row-availability ${isAvailable}`}>
                {isAvailableDisplay}
            </div>
            <div className="device-row device-row-sound">
                <FontAwesomeIcon
                    icon={isSound ? faCheck : faTimes}
                />
            </div>
            <div className="device-row device-row-os-version">
                {osVersion}
            </div>
            <div className="device-row device-row-device-id">
                {id}
            </div>
            <div className="device-row device-row-location">
                {locattion}
            </div>
            <div className="device-row device-row-mac-address">
                {macAddress}
            </div>
            <div className="device-row device-row-imei">
                {imei}
            </div>
            <div className="device-row device-row-imsi">
                {imsi}
            </div>
        </div>
    );
};

export default DevicesGridRow;