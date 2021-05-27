import React, { useEffect } from 'react';
// import Footer from './footer';
// import NavBar from './navBar';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';

axios.defaults.withCredentials = true;

const UserGroups = () => {
  // const [userGroupEvents, setUserGroupEvents] = useState([])
  const { state } = useUserContext();

  const { user } = state;
  const { groups } = user;

  return (
    <ul>
      {groups[0].map((group, id, idx) => {
        group = (
          <div>
            <li key={id}>{group}</li>
            <li key={idx}>{group[0].idx}</li>
          </div>
        );
      })}
    </ul>
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
