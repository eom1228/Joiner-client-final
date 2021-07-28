import React, { useState } from 'react';
import CreateEventModal from './createEventModal';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-left: 20px;
  margin-right: 10px;
  display: inline-block;
  margin-top: 4vh;
  font-size: 23px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  background-color: #34314c;
  transition: all 0.5s ease-in-out;
  border-color: transparent;
  border-radius: 1rem;
  height: 50px;
  width: 120px;
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
