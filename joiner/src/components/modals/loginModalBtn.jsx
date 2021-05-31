import React, { useState } from 'react';
import LoginModal from '../modals/loginModal';

const IsLoginModal = () => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <button onClick={openModal}>LOG IN</button>
      <LoginModal isOpen={isModal} close={closeModal} />
    </>
  );
};

export default IsLoginModal;
