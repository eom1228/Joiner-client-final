import React, { useState, useReducer, useContext, useEffect } from 'react';
import { useGroupContext } from '../contexts/GroupContext';
import IsMemberModal from '../components/modals/memberModalBtn';
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
const StyledBtnWrapper = styled.div`
  padding-top: 20px;
`;
const StyledGroupInfoWrapper = styled.div`
  padding-top: 20px;
`;

const GroupDetailsContainer = () => {
  //   const [isToggleOn, setIsToggleOn] = useState(false);
  const { groupCurrentState } = useGroupContext();
  const { group } = groupCurrentState;
  const { information, groupUser, chat } = group;

  //   const handleClick = e => {
  //     e.preventDefault();
  //     setIsToggleOn({ isToggleOn: !isToggleOn });
  //   };

  return (
    <div>
      <StyledBtnWrapper>
        <IsMemberModal>회원</IsMemberModal>
        <StyledButton>채팅</StyledButton>
      </StyledBtnWrapper>
      <StyledGroupInfoWrapper>{information}</StyledGroupInfoWrapper>
    </div>
  );
};

export default GroupDetailsContainer;
