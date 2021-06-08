import React, { useState } from 'react';
import MemberModal from '../../components/modals/memberModal';
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

const IsMemberModal = () => {
  const [isModalOn, setIsModalOn] = useState(false);
  function createGroupModal() {
    setIsModalOn(!isModalOn);
  }
  const closeModal = () => {
    setIsModalOn(!isModalOn);
  };
  return (
    <>
      <StyledButton onClick={createGroupModal}>회원</StyledButton>
      {isModalOn && (
        <MemberModal
          isOpen={isModalOn}
          handleModal={createGroupModal}
          close={closeModal}
        />
      )}
    </>
  );
};

export default IsMemberModal;
