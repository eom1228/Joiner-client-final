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
import LoginModal from './modals/loginModal';

// import LoginModal from ' ';

const GroupEvents = () => {
  const { state, dispatch } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();

  const { group, mapping_id } = groupCurrentState;
  const { host, groupUser } = group;
  const { access_token, user, isLogin } = state;
  const { groups } = user;
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('hihi');
    // if (events) return;
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
        setErrorMessage(e);
      }
    };
    console.log(events);
    getGroupEvents();
  }, [group]);

  const leaveGroup = async () => {
    let response = await axios.delete('/main/groupPage/groupSecession', {
      headers: {
        // Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      data: {
        //   [user.id]: user.id,
        [user.id]: user.id, // group의 id
      },
      withCredentials: true,
      crossDomain: true,
    });
    dispatch({ type: 'LEAVE_GROUP', payload: response.data.group.id });
  };

  const joinGroup = async () => {
    let response = await axios.patch('/main/groupPage/groupJoin', {
      headers: {
        // Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      data: {
        [user.id]: user.id,
      },
      withCredentials: true,
      crossDomain: true,
    });
    dispatch({ type: 'JOIN_GROUP', payload: response.user.groups });
  };

  //     const deleteGroupMember = async () => {
  //       let response = await axios.delete('/group', {
  //           headers: {
  //               Authorization: `Bearer ${token}`,
  //               'Content-Type': 'application/json',
  //           },
  //           data: {
  //               [user.id]: user.id
  //           },
  //           withCredentials: true,
  //           crossDomain: true,

  //       });
  //       groupDispatch({
  //         type: 'DELETE_GROUPMEMBER',
  //         payload: response.group.members,
  //         [group.memberCount]: group.memberCount--,
  //       });
  //     };
  //     if (dispatch({ type: 'LEAVE_GROUP' })) {
  //       deleteGroupMember(groupDispatch);
  //     }
  //   }, [groups]);

  //   useEffect(() => {
  //     const editGroup = async () => {
  //       let response = await axios.post('/group', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //         data: {
  //           [group.id]: group.id,
  //         },
  //         withCredentials: true,
  //         crossDomain: true,
  //       });
  //       groupDispatch({
  //         type: 'EDIT_GROUP',
  //         payload: response.action.payload.value,
  //       });
  //     };
  //     editGroup(groupDispatch);
  //   }, [group]);

  const handleLeaveClick = () => {
    leaveGroup();
  };

  const handleJoinClick = () => {
    joinGroup();
  };

  if (!events) return null;
  // if (!groupUser) return <div>Loading!!!</div>;
  // if (!group) return <div>장난하나</div>;

  return isLogin ? (
    <>
      {console.log('hi hi')}
      <div style={{ backgroundColor: 'green' }}>
        {console.log(group)}
        {console.log(groupUser)}
        {user.username === host ||
        user.userName === groupUser.map(member => member.userName) ? (
          <div>
            <CreateEventButton />
            <button onClick={handleLeaveClick}>그룹 탈퇴</button>
            <EditGroupButton />
          </div>
        ) : (
          <div>
            <button onClick={handleJoinClick}>그룹 가입</button>
          </div>
        )}
      </div>

      <div>
        <ol>
          {events.map(event => (
            <li key={event.id}>
              <EventInfoButton event={event}></EventInfoButton>
              <p>{event.information}</p>
              <p>{event.date}</p>
            </li>
          ))}
          {/* { eventName ? <a href= openModal >{eventName}</a> : <div>{events}</div> } */}
        </ol>
      </div>
    </>
  ) : (
    <div>
      {console.log(events)}

      <div>
        <LoginModal>그룹 가입</LoginModal>
        {/* <CreateEventButton onClick={openModal} />
            <button onClick={openModal}>그룹 가입</button>
            <EditGroupButton onClick={openModal} /> */}
      </div>
      <div>
        {console.log(events)}
        <ul>
          {console.log(group.groupUser)}
          {events.map(event => (
            <li key={event.id}>
              <EventInfoButton event={event}></EventInfoButton>
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
