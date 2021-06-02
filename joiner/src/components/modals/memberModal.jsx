import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

const MemberModal = ({ isOpen, close }) => {
  const [userInputs, setUserInputs] = useState({ userName: '', id: '' });
  const [nameFilter, setNameFilter] = useState(false);
  const { state } = useUserContext();
  const { access_token } = state;
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group } = groupCurrentState;
  const { members } = group;

  const clickSearch = () => {
    axios
      .get('https://localhost:4000/group/groupMember', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        // data: {
        //   id: userInputs.id,
        //   userName: userInputs.userName,
        // },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        console.log(res);
      });
    searchFilter();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    setUserInputs({ ...userInputs, [name]: value });
    console.log(userInputs);
  };

  // const filterUserFail = () => {
  //   const groupMember = members.filter(member => {
  //     member.userName === userInputs.userName;
  //   });
  //   const { name, value } = e.target;
  //   setUserInputs({ [name]: value})
  //   setInputMembers({ members: groupMember });
  // };
  const searchFilter = () => {
    setNameFilter(true);
    console.log(nameFilter);
  };

  return (
    <>
      {isOpen ? (
        <div className="memberModal">
          <span
            onClick={() => {
              close();
            }}
          >
            {' '}
            &times;{' '}
          </span>
          <div className="member_searchbox">
            <input
              value={userInputs.userName}
              name="userName"
              className="searchbox"
              type="text"
              placeholder="이름을 검색하세요"
              onChange={handleChange}
            />
            <button onClick={clickSearch}>검색</button>
          </div>
          <div className="memberList">
            {nameFilter ? (
              members.filter(member => {
                member.userName === userInputs.userName;
              }) ? (
                <div className="searchResults">
                  {members.filter(member => {
                    <div>{member.userName === userInputs.userName}</div>;
                  })}
                </div>
              ) : (
                <div>존재하지 않는 멤버입니다</div>
              )
            ) : (
              <ul className="list">
                {console.log('test')}
                {members.map(member => {
                  // return (
                  <>
                    <li key={member.id}>{member.userName}</li>
                  </>;
                  // );
                })}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default withRouter(MemberModal);
