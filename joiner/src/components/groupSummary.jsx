import React from 'react';
import { useUserContext } from '../contexts/UserContext';
import styled from 'styled-components';

const SummaryContents = styled.div`
  margin: 0 auto;
  width: 100%;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  border: 0.3rem solid #34314c;
  background-color: white;
  border-radius: 1rem;
`;
const GroupTitle = styled.h1``;

const GroupDetails = styled.div`
  margin-top: 10px;
  font-size: 13px;
`;
const GroupSummary = ({ group }) => {
  const { title, category, host, memberCount } = group;
  const { state } = useUserContext();
  const { user } = state;

  if (!group) {
    return null;
  } else {
    console.log(group);
    return (
      <SummaryContents>
        <GroupTitle>
          <h1>{title}</h1>
        </GroupTitle>
        <GroupDetails>
          <div>{category}</div>
          {user.id === host ? <div>{user.userName}</div> : null}
          <div>{memberCount}</div>
        </GroupDetails>
      </SummaryContents>
    );
  }
};
export default GroupSummary;
