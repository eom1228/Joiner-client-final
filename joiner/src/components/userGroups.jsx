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
  const { userGroup } = user;
  const dobby = [
    { title: 'amofamo' },
    { title: 'aasdf' },
    { title: 'ha4' },
    { title: 'ha6' },
    { title: 'ad2' },
    { title: 'a2dasd' },
    { title: 'ahadfg' },
    { title: 'aasdfamo' },
    { title: 'amoha6aamo' },
    { title: 'amha78o' },
    { title: 'amasdfa7mo' },
    { title: 'ahadfg' },
    { title: 'aasdfamo' },
    { title: 'amoha6aamo' },
    { title: 'amha78o' },
  ];

  if (!userGroup) return <div>Loading...</div>;
  return (
    <div className="userGroupBox">
      <div className="memList">
        <h2> 📆 가입된 그룹 📆 </h2>
        <ul>
          {dobby.map((group, index) => {
            return <li key={index}>{group.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
export default UserGroups;
