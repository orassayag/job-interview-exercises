import './ReservationDevice.scss';

const ReservationDevice = ({ className, label }) => {

    return (
        <div className={className}>
            {label}
        </div>
    );
};

export default ReservationDevice;