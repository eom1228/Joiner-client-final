import React, { useEffect, useState } from 'react';
import '../../styles/modalgroup.scss';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext.jsx';

const CreateGroupModal = props => {
  const { state, dispatch } = useUserContext();
  const { user, err, access_token } = state;
  const [userInputs, setUserInputs] = useState({
    title: '',
    location: '',
    information: '',
    groupIntroduce: '',
  });
  function handleChange(e) {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
    console.log(userInputs);
  }
  function testzzizzi() {
    console.log(access_token);
    axios
      .post('https://localhost:4000/main/createGroup', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        data: {
          title: userInputs.title,
          information: userInputs.information,
          groupIntroduce: userInputs.groupIntroduce,
          category_id: 1,
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        console.log(res);
      });
  }
  return (
    <div className="modal" onClick={props.handleModal}>
      <div
        className="groupModal"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="contentContainer">
          <input
            type="text"
            name="title"
            placeholder="그룹 이름을 정해주세요"
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="그룹 활동할  주 위치를 정해주세요"
            onChange={handleChange}
          />
          <input
            type="text"
            name="information"
            placeholder="그룹에 대한 정보를 적어주세요"
            onChange={handleChange}
          />
          <input
            type="text"
            name="groupIntroduce"
            placeholder="그룹에 대한 소개를 해주세요"
            onChange={handleChange}
          />

          <button type="submit" onClick={testzzizzi}>
            그룹 생성!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
