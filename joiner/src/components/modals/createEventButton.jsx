import React, { useState } from 'react';
import CreateEventModal from './createEventModal';
import styled from 'styled-components';

const StyledButton = styled.button`
 
  margin-right: 20px;
  display: inline-block;
  margin-top: 4vh;
  margin-right: 20px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  background-color: #34314c;
  transition: all 0.5s ease-in-out;
  border-color: transparent;
  &:hover {

    color: #aaabd3;
    cursor: pointer;
  `;
const CreateEventButton = ({ event }) => {
  const [isModalOn, setIsModalOn] = useState(false);
  function createGroupModal() {
    setIsModalOn(!isModalOn);
    console.log(isModalOn);
  }
  const closeModal = () => {
    setIsModalOn(!isModalOn);
  };

  return (
    <>
      <StyledButton onClick={createGroupModal}>이벤트 생성</StyledButton>
      {isModalOn && (
        <CreateEventModal
          isOpen={isModalOn}
          handleModal={createGroupModal}
          close={closeModal}
          event={event}
        />
      )}
    </>
  );
};

export default CreateEventButton;
