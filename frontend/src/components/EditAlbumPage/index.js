import React, { useEffect, useState } from 'react';
import * as albumActions from '../../store/albums';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

function EditAlbumPage() {


    const { id } = useParams();
    const dispatch = useDispatch();
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        dispatch(albumActions.getAlbums(Number(id)));
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    const currentAlbum = useSelector(state => state.albums);

    const [errors, setErrors] = useState([]);

    if (!sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(albumActions.updateAlbum({ id: Number(id), title: newTitle }))
            .then(() => {
                setNewTitle('');
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }
    if(!currentAlbum){
        return null;
    }
    const { title } = currentAlbum[id]
    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div>
                <label>
                    Update Title
                <input
                        type='text'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Submit Title</button>
        </form>
    );
}

export default EditAlbumPage;
