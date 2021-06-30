import React, { useState } from 'react';
import * as albumActions from '../../store/albums';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import { NavLink, Route, useParams } from 'react-router-dom';
import PhotosPage from '../PhotosPage/'
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';

function DisplayAlbumPage() {
  const history = useHistory();
  const [userAlbums, setUserAlbums] = useState('');
  const albums = useSelector(state => state.albums);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlbums());
  }, [])
  const deleteAlbum = (e, albumId, albumTitle) => {
    dispatch(albumActions.deleteAlbum(Number(albumId)));
    history.push('/');
  }
  return (<div>
    <ul>
      {Object.values(albums).map((album, index) => {

        return (
          (user && user.id === album.user_id) ? (

            <div>
              <li key={album.title}>

                <NavLink key={album.id} to={`/${album.id}/photos`}>{album.title}</NavLink>
                <button onClick={(e) => deleteAlbum(e, album.id, album.title)} className="btn btn-secondary deleteButton">Delete Album</button>{' '}
                <Link key={index} to={`/albums/${album.id}/edit`} className="button">Edit Album Title</Link>{' '}
                <Link key={user.username} to={`/albums/${album.id}/addPhotos`} className="button">Add Photos</Link>{' '}
              </li>
              </div>
              ) : (
            <div>
          <li key={album.title}>
            <NavLink key={album.id} to={`/${album.id}/photos`}>{album.title}</NavLink>
          </li>
          </div>))


      })}
    </ul>
  </div>);
}

export default DisplayAlbumPage;
