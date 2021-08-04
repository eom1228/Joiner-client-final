import React from 'react';
import UserIcon from './userIcon';
import UserInfo from './userInfo';

const UserIconInfoContainer = () => {

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
