import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, ReservationsList } from '../../';
import { timeUtils } from '../../../utils';
import './ReservationsPanel.scss';

const ReservationsPanel = ({ toggleModalHandler, reservationsList }) => {

    return (
        <div className="reservations-panel">
            <div className="reservations-header">
                <div className="date-title">
                    {timeUtils.getDisplayDate()}
                </div>
                <div className="add-reservations-button">
                    <Button
                        label="Add Reservation"
                        icon={faPlus}
                        onClickHandler={toggleModalHandler}
                    />
                </div>
            </div>
            {reservationsList.length > 0 &&
                <ReservationsList
                    reservationsList={reservationsList}
                />
            }
        </div>
    );
};

export default ReservationsPanel;