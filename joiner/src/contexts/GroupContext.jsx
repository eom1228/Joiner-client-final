import axios from 'axios';
import React, { useReducer, createContext, useContext, useEffect } from 'react';

export const groupState = {
  group: {
    id: '',
    groupName: '', // title
    imgs: [], //     // img
    category: '', // category_id
    host: '', // groupIntroduce
    groupIntroduce: '',
    memberCount: 0,
    location: '',
    information: '',
    events: [],
    members: [],
  },
  loading: false,
  error: null,
};
// events: [
//   {
//     eventName: '',
//     date: '',
//     time: '',
//     information: '',
//   },
// ],
export function groupReducer(state, action) {
  switch (action.type) {
    // case 'CREATE_GROUP': // 이벤트 페이지에 적용
    //   return {
    //     ...state,
    //     group: action.payload.group,
    //   };

    case 'DELETE_GROUP': // 나중에 nightmare로 하자
      return {
        ...state,
        group: action.payload.group,
      };

    case 'GET_GROUP':
      return {
        ...state,
        loading: true,
      };

    case 'GET_SUCCESS':
      return {
        ...state,
        loading: false,
        group: action.payload.group, // todoItems: action.payload.items ->
      };

    case 'GET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case 'EDIT_GROUP':
      return {
        ...state,
        group: action.payload.group, // 확인 필요..
      };

    // case 'UPLOAD_IMG': // 필요한가..? 따로 구현?
    //   return {
    //     ...state,
    //     group: {
    //       ...state.group,
    //       [group.imgs]: [...state.group[group.imgs], action.payload],
    //     },
    //   };

    // case 'ADD_GROUPMEMBER': // usercontext의 JOIN GROUP case도 같이 실행
    //   return {
    //     ...state,
    //     group: {
    //       ...state.group,
    //       [group.memberCount]: group.memberCount++,
    //       [group.members]: [
    //         ...state.group[group.members],
    //         action.payload.group.members,
    //       ],
    //     },
    //   };

    // case 'DELETE_GROUPMEMBER': // getGroup으로 자동 업데이트될듯
    //   return {
    //     ...state,
    //     group: {
    //       ...state.group,
    //       [group.memberCount]: group.memberCount--,
    //       [group.members]: [
    //         ...state.group[group.members],
    //         action.payload.group.members,
    //       ],
    //     },
    //   };

    case 'CREATE_GROUPEVENT': // createEventModal에서 따로 만들자
      return {
        ...state,
        group: {
          ...state.group,
          events: action.payload.group.events,
        },
      };
    case 'GET_CREATEDEVENT':
      return {
        ...state,
        group: {
          ...state.group,
          events: action.payload.group.events,
        },
      };
    default:
      throw new Error('');
  }
}

const GroupContext = createContext();
// const GroupDispatchContext = createContext();

export function GroupContextProvider({ children }) {
  const [groupCurrentState, groupDispatch] = useReducer(
    groupReducer,
    groupState,
  );

  return (
    <GroupContext.Provider value={{ groupCurrentState, groupDispatch }}>
      {children}
    </GroupContext.Provider>
  );
}

export function useGroupContext() {
  const context = useContext(GroupContext);
  if (!context) {
    console.log('groupState Error');
  }
  return context;
}

// export async function getGroup(groupDispatch) {
//   groupDispatch({ type: 'GET_GROUP' });
//   try {
//     const response = await axios.get('/group');
//     groupDispatch({ type: 'GET_SUCCESS', payload: response.payload });
//   } catch (err) {
//     groupDispatch({ type: 'GET_ERROR', error: err });
//   }
// }
// export function useGroupDispatch() {
//   const context = useContext(GroupDispatchContext);
//   if (!context) {
//     console.log('groupDispatch Error');
//   }
//   return context;
// }

// -------------------
