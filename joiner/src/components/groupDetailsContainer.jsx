import React, { useState, useReducer, useContext, useEffect } from 'react';
import { useGroupContext } from '../contexts/GroupContext';

import styled from 'styled-components';

const StyledGroupInfoWrapper = styled.div`
  padding-top: 20px;
  text-align: center;
  font-size: 22px;
`;

const GroupDetailsContainer = () => {
  //   const [isToggleOn, setIsToggleOn] = useState(false);
  const { groupCurrentState } = useGroupContext();
  const { group } = groupCurrentState;
  const { information, groupUser, chat } = group;

  return (
    <div>
      <StyledGroupInfoWrapper>💡{information}💡</StyledGroupInfoWrapper>
    </div>
  );
};

export default GroupDetailsContainer;
