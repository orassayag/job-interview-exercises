import './ShoutboxForm.scss';

const ShoutboxComments = ({ isLoading, formData, submitCommentHandler, inputChangehandler }) => {

    return (
        <div className="comments-form">
            <form onSubmit={submitCommentHandler}>
                <ul>
                    <li>
                        <input name="username" type="text" placeholder="Name"
                            value={formData.username || ''} onChange={inputChangehandler}
                            required
                        />
                    </li>
                    <li>
                        <textarea name="comment" placeholder="Comment"
                            value={formData.comment || ''} onChange={inputChangehandler}
                            required
                        />
                    </li>
                    <li>
                        <input type="submit" value="Shoutout" disabled={isLoading} />
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default ShoutboxComments;