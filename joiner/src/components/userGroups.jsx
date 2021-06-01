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
<<<<<<< HEAD
  const { user, token, isLogin } = state;
=======
  const { user, access_token, isLogin } = state;
>>>>>>> 876ede1bf81be69145fd6dd028c582499f4acfb2
  const { groups } = user;
  // setGroupState(Data.groupsData);
  useEffect(() => {
    // Data.groupsData.map(el => console.log(el.events[0]));

    dispatch({ type: 'GET_USERINFO' });
    const getUserInfo = async () => {
<<<<<<< HEAD
      if (isLogin) {
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
          dispatch({ type: 'GET_USERFAILED', payload: response.error });
        }
        if (response.status === 405) {
          dispatch({ type: 'GET_USERFAILED', payload: response.error });
        }
        getUserInfo(dispatch);
      }
=======
      let response = await axios.get('/user/userInfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        crossDomain: true,
      });
      if (response.status === 200) {
        dispatch({ type: 'GET_SUCCESS', payload: response.data });
      }
      if (response.status === 400) {
        dispatch({ type: 'GET_USERFAILED', payload: response.error });
      }
      if (response.status === 405) {
        dispatch({ type: 'GET_USERFAILED', payload: response.error });
      }

      getUserInfo(dispatch);
>>>>>>> 876ede1bf81be69145fd6dd028c582499f4acfb2
    };
  }, [access_token]);

  return (
    <div className="userGroupBox">
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
