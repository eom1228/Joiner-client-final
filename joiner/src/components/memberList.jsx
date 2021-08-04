import React, { useState, useEffect } from 'react';
import { useGroupContext } from '../contexts/GroupContext';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/memberList.scss';

const MemberList = () => {
  const [userInputs, setUserInputs] = useState({
    userName: '',
    email: '',
    id: '',
  });
  const [nameFilter, setNameFilter] = useState(false);

  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group, mapping_id } = groupCurrentState;
  const { groupUser } = group;

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await axios.get(
          'https://localhost:4000/group/groupMember',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              group_id: mapping_id,
            },
            withCredentials: true,
            crossDomain: true,
          },
        );
        groupDispatch({
          type: 'GET_GROUPMEMBERS',
          groupUser: res.data.groupUser,
        });
        console.log(res);
      } catch (err) {
        groupDispatch({ type: 'GET_ERROR', error: err });
      }
    };
    getMembers();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInputs({ ...userInputs, [name]: value });
  };

  const searchFilter = () => {
    setNameFilter(true);
  };

  return (
    <>
      <div className="membersModal">
        <div className="groupMembersModal">
          <div className="membersContainer">
            <div className="memberInterface">
              <span id="members">회원</span>

              <button id="chat">그룹챗</button>
            </div>
            <div className="searchInterface">
              <input
                value={userInputs.userName}
                name="userName"
                className="searchbox"
                type="text"
                placeholder="이름을 검색하세요"
                onChange={handleChange}
                style={{ marginTop: '20px', width: '80%' }}
              />
              <button id="searchBtn" onClick={searchFilter}>
                검색
              </button>
            </div>

            <div className="memberList">
              <ul
                className="searchResults"
                style={{ justifySelf: 'flex-start' }}
              >
                {groupUser
                  .filter(member => {
                    if (member.userName.includes(userInputs.userName)) {
                      return member;
                    }
                  })
                  .map(filteredMember => {
                    return (
                      <li style={{ marginTop: '30px' }}>
                        <div style={{ fontSize: '22px' }}>
                          {filteredMember.userName}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(MemberList);
