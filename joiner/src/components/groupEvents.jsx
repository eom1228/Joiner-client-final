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
const EventButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  // border: 1rem solid green;
`;
const StyledButton = styled.button`
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
const StyledEventButton = styled.button`
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

const StyledButtonJoin = styled.button`
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

const StyledButtonLoginJoin = styled.button`
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
          <>
            <EventButtonsWrapper>
              <div style={{ flex: '1 1 10%' }}>
                <CreateEventButton />

                <EditGroupButton />
              </div>
              <div style={{ flex: '1 1 70%' }}>
                <p style={{ marginTop: '25px' }}>예정된 이벤트</p>
                <ul>
                  {events.map(event => (
                    <li key={event.id}>
                      <StyledEventButton>
                        <EventInfoButton event={event}></EventInfoButton>
                      </StyledEventButton>
                      <p>{event.information}</p>
                      <p>{event.date}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  flex: '1 1 20%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <StyledButton className="groupLeave" onClick={handleLeaveClick}>
                  그룹 탈퇴
                </StyledButton>
              </div>
            </EventButtonsWrapper>
          </>
        ) : (
          <div>
            <StyledButtonJoin onClick={handleJoinClick}>
              그룹 가입
            </StyledButtonJoin>
          </div>
        )}
      </div>
    </>
  ) : (
    <div>
      {console.log(events)}

      <div>
        <StyledButtonLoginJoin>
          <IsLoginModal />
        </StyledButtonLoginJoin>
      </div>
      <div>
        {console.log(events)}
        <p>예정된 이벤트</p>
        <ul>
          {console.log(group.groupUser)}
          {events.map(event => (
            <li key={event.id}>
              <StyledEventButton>
                <EventInfoButton event={event}></EventInfoButton>
              </StyledEventButton>
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
