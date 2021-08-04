import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';

axios.defaults.withCredentials = true;

const UserGroups = () => {
  const { state, dispatch } = useUserContext();
  const { user, access_token, isLogin } = state;
  const { userGroup } = user;

  if (!userGroup) return <div>Loading...</div>;
  return (
    <div className="userGroupBox">
      <div className="memList">
        <h2> 📆 가입된 그룹 📆 </h2>
        <ul>
          {userGroup.map((group, index) => {
            return <li key={index}>{group.title}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
export default UserGroups;
