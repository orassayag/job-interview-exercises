import { memo } from 'react';
import { ShoutboxComment } from '../';
import './ShoutboxComments.scss';

const compareProps = (prevProps, nextProps) => {
    return prevProps.comments.length === nextProps.comments.length;
};

const ShoutboxComments = memo(({ comments }) => {

    return (
        <div className="comments-list">
            {comments.map(c => (
                <ShoutboxComment
                    key={c._id}
                    username={c.username}
                    comment={c.comment}
                    created_at={c.created_at}
                />
            ))}
        </div>
    );
}, compareProps);

export default ShoutboxComments;