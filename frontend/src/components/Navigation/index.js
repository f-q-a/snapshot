import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const albums = useSelector(state => state.albums);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/albums/new" exact>Create New Album</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className='flex-container'>
      <div className='flex-item'>
        <NavLink exact to="/">Home</NavLink>
      </div>
      <div className='flex-item'>
        <NavLink to='/albums/'>View Albums</NavLink>
      </div>
        {isLoaded && sessionLinks}
    </nav>
  );
}

export default Navigation;
