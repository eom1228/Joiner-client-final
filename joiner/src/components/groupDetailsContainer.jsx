import React, { useState, useReducer, useContext, useEffect } from 'react';
import { useGroupContext } from '../contexts/GroupContext';
import IsMemberModal from '../components/modals/memberModalBtn';

const GroupDetailsContainer = () => {
  //   const [isToggleOn, setIsToggleOn] = useState(false);
  const { groupCurrentState } = useGroupContext();
  const { group } = groupCurrentState;
  const { information, members, chat } = group;

  //   const handleClick = e => {
  //     e.preventDefault();
  //     setIsToggleOn({ isToggleOn: !isToggleOn });
  //   };

  return (
    <div>
      <div className="groupFilterBtnWrapper">
        <IsMemberModal>회원</IsMemberModal> // onClick open MembersModal, render
        members
        <button>채팅</button> // onClick open ChatModal, render chat
      </div>
      <div className="groupInfo">{information}</div>
    </div>
  );
};

export default GroupDetailsContainer;
