import { memo } from 'react';
import { ReservationSlot, ReservationDevice } from '../../';
import { useSelector } from 'react-redux';
import './ReservationsList.scss';

const compareProps = (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

const ReservationsList = memo(({ reservationsList }) => {
    const { timeItems } = useSelector(state => state.settings);

    const createSlots = (isHead, reservation) => {
        const startHour = (reservation?.startDate.getHours() + (reservation?.startDate.getMinutes() > 0 ? 0.5 : 0)) + 0.5; // Last 0.5 for the padding.
        const endHour = (reservation?.endDate.getHours() === 0 ? 24 /* Handle midnight selection */ : reservation?.endDate.getHours() + (reservation?.endDate.getMinutes() > 0 ? 0.5 : 0));
        return timeItems.map((s, i) => {
            const { value, display } = s;
            const isLong = i % 2 === 0;
            const isLast = i === timeItems.length - 1;
            const isFill = startHour && endHour ? startHour <= value && value <= endHour : false;
            return (
                <ReservationSlot
                    key={i}
                    className={`${isLong ? 'long' : 'short'}${isLast ? ' last' : ''}${isFill ? ' fill' : ''}`}
                    label={isHead && isLong && !isLast ? display : null}
                    name={display}
                />
            );
        });
    };

    return (
        <div className="reservations-list-container">
            <div className="reservations-devices">
                <ReservationDevice
                    className="reservations-devices-head"
                    label="Device / Time"
                />
                {reservationsList.length > 0 && reservationsList.map((r, i) => (
                    <ReservationDevice
                        key={i}
                        className={`reservations-devices-row${i === reservationsList.length - 1 ? ' last' : ''}`}
                        label={r.model}
                    />
                ))}
            </div>
            <div className="reservations-slots">
                <div className="reservations-slots-wrapper">
                    <div className="reservations-slots-head">
                        {createSlots(true)}
                    </div>
                    {reservationsList.length > 0 && reservationsList.map((r, i) => (
                        <div className="reservations-slots-row" key={i}>
                            {createSlots(false, r)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}, compareProps);

export default ReservationsList;