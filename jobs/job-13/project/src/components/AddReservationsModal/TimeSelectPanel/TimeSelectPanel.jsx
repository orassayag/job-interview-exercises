import { useDispatch, useSelector } from 'react-redux';
import { reservationsSlices } from '../../../store/slices';
import SelectTime from '../SelectTime/SelectTime';
import './TimeSelectPanel.scss';

const TimeSelectPanel = () => {
    const dispatch = useDispatch();
    const { timeItems } = useSelector(state => state.settings);
    const { selectedTimes } = useSelector(state => state.reservations);
    const timeItemsDisplay = timeItems.map((t, i) => (<option key={i} value={t.display}>{t.display}</option>));
    const reservationsActions = reservationsSlices.reservationsSlice.actions;
    const onSetSelectedTimes = (name, value) => {
        dispatch(reservationsActions.setSelectedTimes({ name: name, value: value }));
    };

    const changeTimeHandler = (e) => {
        onSetSelectedTimes(e.target.name, e.target.value);
    };

    return (
        <div className="time-picker-container">
            <SelectTime
                name="start"
                label="Start"
                timeItems={timeItemsDisplay}
                hour={selectedTimes.startHour}
                minute={selectedTimes.startMinute}
                onChangeTimeHandler={changeTimeHandler}
            />
            <SelectTime
                name="end"
                label="End"
                timeItems={timeItemsDisplay}
                hour={selectedTimes.endHour}
                minute={selectedTimes.endMinute}
                onChangeTimeHandler={changeTimeHandler}
            />
        </div>
    );
};

export default TimeSelectPanel;