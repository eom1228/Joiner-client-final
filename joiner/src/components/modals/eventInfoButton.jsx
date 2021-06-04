import React, { useState } from 'react';
import EventInfoModal from './eventInfoModal';

const EventInfoButton = ({ eventTitle }) => {
  const [isModalOn, setIsModalOn] = useState(false);
  function createGroupModal() {
    setIsModalOn(!isModalOn);
    console.log(isModalOn);
  }
  return (
    <>
      <button onClick={createGroupModal}>{eventTitle}이벤트이름</button>
      {isModalOn && <EventInfoModal handleModal={createGroupModal} />}
    </>
  );
};

export default EventInfoButton;
