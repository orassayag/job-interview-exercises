import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './DevicesGridHeader.scss';

const DevicesGridHeader = () => {

    return (
        <div className="devices-list-header">
            <div className="device-label device-label-check">
                <input type="checkbox" disabled="disabled" defaultChecked={false} />
            </div>
            <div className="device-label device-label-model">
                Device Model
            </div>
            <div className="device-label device-label-availability">
                Availability
            </div>
            <div className="device-label device-label-sound">
                <FontAwesomeIcon
                    icon={faVolumeUp}
                />
            </div>
            <div className="device-label device-label-os-version">
                OS version
            </div>
            <div className="device-label device-label-device-id">
                Device Id
            </div>
            <div className="device-label device-label-location">
                Location
            </div>
            <div className="device-label device-label-mac-address">
                MAC Address
            </div>
            <div className="device-label device-label-imei">
                IMEI
            </div>
            <div className="device-label device-label-imsi">
                IMSI
            </div>
        </div>
    );
};

export default DevicesGridHeader;