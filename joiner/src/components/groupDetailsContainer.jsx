import React, { useState, useReducer, useContext, useEffect } from 'react';
import { useGroupContext } from '../contexts/GroupContext';
import MemberModal from '../components/modals/memberList';
import styled from 'styled-components';
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
      <StyledBtnWrapper></StyledBtnWrapper>
      <StyledGroupInfoWrapper>
        {information}그룹정보-------------------------
      </StyledGroupInfoWrapper>
      <MemberModal />
    </div>
  );
};

export default GroupDetailsContainer;
