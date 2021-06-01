import React, { useState } from 'react';
import MemberModal from '../../components/modals/memberModal';

const IsMemberModal = () => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <button onClick={openModal}>회원</button>
      <MemberModal isOpen={isModal} close={closeModal} />
    </>
  );
};

export default IsMemberModal;
