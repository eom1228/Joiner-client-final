import React, { useState } from 'react';
import EventInfoModal from './eventInfoModal';

const EventInfoButton = ({ event }) => {
  const [isModalOn, setIsModalOn] = useState(false);
  function createGroupModal() {
    setIsModalOn(!isModalOn);
    console.log(isModalOn);
  }
  return (
    <>
      <button onClick={createGroupModal}>{event.title}이벤트이름</button>
      {isModalOn && (
        <EventInfoModal handleModal={createGroupModal} event={event} />
      )}
    </>
  );
};

export default EventInfoButton;

// import React, { useState } from 'react';
// import EventInfoModal from './eventInfoModal';

// const EventInfoButton = ({ event }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={openModal}>{event.title}</button>
//       <EventInfoModal isOpen={isOpen} close={closeModal} event={event} />
//     </div>
//   );
// };

// export default EventInfoButton;
