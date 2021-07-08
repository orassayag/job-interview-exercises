import { timeUtils } from '../../../utils';
import './SelectTime.scss';

const SelectTime = ({ name, label, timeItems, hour, minute, onChangeTimeHandler }) => {

    return (
        <>
            {label} time:
            <div className="select">
                <select name={name} defaultValue={timeUtils.convertToTime(hour, minute)} onChange={onChangeTimeHandler}>
                    {timeItems}
                </select>
            </div>
        </>
    );
};

export default SelectTime;