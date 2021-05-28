import React, { useState } from 'react';
import EventInfoModal from './eventInfoModal';

const EventInfoButton = ({ eventTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>{eventTitle}</button>
      <EventInfoModal isOpen={isOpen} close={closeModal} />
    </>
  );
};

export default EventInfoButton;
