import { timeUtils } from '../../utils';
import './HistoryGridRow.scss';

const HistoryGridRow = ({ className, type, slots }) => {
    if (slots.length !== 5) {
        return null;
    }
    slots[0] = timeUtils.convertStringToTime(slots[0]);
    return (
        slots && slots.length > 0 &&
        <div className={`flex-table ${className}`}>
            {slots.map((s, i) => (
                <div key={i} className="flex-row">{i === 0 || type === 'head' ? s : `$${s}`}</div>
            ))}
        </div>
    );
};

export default HistoryGridRow;