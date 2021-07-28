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
  font-size: 23px;
  font-weight: 600;
  color: white;
  height: 50px;
  width: 100px;
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

const GroupEvents = () => {
  const { state, dispatch } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();

  const { group, mapping_id } = groupCurrentState;
  const { host, groupUser } = group;
  const { access_token, user, isLogin } = state;
  const { groups } = user;
  const [events, setEvents] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const { test, setTest } = useState('');
  const [toggleBtn, setToggleBtn] = useState(false);

  useEffect(() => {
    const getGroupEvents = async () => {
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
          // console.log(res.data);
          // console.log(events);
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
        window.location.reload();
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
        window.location.reload();
      })
      .catch(e => setResponseMessage(e));
  };

  const handleLeaveClick = () => {
    leaveGroup();
  };

  const handleJoinClick = () => {
    setToggleBtn(!toggleBtn);
    if (isLogin) {
      joinGroup();
    } else {
      null;
    }
  };

  if (!events) return null;
  if (!groupUser) return <div>Loading!!!</div>;

  return isLogin ? (
    <div>
      {/* {groupUser                        .slice(0, 1)
          .map(member => member.userName)
          .filter(userNameArr => userNameArr === user.userName) ===
        [user.userName]} */}
      {console.log(test, 'hehe')}
      {console.log(groupUser, 'hehe')}
      {console.log(user, 'userrr')}
      {groupUser.map(e => e.id).filter(e => e === user.id)[0] ? (
        <EventButtonsWrapper>
          <div style={{ flex: '1 1 10%' }}>
            <CreateEventButton />

            <EditGroupButton />
          </div>
          <div style={{ flex: '1 1 70%' }}>
            <p style={{ marginTop: '25px', fontSize: '23px' }}>예정된 이벤트</p>
            <ul>
              {events.map(event => (
                <li
                  key={event.id}
                  style={{ listStyle: 'none', marginTop: '15px' }}
                >
                  <EventInfoButton event={event}></EventInfoButton>

                  <p style={{ fontSize: '23px', marginTop: '10px' }}>
                    {event.information}
                  </p>
                  <p style={{ fontSize: '23px', marginTop: '10px' }}>
                    {event.eventDay}
                  </p>
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
            <StyledButton
              style={{ marginBottom: '20px' }}
              className="groupLeave"
              onClick={handleLeaveClick}
            >
              그룹 탈퇴
            </StyledButton>
          </div>
        </EventButtonsWrapper>
      ) : (
        <div>
          <StyledButtonJoin onClick={handleJoinClick}>
            그룹 가입
          </StyledButtonJoin>
        </div>
      )}
    </div>
  ) : (
    <div>
      {console.log(toggleBtn)}

      {!toggleBtn ? (
        <div>
          <StyledButtonJoin onClick={handleJoinClick}>
            그룹 가입
          </StyledButtonJoin>
        </div>
      ) : (
        <div>
          <IsLoginModal />
        </div>
      )}
      <div>
        {console.log(events)}
        <p style={{ marginTop: '25px', fontSize: '23px' }}>예정된 이벤트:</p>
        <ul>
          {console.log(group.groupUser)}
          {events.map(event => (
            <li key={event.id} style={{ listStyle: 'none', marginTop: '15px' }}>
              <EventInfoButton event={event}></EventInfoButton>

              <p style={{ fontSize: '23px', marginTop: '10px' }}>
                {event.information}
              </p>
              <p style={{ fontSize: '23px', marginTop: '10px' }}>
                {event.eventDay}
              </p>
            </li>
          ))}
          {/* { eventName ? <a href= openModal >{eventName}</a> : <div>{events}</div> } */}
        </ul>
      </div>
    </div>
  );
};

export default GroupEvents;
