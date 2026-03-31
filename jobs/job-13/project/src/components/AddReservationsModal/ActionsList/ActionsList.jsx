import { useSelector } from 'react-redux';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TimeSelectPanel, Button } from '../../';
import './ActionsList.scss';

const ActionsList = ({ addReservationsHandler }) => {
    const { modalError } = useSelector(state => state.settings);

    return (
        <>
            <div className="actions-list">
                <TimeSelectPanel />
                <Button
                    label="Save Reservations"
                    icon={faCheck}
                    onClickHandler={addReservationsHandler}
                />
            </div>
            {modalError && <div className="error">
                {modalError}
            </div>}
        </>
    );
};

export default ActionsList;