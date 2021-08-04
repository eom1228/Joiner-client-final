import axios from 'axios';
import React, { useReducer, createContext, useContext, useEffect } from 'react';

export const groupState = {
  group: {
    id: '',
    title: '', // title
    imgs: [], //     // img
    category: '', // category_id
    host: '', // groupIntroduce
    groupIntroduce: '',
    memberCount: 1,
    location: '',
    information: '',
    groupUser: [],
    fileName: '',
    filePath: '',
  },
  mapping_id: null,
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

    case 'GET_DATA':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'GET_SUCCESS':
      return {
        ...state,
        loading: false,
        group: action.group,
      };

    case 'GET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case 'GET_GROUPIMG':
      return {
        ...state,
        group: {
          ...state.group,
          fileName: action.fileName,
          filePath: action.filePath,
        },
      };
    case 'EDIT_GROUP':
      return {
        ...state,
        group: {
          ...state.group,
          category: action.category,
          groupIntroduce: action.groupIntroduce,
          title: action.title,
        },
      };

    case 'SET_GROUPID':
      return {
        ...state,
        mapping_id: action.mapping_id,
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
    case 'GET_GROUPMEMBERS':
      return {
        ...state,
        group: {
          ...state.group,
          groupUser: action.group.groupUser,
        },
      };
    default:
      return state;
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
