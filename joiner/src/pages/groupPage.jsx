import React, { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import GroupImgs from '../components/groupImgs';
import GroupSummary from '../components/groupSummary';
import GroupInfoEventsContainer from '../components/groupInfoEventsContainer';
import axios from 'axios';
import styled from 'styled-components';
axios.defaults.withCredentials = true;

// const PageBody = styled.div`
//   display: flex;
//   padding: 0px 30px;
//   width 100%;
//   height: 100%;
//   align-items: center;
//   background-color: ;
// `;
// const PageBodyTop = styled.div``;

// const PageBodyBottom = styled.div``;
const GroupPage = () => {
  const { state } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group, mapping_id, loading, error } = groupCurrentState;
  // const { host } = group;
  const { user, access_token } = state;

  useEffect(() => {
    const getGroup = async () => {
      groupDispatch({ type: 'GET_DATA' });
      try {
        let res = await axios.post('https://localhost:4000/group/groupPage', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            group_id: mapping_id,
          },
          withCredentials: true,
          crossDomain: true,
        });
        if (res.status === 200) {
          groupDispatch({ type: 'GET_SUCCESS', group: res.data });
          return;
        }
      } catch (e) {
        groupDispatch({ type: 'GET_ERROR', error: e });
      }
    };
    getGroup();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>에러 발생!</div>;
  // if (!group) return null;
  if (!group) return null;
  return (
    <>
      {/* // <PageBody>
    //   <PageBodyTop> */}
      <GroupImgs host={host} />
      <GroupSummary group={group} />
      {/* // </PageBodyTop>
      // <PageBodyBottom> */}
      <GroupInfoEventsContainer />
      {/* //   </PageBodyBottom> */}
      {/* // </PageBody> */}
    </>
  );
};

export default GroupPage;
