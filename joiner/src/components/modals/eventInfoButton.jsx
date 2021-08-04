import React, { useState } from 'react';
import EventInfoModal from './eventInfoModal';
import styled from 'styled-components';

const StyledEventButton = styled.button`
font-size: 23px;
  font-weight: 400;
  color: white;
  height: 35px;
  width: 80px;
  text-decoration: none;
  background-color: #34314c;
  transition: all 0.5s ease-in-out;
  border-color: transparent;
  list-style: none; 
  border-radius: 0.5rem;
  &:hover {

    color: #aaabd3;
    cursor: pointer;
  `;
const EventInfoButton = ({ event }) => {
  const [isModalOn, setIsModalOn] = useState(false);
  function createGroupModal() {
    setIsModalOn(!isModalOn);
    console.log(isModalOn);
  }
  return (
    <>
      <StyledEventButton onClick={createGroupModal}>
        {event.title}
      </StyledEventButton>
      {isModalOn && (
        <EventInfoModal handleModal={createGroupModal} event={event} />
      )}
    </>
  );
};

export default EventInfoButton;
