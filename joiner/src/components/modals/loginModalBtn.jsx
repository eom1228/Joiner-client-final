import React, { useState } from 'react';
import LoginModal from '../modals/loginModal';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledButtonLoginJoin = styled.button`
font-size: 18px;
  font-weight: 600;
  color: white;
  height: 45px;
  width: 80px;
  text-decoration: none;
  background-color: #34314c;
  transition: all 0.5s ease-in-out;
  border-color: transparent;
  border-radius: 1rem;
  &:hover {

    color: #aaabd3;
    cursor: pointer;
  `;

const IsLoginModal = ({ location }) => {
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <StyledButtonLoginJoin onClick={openModal}>LOG IN</StyledButtonLoginJoin>

      {/* {location.pathname === '/groupPage' ||
      location.pathname === '/GroupPage' ? (
        <StyledButtonLoginJoin
          style={{ marginTop: '20px' }}
          onClick={openModal}
        >
          그룹 가입
        </StyledButtonLoginJoin>
      ) : (
        <button onClick={openModal}>LOG IN</button>
      )} */}
      <LoginModal isOpen={isModal} close={closeModal} />
    </>
  );
};

export default withRouter(IsLoginModal);
