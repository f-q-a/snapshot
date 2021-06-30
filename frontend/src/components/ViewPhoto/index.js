import React, { useState, useEffect } from 'react';

import { Redirect, useParams, Link } from 'react-router-dom';

import { getPhoto } from '../../store/photos';

import { getComments, deleteComment } from '../../store/comments';

import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers } from '../../store/users';

import {useHistory} from 'react-router-dom';

import './ViewPhoto.css';

function ViewPhoto() {




  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPhoto(id));
    dispatch(getComments(id));
    dispatch(getAllUsers());
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comments);
  const users = useSelector(state => state.users);
  const picture = useSelector( state => state.photos);
  const { id, title } = useParams();
  const photo = useSelector(state => state.photos);
  const history = useHistory();
  const removeComment = (id) => {
    dispatch(deleteComment(id))
    history.push('/');
  }

  const editComment = (e) => {
    e.preventDefault();
    Redirect('/comments/:id/edit');
  }

  let displayPhoto = Object.values(photo);

  // let img;
  // console.log(displayPhoto)
  // img = displayPhoto[0];
  // console.log(img);
  // const {img_url} = {img};

  if(!displayPhoto.length){

    return null;
  }
  return (
    <div>
      <h2>{title}</h2>
      <img src={`${displayPhoto[2]}`} alt='photo' />
      {Object.values(comments).map((comment, index) => (
        <div key={index}>
          <div key={comment.id}>
            {Object.values(users).map((user, index) => {
              if (user && user.id === comment.user_id) {
                if (sessionUser && sessionUser.id === user.id) {
                  return (
                    <div key={index} className='container'>
                      <div key={user.id}>
                        <img className='profile-image' src={`${user['profileImageUrl']}`} alt='photo' />
                      </div>
                      {user.username}
                    </div>
                  );

                } else {
                  return (
                    <div key={index} className='container'>
                      <div key={user.id}>
                        <img className='profile-image' src={`${user['profileImageUrl']}`} alt='photo' />
                      </div>
                      {user.username}
                    </div>
                  );
                }
              }
            })}
          </div>
          {comment.body}
          {(sessionUser && sessionUser.id === comment.user_id) ? (
            <div>
              <button onClick={() => removeComment(comment.id)} className="btn btn-secondary deleteButton">Delete</button>{' '}
              <Link to={`/${displayPhoto[0]}/comments/${comment.id}/edit`} className="button">Edit</Link>{' '}
            </div>
          ) : ''}
        </div>
      ))}
    </div>
  );

}

export default ViewPhoto;
