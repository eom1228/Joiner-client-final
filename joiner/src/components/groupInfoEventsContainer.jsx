import React from 'react';
import GroupDetailsContainer from './groupDetailsContainer';
import GroupEvents from './groupEvents';
import styled from 'styled-components';

const InfoEventsContainer = styled.div`
  display: flex;
  margin: 0 auto;
  text-align: center;
  width: 100%;
`;
const StyledGroupDetails = styled.div`
  flex-basis: 45%;
  border: 0.4rem solid #34314c;
  border-radius: 20px;
`;

const StyledEvents = styled.div`
  display: flex;
  flex-basis: 55%;
  height: 100%;
  border: 0.4rem solid #34314c;
  border-radius: 20px;
  justify-content: center;
`;

const GroupInfoEventsContainer = () => {
  return (
    <InfoEventsContainer>
      <StyledGroupDetails>
        <GroupDetailsContainer />
      </StyledGroupDetails>
      <StyledEvents>
        <GroupEvents />
      </StyledEvents>
    </InfoEventsContainer>
  );
};
export default GroupInfoEventsContainer;
