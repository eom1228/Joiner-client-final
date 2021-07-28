import React, { useState } from 'react';
import SignupModal from '../modals/signUpModal';

const IsSignupModal = () => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <button onClick={openModal}>SIGN UP</button>
      <SignupModal isOpen={isModal} close={closeModal} />
    </>
  );
};

export default IsSignupModal;
