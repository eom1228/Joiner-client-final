import React from 'react';
import UserIconInfoContainer from '../components/userIconInfoContainer';
import UserGroups from '../components/userGroups';
import '../styles/mypage.scss';
const MyPage = () => {



  return (
    <div className="myPageContainer">
      <UserIconInfoContainer />
      <UserGroups />
    </div>
  );
};

export default MyPage;
