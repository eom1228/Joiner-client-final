import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import GroupEvents from '../../components/groupEvents';
import '../../styles/eventInfoModal.scss';
axios.defaults.withCredentials = true;

const EventInfoModal = props => {
  const [eventInputs, setEventInputs] = useState({
    eventTitle: '',
    date: '',
    attendants: '',
    eventInfo: '',
  });

  function 받아오기() {
    console.log('받아와쪄요');
    return;
  }

  function 보내기() {
    console.log('보냈어요');
    return;
  }

  useEffect(() => {
    받아오기();
    return () => {
      console.log('없앴어요');
    };
  }, []);

  return (
    <div className="modal" onClick={props.handleModal}>
      <div
        className="eventInfoModal"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="contentContainer">
          <p>이벤트명</p>
          <p>날짜/시간</p>
          <p>참석인원</p>
          <p>활동내용</p>
          <div className="eventLocation">
            <p>map</p>
          </div>
          <button type="submit" onClick={보내기}>
            참석
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EventInfoModal);
