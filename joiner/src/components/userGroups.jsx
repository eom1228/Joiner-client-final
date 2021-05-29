import React, { useEffect, useState } from 'react';
// import Footer from './footer';
// import NavBar from './navBar';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
// import Data from '../dummyData/groupDummy';

axios.defaults.withCredentials = true;

const UserGroups = () => {
  // const [userGroupEvents, setUserGroupEvents] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const { state, dispatch } = useUserContext();
  // const [groupState, setGroupState] = useState(groups)
  const { user, token } = state;
  const { groups } = user;
  // setGroupState(Data.groupsData);
  useEffect(() => {
    // Data.groupsData.map(el => console.log(el.events[0]));
    dispatch({ type: 'GET_USERINFO' });
    const getUserInfo = async () => {
      let response = await axios.get('/user/userInfo', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        crossDomain: true,
      });
      if (response.status === 200) {
        dispatch({ type: 'GET_SUCCESS', payload: response.data });
      }
      if (response.status === 400) {
        setErrorMessage('잘못된 요청입니다');
      }
      if (response.status === 405) {
        setErrorMessage('유저를 찾을 수 없습니다');
      }
      getUserInfo(dispatch);
    };
  }, []);

  return (
    <div>
      <ul>
        {groups.map(group => {
          return (
            <>
              <li key={group.id}>{group.groupName}</li>
              <li key={group.events.id}>{group.events.eventName}</li>
            </>
          );
        })}
      </ul>
    </div>
  );
};
export default UserGroups;

/* <div className="userGroups">
        <ul>
        {groups.map((el, id) => {
            el = <li key={id}>{group}</li>
        })}
       </ul>
      <button>회원 탈퇴</button>
    </> */
