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
  flex-grow: 1;
  flex-basis: 35%;
  justify-content: top;
  text-align: center;
  flex-direction: column;
  border: 0.4rem solid #34314c;
  background-color: white;
  border-radius: 1rem;
  padding-top: 30px;
`;
const GroupTitle = styled.h1`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  padding-left: 20px;
  // vertical-align: text-top;
`;

const GroupDetails = styled.div`
  margin-top: 30px;
  font-size: 17px;
  font-family: Roboto, Arial, sans-serif;
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
          <div>{title}</div>
        </GroupTitle>
        <GroupDetails>
          <div>{category}</div>
          {user.id === host ? (
            <div style={{ marginTop: '10px' }}>{user.userName}</div>
          ) : null}
          <div style={{ marginTop: '10px' }}>인원수: {memberCount}명</div>
        </GroupDetails>
      </SummaryContents>
    );
  }
};
export default GroupSummary;
