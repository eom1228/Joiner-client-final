import React from 'react';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
import UserIconInfoContainer from '../components/userIconInfoContainer';
import UserGroups from '../components/userGroups';

axios.defaults.withCredentials = true;

const MyPage = () => {
  const { state } = useUserContext();
  const { user } = state;
  const { isLogin } = user;

  return (
    <>
      {/* {isLogin ? ( */}
      <>
        <UserIconInfoContainer />
        <UserGroups />
      </>
      {/* ) : null} */}
    </>
  );
};

export default MyPage;
