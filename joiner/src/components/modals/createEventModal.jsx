import React, { useEffect, useState } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { useUserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

const CreateEventModal = ({ isOpen, close }) => {
  const [inputs, setInputs] = useState({
    eventTitle: '',
    activityContent: '',
    date: '',
    location: '',
    limit: '',
  });
  const [modalStatus, setModalStatus] = useState({
    // 수정완료 확인 누를 시 모달창 닫아주기 위함
    close: '',
  });

  const { state } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();

  const { token } = state;
  const { group } = groupCurrentState;
  const { events } = group;

  useEffect(() => {
    const createGroupEvent = async () => {
      let response = await axios.post('/main/groupPage/createEvent', {
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
      groupDispatch({ type: 'CREATE_GROUPEVENT', payload: response.inputs });
    };
    createGroupEvent(groupDispatch);
  }, [inputs]);

  //   useEffect(() => {
  //     // getGroup에서 dep array group.events로 하면 상관 없을듯??
  //     if (createGroupEvent(groupDispatch)) {
  //       const getNewGroupEvent = async () => {
  //         let response = await axios.get('main/groupPage/newEvent', {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             'Content-Type': 'application/json',
  //           },
  //           data: {
  //             data,
  //           },
  //           withCredentials: true,
  //           crossDomain: true,
  //         });
  //         groupDispatch({ type: 'GET_CREATEDEVENT', payload: response.data });
  //       };
  //       getNewGroupEvent(groupDispatch);
  //     }
  //   }, [data]);

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('생성 완료!');
    setModalStatus(close);
  };

  return isOpen ? (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            placeholder="이벤트명"
            value={inputs.eventTitle}
            id="eventTitle"
            onChange={handleChange}
            styled="black"
          />
        </p>

        <p>
          <input
            placeholder="활동분야"
            value={inputs.activityContent}
            id="eventContent"
            onChange={handleChange}
          />
        </p>

        <p>
          <input
            placeholder="날짜 및 시간"
            value={inputs.date}
            id="eventDate"
            onChange={handleChange}
          />
        </p>
        <p>
          <input
            placeholder="장소"
            value={inputs.location} // map api 넣어야함
            id="eventLocation"
            onChange={handleChange}
          />
        </p>
        <p>
          <input
            placeholder="인원 제한수"
            value={inputs.limit}
            id="eventLimit"
            onChange={handleChange}
          />
        </p>

        <button type="submit">생성</button>
        <button onClick={close}>취소</button>
      </form>
    </>
  ) : null;
};

export default withRouter(CreateEventModal);
