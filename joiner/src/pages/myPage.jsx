import React from 'react';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';
import UserIconInfoContainer from '../components/userIconInfoContainer';
import UserGroups from '../components/userGroups';
axios.defaults.withCredentials = true;
import '../styles/mypage.scss';
const MyPage = () => {
  const { state } = useUserContext();
  const { user } = state;
  const { isLogin } = user;

  return (
    <div className="myPageContainer">
      {/* {isLogin ? ( */}
      <UserIconInfoContainer />
      <UserGroups />
      {/* ) : null} */}
    </div>
  );
};

export default MyPage;
