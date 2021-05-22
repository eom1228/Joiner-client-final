import React, { useState } from 'react';
import LoginModal from '../modals/loginModal';

const IsLoginModal = () => {
  const [isModal, setIsModal] = useState(false);

  const OpenModal = () => {
    setIsModal(true);
  };

  const CloseModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <button onClick={OpenModal}>로그인</button>
      <LoginModal isOpen={isModal} close={CloseModal} />
    </>
  );
};

export default IsLoginModal;
