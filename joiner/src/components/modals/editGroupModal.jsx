import React, { useEffect, useState } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { useUserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import '../../styles/editGroupModal.scss';

axios.defaults.withCredentials = true;

const EditGroupModal = ({ isOpen, handleModal, close }) => {
  const [inputs, setInputs] = useState({
    group_id: '',
    title: '',
    information: '',
    groupIntroduce: '',
  });

  // const [modalStatus, setModalStatus] = useState({
  //   // 수정완료 확인 누를 시 모달창 닫아주기 위함
  //   close: '',
  // });

  const { state } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();
  //   const { groupName, category, information } = groupCurrentState;
  const { access_token } = state;
  const { group } = groupCurrentState;
  const { title, category, groupIntroduce } = group;
  const [responseMessage, setResponseMessage] = useState('');

  const handleClick = e => {
    console.log('clicked');
    axios
      .post('https://localhost:4000/main/groupInfo/updateGroup', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        data: {
          group_id: group.id,
          title: inputs.title,
          information: inputs.information,
          groupIntroduce: inputs.groupIntroduce,
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        console.log(res);
      }) // 서버랑 확인
      .catch(e => {
        console.log(e);
      });
  };
  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
    console.log(inputs);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // alert('수정 완료!');
    // setModalStatus(close);
  };
  useEffect(() => {
    console.log(group);
    setInputs({ ...inputs, group_id: group.id });
    return () => {};
  }, [isOpen]);
  return (
    <div className="editGroupModal" onClick={handleModal}>
      <div
        className="editModal"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="editContentContainer">
          <input
            placeholder="그룹명"
            value={inputs.title}
            id="title"
            onChange={handleChange}
          />

          <input
            placeholder="활동분야"
            value={inputs.information}
            id="information"
            onChange={handleChange}
          />

          <textarea
            placeholder="그룹소개 글"
            value={inputs.groupIntroduce}
            id="groupIntroduce"
            onChange={handleChange}
            type="text"
          />

          <button type="submit" onClick={handleClick}>
            수정 완료!
          </button>
          <button onClick={close}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EditGroupModal);
