import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import LoginForm from './LoginForm';
import * as sessionActions from '../../store/session';
import {useDispatch}  from 'react-redux';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const demoLogIn = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}));
    setShowModal(true);
  }
  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      <button onClick={(e)=> demoLogIn(e)}>Log In (Demo)</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
