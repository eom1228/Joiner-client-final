import React, { useEffect, useState } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { useUserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

const CreateEventModal = ({ isOpen, close, event }) => {
  const [inputs, setInputs] = useState({
    title: '',
    information: '',
    date: '',
    location: '',
    limit: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
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
      try {
        let res = await axios.post('/main/groupPage/createEvent', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            group_id: group.id,
            title: inputs.title,
            information: inputs.information,
            limit: inputs.limit, // 확인!!!
          },
          withCredentials: true,
          crossDomain: true,
        });
        if (res.status === 200) {
          setStatusMessage(res.data);
        }
      } catch (e) {
        setStatusMessage(e);
      }
    };
    createGroupEvent();
  }, []);

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
      <form>
        <p>
          <input
            placeholder="이벤트명"
            value={inputs.title}
            id="eventTitle"
            onChange={handleChange}
          />
        </p>

        <p>
          <input
            placeholder="활동분야"
            value={inputs.information}
            id="eventContent"
            onChange={handleChange}
          />
        </p>

        <input type="date"></input>

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

        <button type="submit" onClick={handleSubmit}>
          생성
        </button>
        <button onClick={close}>취소</button>
      </form>
    </>
  ) : null;
};

export default withRouter(CreateEventModal);
