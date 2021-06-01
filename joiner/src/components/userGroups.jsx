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
  const { user, access_token, isLogin } = state;
  const { groups } = user;
  // setGroupState(Data.groupsData);
  useEffect(() => {
    // Data.groupsData.map(el => console.log(el.events[0]));

    const getUserInfo = async () => {
      dispatch({ type: 'GET_USERINFO' });
      try {
        let response = await axios.get('/user/userInfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          crossDomain: true,
        });
        if (response.status === 200) {
          dispatch({
            type: 'GET_SUCCESS',
            payload: response.data.data.userinfo,
          });
        }
      } catch (e) {
        if (response.status === 400) {
          dispatch({ type: 'GET_USERFAILED', error: e });
        }
        if (response.status === 405) {
          dispatch({ type: 'GET_USERFAILED', error: e });
        }
      }
    };
    getUserInfo(dispatch);
  }, [access_token]);

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
