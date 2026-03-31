/*
  ToDo: Need to add memo, to update only the relevant rows.
*/

import { dataUtils } from '../../utils';
import './ScheduleProcessGridRow.scss';

const ScheduleProcessGridRow = ({ className, slots }) => {
    if (!Array.isArray(slots)) {
        slots = dataUtils.setScheduleProcess(slots);
    }
    return (
        <div className={`flex-table ${className}`}>
            {slots.map((s, i) => (
                <div key={i} className={`flex-row field-${i}`}>{s}</div>
            ))}
        </div>
    );
};

export default ScheduleProcessGridRow;