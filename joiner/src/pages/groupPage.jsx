import React, { useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import GroupImgs from '../components/groupImgs';
import GroupSummary from '../components/groupSummary';
import GroupInfoEventsContainer from '../components/groupInfoEventsContainer';
import axios from 'axios';

import styled from 'styled-components';
// import { withRouter } from 'react-router-dom';

// import Footer from './footer';
// import NavBar from './navBar';
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
  // const state = useUserState();
  // const dispatch = useUserDispatch();

  // const groupState = useGroupState();
  // const groupDispatch = useGroupDispatch();

  const { state } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group, loading, error } = groupCurrentState;
  const { user, token } = state;

  // useEffect(() => {
  //   dispatch({ type: 'GET_LOGIN' });
  //   const getUser = async () => {
  //     let response = await axios.get('/user');
  //     if (response.status === 200) {
  //       dispatch({ type: 'LOGIN_SUCCESS', payload: response.payload });
  //       return;
  //     }
  //     dispatch({ type: 'LOGIN_FAILED', payload: response.errorMessage });
  //   };
  //   if (isLogin) {
  //     getUser(dispatch);
  //   }
  // }, [user]);

  useEffect(() => {
    groupDispatch({ type: 'GET_GROUP' });
    const getGroup = async () => {
      let response = await axios.get('/main/groupPage', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        crossDomain: true,
      });
      if (response.status === 200) {
        groupDispatch({ type: 'GET_SUCCESS', payload: response.data });
        return;
      }
      groupDispatch({ type: 'GET_ERROR', payload: response.error });
    };
    getGroup(groupDispatch);
  }, [group, user.groups, group.events]);

  // if (loading) return <div>?????????..</div>;
  // if (error) return <div>?????? ??????!</div>;

  return (
    <PageBody>
      <PageBodyTop>
        <GroupImgs />
        <GroupSummary group={group} />
      </PageBodyTop>
      <PageBodyBottom>
        <GroupInfoEventsContainer />
      </PageBodyBottom>
    </PageBody>
    // <>
    //   <div className="groupImgSummaryWrapper">
    //     <div className="groupImg">
    //       <h1>?????? ???????????? ??????????????????</h1>
    //     </div>
    //     <div className="groupSummary">
    //       <h1>
    //         groupTitle ??? ul li ???????????? ????????? ????????? ???????????? ??????
    //         ??????????????????
    //       </h1>
    //     </div>
    //   </div>

    //   <div className="groupInfoEventsWrapper">
    //     <div>
    //       <div className="groupFilterBtnWrapper">
    //         <button>??????</button>
    //         <button>??????</button>
    //         <button>??????</button>
    //       </div>
    //       <div className="groupInfo">
    //         <p>????????? ?????? ????????? ??????????????????</p>
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <button>?????? ??????</button>
    //         {/* ?????? ?????? ??? ????????? ??????, ???????????? ?????? ?????? */}
    //         <button>????????? ??????</button>
    //         <button>?????? ??????</button>
    //         {/* <button>??????</button> ?????????????????? ?????????????????? */}
    //       </div>
    //       <div>
    //         <p>?????? ??????????????? ????????? ?????????.</p>
    //         <ul>
    //           <li>?????????</li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default GroupPage;
