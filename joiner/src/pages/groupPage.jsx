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

  // if (loading) return <div>로딩중..</div>;
  // if (error) return <div>에러 발생!</div>;

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
    //       <h1>그룹 이미지가 들어갈꺼에요</h1>
    //     </div>
    //     <div className="groupSummary">
    //       <h1>
    //         groupTitle 등 ul li 카테고리 호스트 멤버수 로케이션 등이
    //         들어갈꺼에요
    //       </h1>
    //     </div>
    //   </div>

    //   <div className="groupInfoEventsWrapper">
    //     <div>
    //       <div className="groupFilterBtnWrapper">
    //         <button>정보</button>
    //         <button>회원</button>
    //         <button>채팅</button>
    //       </div>
    //       <div className="groupInfo">
    //         <p>그룹에 대한 정보가 들어갈꺼에요</p>
    //       </div>
    //     </div>
    //     <div>
    //       <div>
    //         <button>그룹 가입</button>
    //         {/* 그룹 가입 시 이벤트 생성, 그룹탈퇴 버튼 추가 */}
    //         <button>이벤트 생성</button>
    //         <button>그룹 탈퇴</button>
    //         {/* <button>수정</button> 그룹장일경우 수정버튼추가 */}
    //       </div>
    //       <div>
    //         <p>그룹 이벤트들이 들어갈 거에요.</p>
    //         <ul>
    //           <li>이벤트</li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default GroupPage;
