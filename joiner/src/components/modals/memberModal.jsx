import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

const MemberModal = ({ isOpen, close }) => {
  const [inputmembers, setInputMembers] = useState([]);
  const [userInputs, setUserInputs] = useState({ userName: '' });
  const { state } = useUserContext();
  const { access_token } = state;
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group } = groupCurrentState;
  const { members } = group;

  useEffect(() => {
    const getMembers = async () => {
      let response = await axios.get('/groupMember', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        data: {
          inputmembers: inputmembers,
        },
        withCredentials: true,
        crossDomain: true,
      });
      groupDispatch({
        type: 'GET_GROUPMEMBERS',
        payload: response.data.inputmembers,
      });
    };
    getMembers(groupDispatch);
  }, [inputmembers]);

  const handleChange = e => {
    setUserInputs({ userInputs: e.target.value });
  };
  const filterUser = () => {
    const groupMember = members.filter(member => {
      member.userName === userInputs.userName;
    });
    setInputMembers({ members: groupMember });
  };

  const handleSubmit = e => {
    if (e === userInputs) {
      setInputMembers([userInputs]);
      filterUser();
    }
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
              className="searchbox"
              type="text"
              placeholder="이름을 검색하세요"
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>검색</button>
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
