import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { getPhotos } from '../../store/photos';

import { getAlbums } from '../../store/albums';

import {Link} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

function PhotosPage() {
    const photos = useSelector(state => state.photos);
    const album = useSelector(state => state.albums);
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPhotos(Number(id)));
        dispatch(getAlbums());
    }, [dispatch, id]);
    let title;
    Object.values(album).forEach(el => {
        if(el[`id`] === Number(id)){
            title = el.title;
        }
    })
    let currPhotos = Object.values(photos).filter((photo) => photo.album_id === Number(id));
    let permittedValues = currPhotos.map(value => [value.id, value.img_url]);
    if(!title || !permittedValues){
        return null;
    }
    return (

        <div>
            <h2>{title}</h2>
            {permittedValues.map((val) => {
                return (
                    <Link to={`/photos/${title}/${val[0]}/`}>
                        <div key={val}>
                            <img src={`${val[1]}`} alt='picture'/>
                        </div>
                    </Link>
                );
            })}

        </div>

    );
}

export default PhotosPage;
