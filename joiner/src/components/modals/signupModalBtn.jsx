import React, { useState } from 'react';
import SignupModal from '../modals/signUpModal';

const IsSignupModal = () => {
  const [isModal, setIsModal] = useState(false);

  const OpenModal = () => {
    setIsModal(true);
  };

  const CloseModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <button onClick={OpenModal}>회원가입</button>
      <SignupModal isOpen={isModal} close={CloseModal} />
    </>
  );
};

export default IsSignupModal;
