import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

const MemberModal = ({ isOpen, close }) => {
  const [userInputs, setUserInputs] = useState({
    userName: '',
    email: '',
    id: '',
  });
  const [nameFilter, setNameFilter] = useState(false);

  const { state } = useUserContext();
  // const { access_token } = state;
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

  // useEffect(() => {
  //   const getMembers = () => {
  //     groupDispatch({ type: 'GET_DATA' })
  //       const res = await axios
  //       .get('https://localhost:4000/group/groupMember', {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //           'Content-Type': 'application/json',
  //         },
  //         withCredentials: true,
  //         crossDomain: true,
  //       })
  //       .then(res => {
  //         groupDispatch({ type: 'GET_GROUPMEMBERS', members: res.data.members })
  //       })
  //       .catch(err => {
  //         groupDispatch({ type: 'GET_ERROR', error: err})
  //       })

  //   };
  //   getMembers();
  // }, [])

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    setUserInputs({ ...userInputs, [name]: value });
    console.log(userInputs);
  };

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
              value={userInputs.email}
              name="userName"
              className="searchbox"
              type="text"
              placeholder="이름을 검색하세요"
              onChange={handleChange}
            />
            <button onClick={searchFilter}>검색</button>
          </div>
          <div className="memberList">
            {nameFilter ? (
              <div className="searchResults">
                {groupUser &&
                  groupUser
                    .filter(member => member.email === userInputs.email)
                    .map(filteredMember => (
                      <div className="userInfo">
                        <div>{filteredMember.userName}</div>
                        <div>{filteredMember.email}</div>
                      </div>
                    ))}
              </div>
            ) : (
              <ul className="list">
                {console.log('test')}
                {groupUser.map(member => {
                  // return (
                  <>
                    <li key={member.id}>{member.userName}</li>
                    <li key={member.id}>{member.email}</li>
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
