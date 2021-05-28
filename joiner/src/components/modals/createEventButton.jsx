import React, { useState } from 'react';
import CreateEventModal from './createEventModal';

const CreateEventButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>이벤트 생성</button>
      <CreateEventModal isOpen={isOpen} close={closeModal} />
    </>
  );
};

export default CreateEventButton;
