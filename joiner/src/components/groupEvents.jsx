import React, {
  useRef,
  useCallback,
  useState,
  useReducer,
  useContext,
  useEffect,
} from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import EventInfoButton from './modals/eventInfoButton';
import CreateEventButton from './modals/createEventButton';
import axios from 'axios';
import EditGroupButton from './modals/editGroupButton';
import IsLoginModal from './modals/loginModalBtn';
import styled from 'styled-components';
// import LoginModal from ' ';
const StyledButton = styled.button`
 
  margin-right: 20px;
  display: inline-block;
  margin-top: 4vh;
  margin-right: 20px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  height: 50px;
  width: 80px;
  text-decoration: none;
  background-color: #34314c;
  transition: all 0.5s ease-in-out;
  border-color: transparent;
  border-radius: 1rem;
  &:hover {

    color: #aaabd3;
    cursor: pointer;
  `;

const GroupEvents = () => {
  const { state, dispatch } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();

  const { group, mapping_id } = groupCurrentState;
  const { host, groupUser } = group;
  const { access_token, user, isLogin } = state;
  const { groups } = user;
  const [events, setEvents] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    console.log('hihi');

    const getGroupEvents = async () => {
      console.log('뭘로 찍냐구요!!!');
      try {
        let res = await axios.get('https://localhost:4000/event/eventList', {
          headers: {
            // Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          // data: {
          //   event_id: event.id,
          // },
          withCredentials: true,
          crossDomain: true,
        });
        if (res.status === 200) {
          console.log(res.data);
          console.log(events);
          setEvents(res.data);
          console.log(events);
          // return;
        }
      } catch (e) {
        console.log(e);
        setResponseMessage(e);
      }
    };
    console.log(events);
    getGroupEvents();
  }, [group]);

  const leaveGroup = async () => {
    let response = await axios
      .post('https://localhost:4000/group/groupPage/groupSecession', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        data: {
          group_id: group.id,
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        setResponseMessage(res.data);
      })
      .catch(e => setResponseMessage(e));
  };

  const joinGroup = async () => {
    let response = await axios
      .post('https://localhost:4000/group/groupPage/groupJoin', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        data: {
          group_id: group.id,
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        setResponseMessage(res.data);
      })
      .catch(e => setResponseMessage(e));
  };

  const handleLeaveClick = () => {
    leaveGroup();
    window.location.reload();
  };

  const handleJoinClick = () => {
    joinGroup();
    window.location.reload();
  };

  if (!events) return null;
  if (!groupUser) return <div>Loading!!!</div>;

  return isLogin ? (
    <>
      <div>
        {console.log(groupUser)}
        {user.id == host ||
        user.userName == groupUser.map(member => member.userName) ? (
          <div>
            <CreateEventButton />

            <StyledButton onClick={handleLeaveClick}>그룹 탈퇴</StyledButton>

            <EditGroupButton />
          </div>
        ) : (
          <div>
            <StyledButton onClick={handleJoinClick}>그룹 가입</StyledButton>
          </div>
        )}
      </div>

      <div>
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <StyledButton>
                <EventInfoButton event={event}></EventInfoButton>
              </StyledButton>
              <p>{event.information}</p>
              <p>{event.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : (
    <div>
      {console.log(events)}

      <div>
        <StyledButton>
          <IsLoginModal />
        </StyledButton>
      </div>
      <div>
        {console.log(events)}
        <ul>
          {console.log(group.groupUser)}
          {events.map(event => (
            <li key={event.id}>
              <StyledButton>
                <EventInfoButton event={event}></EventInfoButton>
              </StyledButton>
              <p>{event.information}</p>
              <p>{event.date}</p>
            </li>
          ))}
          {/* { eventName ? <a href= openModal >{eventName}</a> : <div>{events}</div> } */}
        </ul>
      </div>
    </div>
  );
};

/* // {eventName ? (
    //     <EventInfoButton eventName={eventName}></EventInfoButton>
    //   ) : (
    //     <div>{events}</div>
    //   )} */

export default GroupEvents;
