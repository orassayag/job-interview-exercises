import './ReservationSlot.scss';

const ReservationSlot = ({ className, label, name }) => {

    return (
        <div className={`slot-box${className ? ` ${className}` : ''}`} name={name}>
            {label &&
                <div className="label">
                    {label}
                </div>
            }
        </div>
    );
};

export default ReservationSlot;