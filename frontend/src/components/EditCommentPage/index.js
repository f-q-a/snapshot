import React, { useEffect, useState } from 'react';
import * as commentActions from '../../store/comments';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';


function EditCommentPage() {


    const { photoId, commentId } = useParams();
    const dispatch = useDispatch();
    const [newBody, setNewBody] = useState('');

    useEffect(() => {
        dispatch(commentActions.getComments(Number(photoId)));
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    const currentComment = useSelector(state => state.comments);

    const [errors, setErrors] = useState([]);

    if (!sessionUser) return (
        <Redirect to="/" />
    );
    console.log();

    console.log(photoId, commentId);
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(commentActions.updateComment({ id: Number(commentId), body: newBody }))
            .then(() => {
                setNewBody('');
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }
    if(!currentComment){
        return null;
    }
    const { body } = currentComment[commentId]
    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div>
                <label>
                    Update Comment
                <textarea
                        defaultValue={body}
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Submit Edit</button>
        </form>
    );
}

export default EditCommentPage;
