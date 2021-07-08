import './SelectSource.scss';

const SelectSource = ({ source, sources, onChange }) => {

    return (
        <div className="dropdown">
            <select onChange={onChange} value={source}>
                {sources.map(s => (
                    <option key={s.id} value={s.name}>{s.fullName}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectSource;