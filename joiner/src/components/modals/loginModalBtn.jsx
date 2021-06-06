import React, { useState } from 'react';
import LoginModal from '../modals/loginModal';
import { withRouter } from 'react-router-dom';

const IsLoginModal = ({ location }) => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      {location.pathname === '/groupPage' ||
      location.pathname === '/GroupPage' ? (
        <button onClick={openModal}>그룹 가입</button>
      ) : (
        <button onClick={openModal}>LOG IN</button>
      )}
      <LoginModal isOpen={isModal} close={closeModal} />
    </>
  );
};

export default withRouter(IsLoginModal);
