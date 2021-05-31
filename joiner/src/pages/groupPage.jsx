import React, { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import GroupImgs from '../components/groupImgs';
import GroupSummary from '../components/groupSummary';
import GroupInfoEventsContainer from '../components/groupInfoEventsContainer';
import axios from 'axios';
import styled from 'styled-components';

axios.defaults.withCredentials = true;

const PageBody = styled.div`
  display: flex;
  padding: 0px 30px; 
  width 100%;
  height: 100%;
  align-items: center;
  background-color: ;
`;
const PageBodyTop = styled.div``;

const PageBodyBottom = styled.div``;
const GroupPage = () => {
  const { state } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group, loading, error } = groupCurrentState;
  const { host } = group;
  const { user, access_token } = state;

  useEffect(() => {
    const getGroup = async () => {
      groupDispatch({ type: 'GET_GROUP' });
      try {
        let response = await axios.get('/main/groupPage', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          crossDomain: true,
        });
        if (response.status === 200) {
          groupDispatch({ type: 'GET_SUCCESS', payload: response.data });
          return;
        }
      } catch (e) {
        groupDispatch({ type: 'GET_ERROR', error: e });
      }
    };
    getGroup(groupDispatch);
  }, [group, user.groups, group.events]);

  return (
    <PageBody>
      <PageBodyTop>
        <GroupImgs host={host} />
        <GroupSummary group={group} />
      </PageBodyTop>
      <PageBodyBottom>
        <GroupInfoEventsContainer />
      </PageBodyBottom>
    </PageBody>
  );
};

export default GroupPage;
