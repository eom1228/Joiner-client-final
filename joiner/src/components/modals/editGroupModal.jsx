import React, { useEffect, useState } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { useUserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

const EditGroupModal = ({ isOpen, close }) => {
  const [inputs, setInputs] = useState({
    groupName: '',
    category: '',
    groupIntroduce: '',
  });

  const [modalStatus, setModalStatus] = useState({
    // 수정완료 확인 누를 시 모달창 닫아주기 위함
    close: '',
  });

  const { state } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();
  //   const { groupName, category, information } = groupCurrentState;
  const { access_token } = state;
  const { groupName, category, groupIntroduce } = groupCurrentState;
  const [responseMessage, setResponseMessage] = useState('');

  const handleClick = e => {
    async () => {
      let res = await axios
        .put('/updateGroup', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          data: {
            inputs: inputs,
          },
          withCredentials: true,
          crossDomain: true,
        })
        .then(res => setResponseMessage(res.data)) // 서버랑 확인
        .catch(e => setResponseMessage(e));
    };
  };
  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
    groupDispatch({
      type: 'EDIT_GROUP',
      group: {
        groupName: inputs.groupName,
        category: inputs.category,
        groupIntroduce: inputs.groupIntroduce,
      },
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleClick();
    alert('수정 완료!');
    setModalStatus(close);
  };

  return isOpen ? (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            placeholder={groupName}
            value={inputs.groupName}
            id="groupName"
            onChange={handleChange}
          />
        </p>

        <p>
          <input
            placeholder={category}
            value={inputs.category}
            id="category"
            onChange={handleChange}
          />
        </p>

        <p>
          <input
            placeholder={groupIntroduce}
            value={inputs.groupIntroduce}
            id="groupIntroduce"
            onChange={handleChange}
          />
        </p>

        <button type="submit">수정 완료!</button>
        <button onClick={close}>취소</button>
      </form>
    </>
  ) : null;
};

export default withRouter(EditGroupModal);
