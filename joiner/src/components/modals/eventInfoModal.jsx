import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.jsx';

// import GroupEvents from '../../components/groupEvents';
import '../../styles/eventInfoModal.scss';
axios.defaults.withCredentials = true;

const EventInfoModal = ({ event, handleModal }) => {
  const [attendance, setAttendance] = useState(
    false,
    // title: '',
    // date: '',
    // attendants: '',
    // information: '',
  );
  // const [userAttend, setUserAttend] = useState(false);
  // const [cancelAttendance, setCancelAttendance] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { state, dispatch } = useUserContext();
  const { user, access_token } = state;

  // function 받아오기() {
  //   console.log('받아와쪄요');
  //   return;
  // }

  const attendEvent = () => {
    setAttendance(true);
    dispatch({ type: 'ATTEND_EVENT', events: user.events.concat(event) });
  };

  const cancelAttendance = () => {
    setAttendance(false);
    dispatch({
      type: 'CANCEL_EVENT',
      events: user.events.filter(userEvent => userEvent !== event),
    });
  };

  useEffect(() => {
    // return () => {
    //   console.log('없앴어요');
    async () => {
      console.log('보냈어요');
      try {
        let res = axios.post('https:///localhost:4000/event/attendEvent', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          data: {
            event_id: event_id,
          },
          withCredentials: true,
          crossDomain: true,
        });
        if (res.status === 200) {
          setResponseMessage('일정이 잡히셨습니다!');
        }
      } catch (e) {
        console.log(e);
        setErrorMessage(e);
      }
    };
  }, []);

  return (
    <div className="modal" onClick={handleModal}>
      <div
        className="eventInfoModal"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="contentContainer">
          <p>{event.title}</p>
          <p>{event.date}</p>
          <p>{event.attendants}</p>
          <p>{event.information}</p>
          <div className="eventLocation">
            <p>map</p>
          </div>
          {Array.isArray(user.events) &&
          user.events.forEach(userEvent => userEvent !== event) ? (
            <button type="submit" onClick={attendEvent}>
              참석
            </button>
          ) : (
            <button type="submit" onClick={cancelAttendance}>
              참석 취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(EventInfoModal);

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// axios.defaults.withCredentials = true;

// const EventInfoModal = ({ isOpen, close, event }) => {
//   return isOpen ? (
//     <div className="modal">
//       <div
//         className="eventInfoModal"
//         onClick={e => {
//           e.stopPropagation();
//         }}
//       >
//         <div className="contentContainer">
//           <p>{event.title}</p>
//           <p>{event.date}</p>
//           <p>{event.attendants}</p>
//           <p>{event.information}</p>
//         </div>
//         <div className="eventLocation">
//           <p>map</p>
//         </div>
//         <button type="submit">참석</button>
//       </div>
//     </div>
//   ) : null;
// };

// export default EventInfoModal;
