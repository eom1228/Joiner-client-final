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
  //   const { eventName, date, time, information } = events;
  const { state, dispatch } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();

  const { group } = groupCurrentState;
  const { host, members, events } = group;
  const { token, user, isLogin } = state;
  const { groups } = user;

  useEffect(() => {
    const leaveGroup = async () => {
      let response = await axios.delete('/main/groupPage/groupSecession', {
        headers: {
          Authorization: `Bearer ${token}`,
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
    leaveGroup(dispatch);
  }, [groups]);

  useEffect(() => {
    const joinGroup = async () => {
      let response = await axios.patch('/main/groupPage/groupJoin', {
        headers: {
          Authorization: `Bearer ${token}`,
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

    joinGroup(dispatch);
  }, [groups]);

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
    alert('그룹 탈퇴 완료!');
  };

  const handleJoinClick = () => {
    alert('그룹 가입 완료!');
  };

  return isLogin ? (
    <>
      <div style={{ backgroundColor: 'green' }}>
        {user.username === host ||
        user.userName === members.map(member => member.userName) ? (
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
              <EventInfoButton eventTitle={event.eventTitle}></EventInfoButton>
              <p>{event.activityContent}</p>
              <p>{event.date}</p>
              <p>{event.limit}</p>
            </li>
          ))}
          {/* { eventName ? <a href= openModal >{eventName}</a> : <div>{events}</div> } */}
        </ol>
      </div>
    </>
  ) : (
    <>
      <div>
        <div>
          <LoginModal>그룹 가입</LoginModal>
          {/* <CreateEventButton onClick={openModal} />
          <button onClick={openModal}>그룹 가입</button>
          <EditGroupButton onClick={openModal} /> */}
        </div>
      </div>
      <div>
        <ol>
          {events.map(event => (
            <li key={event.id}>
              <EventInfoButton eventTitle={event.eventTitle}></EventInfoButton>
              <p>{event.activityContent}</p>
              <p>{event.date}</p>
              <p>{event.limit}</p>
            </li>
          ))}
          {/* { eventName ? <a href= openModal >{eventName}</a> : <div>{events}</div> } */}
        </ol>
      </div>
    </>
  );
};

{
  /* // {eventName ? (
  //     <EventInfoButton eventName={eventName}></EventInfoButton>
  //   ) : (
  //     <div>{events}</div>
  //   )} */
}
export default GroupEvents;
