import React, { useEffect } from 'react';
// import Footer from './footer';
// import NavBar from './navBar';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
import UserIcon from './userIcon';
import UserInfo from './userInfo';
axios.defaults.withCredentials = true;

const UserIconInfoContainer = () => {
  const { state, dispatch } = useUserContext();
  const { user } = state;
  const { userName, email, location, group, event } = user;

  return (
    <>
      <div className="userInfoBox">
        <UserIcon />
        <UserInfo />
      </div>
    </>
  );
};

export default UserIconInfoContainer;
