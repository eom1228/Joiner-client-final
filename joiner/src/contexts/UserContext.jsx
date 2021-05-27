import React, { useReducer, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

export const initialState = {
  user: {
    id: '',
    userName: '',
    email: '',
    password: '',
    location: '',
    groups: [],
    events: [],
    page: 'myPage',
  },
  // users: [],
  token: '', // JWT store 역할
  //   errorMessage: null,
  isLogin: true,
};
// const initialState = {
// user: {

//     id: '',
//     userName: '',
//     email: '',
//     password: '',
//     location: '',
//     groups: [
//       ...groups,
//       group: {
//         ...group,
//         events: {
//           ...events,
//           event: {
//             event.id,
//             ...event
//           }
//         }
//       }
//     ]

//     groups: [
//      group: {
//        events: {
//          events,
//          ...events
//        },
//        ...group
//      },
//      ...groups
//     ],
//   {
//     token: '',
//   },
//   {
//     isLogin: false,
//   },
// },
// }; // userinfo[0].id ... userinfo[1].token

export function userReducer(state, action) {
  switch (action.type) {
    case 'GET_USERINFO':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.auth_token,
      };
    case 'GET_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.auth_token,
      };
    case 'HANDLE_LOGIN':
      return {
        ...state,
        token: '',
        isLogin: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user, // 로그인 성공 시 payload: data를 불러옴
        token: action.payload.auth_token, // JWT store 역할
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        isLogin: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        token: '',
        isLogin: false,
      };

    case 'REGISTER_USER':
      return {
        ...state,
        user: action.payload.user,
        // users: state.users.concat(action.payload.user)
      }; // 유저 목록에 신규유저 정보 추가/POST : 필요없을듯..

    case 'UDPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          userName: action.payload.value,
          email: action.payload.value,
          location: action.payload.value,
        },
      };
    case 'DELETE_USER':
      return {
        ...state,
        user: action.payload.user,
        // users: state.users.filter(user => user.id !== action.payload.id)};
      };
    case 'CHANGE_PASSWORD':
      return {
        ...state,
        user: state.user.filter(user => user.password === action.password),
      };

    case 'CHANGE_LOCATION':
      return {
        ...state,
        user: state.user.filter(user => user.location === action.location),
      };

    case 'JOIN_GROUP': // 유저가 속한 그룹 => 멤버
      return {
        // groups user의 group목록에서 가입한 그룹 추가 ,, group의 유저 목록에서
        ...state,
        user: {
          ...state.user,
          groups: action.payload.groups,
        },
      };

    case 'LEAVE_GROUP':
      return {
        ...state,
        user: {
          ...state.user,
          groups: state.user.groups.filter(
            group => group.id !== action.payload.id,
          ),
        },
      };

    case 'CHANGE_PAGE_STATE':
      // 버튼을 누르면 page state값이 바뀐다.
      return {
        ...state,
        user: {
          ...state,
          page: action.value,
        },
      };
    default:
      return state;
  }
}

const UserContext = createContext();
// export const UserDispatchContext = createContext();

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  //   const { user } = state;
  //   const { id, userName, email, password, location, group, event } = user;

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  // state 활용하게 해주는 커스텀 훅
  const context = useContext(UserContext);

  if (!context) {
    console.log('state Error');
  }
  return context;
}

// export function useUserDispatch() {
//   // dispatch 활용하게 해주는 커스텀 훅
//   const context = useContext(UserDispatchContext);
//   if (!context) {
//     console.log('dispatch Error');
//   }
//   return context;
// }

// ---------------------- 로그인 페이지에서 유저정보 get 예시
// const state = useContext(UserStateContext);
// const dispatch = useContext(UserDispatchContext);

// const getUser = async () => {
//   // 로그인 시 유저 정보 get 해오기
//   dispatch({ type: 'GET_USER', payload:  });
//   try {
//     const response = await axios.get('url');
//     dispatch({
//       type: 'LOGIN_SUCCESS',
//       user: response.user,
//       token: response.token,
//     });
//   } catch (err) {
//     dispatch({ type: 'LOGIN_FAILED', errorMessage: err });
//   }
// };

// useEffect(() => {
//   getUser();
// }, []);

// const onRegisterUser = useCallback(() => {
// 	dispatch({
// 		type: 'REGISTER_USER',
// 		user,
// 	})
// })
