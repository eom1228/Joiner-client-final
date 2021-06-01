import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

const MemberModal = ({ isOpen, close }) => {
  const [inputmembers, setInputMembers] = useState([]);
  const [userInputs, setUserInputs] = useState({ userName: '', id: '' });
  const { state } = useUserContext();
  const { access_token } = state;
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group } = groupCurrentState;
  const { members } = group;

  const clickGroupHandler = () => {
    axios
      .get('https://localhost:4000/group/groupMember', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        data: {
          id: userInputs.id,
          userName: userInputs.userName,
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        console.log(res);
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    setUserInputs({ ...userInputs, [name]: value });
    console.log(userInputs);
  };

  const filterUser = () => {
    const groupMember = members.filter(member => {
      member.userName === userInputs.userName;
    });
    setInputMembers({ members: groupMember });
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
            <button onClick={clickGroupHandler}>검색</button>
            <ul className="list">
              {members.map(member => {
                return (
                  <>
                    <li key={member.id}>{member.userName}</li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default withRouter(MemberModal);
