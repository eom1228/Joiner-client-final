import React, { useEffect, useState } from 'react';
// import Footer from './footer';
// import NavBar from './navBar';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
// import Data from '../dummyData/groupDummy';

axios.defaults.withCredentials = true;

const UserGroups = () => {
  const [groups, setGroups] = useState([]);
  // const [userGroupEvents, setUserGroupEvents] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const { state, dispatch } = useUserContext();
  // const [groupState, setGroupState] = useState(groups)
  // setGroups({ groups: res.data.userGroup });
  const { user, access_token, isLogin } = state;
  // const { groups } = user;

  // setGroupState(Data.groupsData);
  useEffect(() => {
    // const getUserInfo = () => {
    // dispatch({ type: 'GET_USERINFO' });
    (function () {
      console.log('1');
      try {
        console.log('2');
        const res = axios.get('https://localhost:4000/user/userInfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          crossDomain: true,
        });
        console.log('3');
        setGroups(res.data.userGroup);
      } catch (err) {
        console.log('4');
        console.log(err);
      }
    });
    // .then(res => {
    //   console.log('asdasd');
    //   if (res.status === 200) {
    //     setGroups(res.data.userGroup);
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    //   if (res.status === 400) {
    //     dispatch({ type: 'GET_USERFAILED', error: err });
    //   }
    //   if (res.status === 405) {
    //     dispatch({ type: 'GET_USERFAILED', error: err });
    //   }
    // });
    // };
    // getUserInfo(dispatch);
  }, []);

  return (
    <div>
      <ul>
        {groups.map((group, index) => {
          return <li key={index}>{group.title}</li>;
        })}
      </ul>
    </div>
  );
};
export default UserGroups;
