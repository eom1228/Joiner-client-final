import React from 'react';
import GroupDetailsContainer from './groupDetailsContainer';
import GroupEvents from './groupEvents';
import styled from 'styled-components';

const InfoEventsContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const GroupInfoEventsContainer = () => {
  return (
    <InfoEventsContainer>
      <GroupDetailsContainer />
      <GroupEvents />
    </InfoEventsContainer>
  );
};
export default GroupInfoEventsContainer;
