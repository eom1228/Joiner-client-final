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
  const { token } = state;
  const { groupName, category, groupIntroduce } = groupCurrentState;

  useEffect(() => {
    const editGroupInfo = async () => {
      let response = await axios.put('/updateGroup', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          inputs: inputs,
        },
        withCredentials: true,
        crossDomain: true,
      });
      groupDispatch({ type: 'EDIT_GROUP', payload: response.inputs });
    };
    editGroupInfo(groupDispatch);
  }, [inputs.groupName, inputs.category, inputs.groupIntroduce]);

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  //   useEffect(() => {
  //     updateEvent();
  //   }, []);

  const handleSubmit = e => {
    e.preventDefault();
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
            id="groupCategory"
            onChange={handleChange}
          />
        </p>

        <p>
          <input
            placeholder={groupIntroduce}
            value={inputs.groupIntroduce}
            id="groupInfo"
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
