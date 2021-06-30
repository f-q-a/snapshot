import React, { useState } from 'react';
import * as albumActions from '../../store/albums';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function CreateAlbumPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(albumActions.createAlbum({ user_id: sessionUser.id, title }))
        .then(() => {
            setTitle("");
          })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }
    return (
        <div>
            <h1>Create A New Album</h1>

            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Enter Album Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Album</button>
            </form>
        </div>
    );
}

export default CreateAlbumPage;
