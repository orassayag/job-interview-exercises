import './ShoutboxComment.scss';

const ShoutboxComment = ({ username, comment, created_at }) => {
    return (
        <div className="comment">
            <h4>{username} says</h4>
            <p className="timestamp">{created_at}</p>
            <p>{comment}</p>
        </div>
    );
};

export default ShoutboxComment;