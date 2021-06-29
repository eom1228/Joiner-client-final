import React, { useState } from 'react';
import EditGroupModal from './editGroupModal';
import styled from 'styled-components';

const StyledButton = styled.button`
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
  width: 140px;
  &:hover {

    color: #aaabd3;
    cursor: pointer;
  `;
const EditGroupButton = () => {
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
      <StyledButton onClick={createGroupModal}>그룹정보 수정</StyledButton>
      {isModalOn && (
        <EditGroupModal
          isOpen={isModalOn}
          handleModal={createGroupModal}
          close={closeModal}
        />
      )}
    </>
  );
};

export default EditGroupButton;
