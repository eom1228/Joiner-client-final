import React, { useState } from 'react';
import EditGroupModal from './editGroupModal';

const EditGroupButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={openModal}>그룹정보 수정</button>
      <EditGroupModal isOpen={isOpen} close={closeModal} />
    </>
  );
};

export default EditGroupButton;
