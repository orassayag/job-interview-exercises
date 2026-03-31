import { useState, useEffect, useCallback } from 'react';
import apiService from '../../services/api.service';
import { dataUtils, textUtils, timeUtils } from '../../utils';
import { ShoutboxForm, ShoutboxComments } from '../';
import './Shoutbox.scss';

const initiateCommentState = { username: '', comment: '' };

const Shoutbox = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentData, setCommentData] = useState(initiateCommentState);

    useEffect(() => {
        const fetchData = async () => {
            const responseData = await apiService.get('comment/getComments?top=100');
            setIsLoading(false);
            if (responseData.error) {
                setError(responseData.error.message);
            }
            setComments(dataUtils.convertCommentData(responseData.data.data) || []);
        };
        fetchData();
    }, []);

    const submitCommentHandler = async (e) => {
        e.preventDefault();
        const comment = {
            username: textUtils.escapeHTML(commentData.username),
            comment: textUtils.escapeHTML(commentData.comment)
        };
        setIsLoading(true);
        const responseData = await apiService.post('comment/create', comment);
        if (responseData.error) {
            setError(responseData.error.message);
        }
        else {
            setComments([{ _id: dataUtils.getId(), created_at: timeUtils.convertStringToTime(new Date()), ...comment }, ...comments]);
        }
        setIsLoading(false);
        setCommentData(initiateCommentState);
    };

    const inputChangehandler = useCallback((e) => {
        setCommentData({
            ...commentData,
            [e.target.name]: e.target.value
        });
    }, [commentData]);

    return (
        <div className="comments">
            {error && <div>{error}</div>}
            {!error &&
                <ShoutboxForm
                    isLoading={isLoading}
                    formData={commentData}
                    submitCommentHandler={submitCommentHandler}
                    inputChangehandler={inputChangehandler}
                />}
            {comments.length > 0 &&
                <ShoutboxComments
                    comments={comments}
                />}
        </div>
    );
};

export default Shoutbox;