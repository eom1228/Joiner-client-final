import React, { useReducer, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

export const initialState = {
  user: {
    id: '',
    userName: '',
    email: '',
    password: '',
    location: '',
    group: '',
    event: '',
    page: 'myPage',
  },
  // users: [],
  token: '', // JWT store 역할
  //   errorMessage: null,
  isLogin: true,
};
// const initialState = {
//   user: [
//     {
//       id: '',
//       userName: '',
//       email: '',
//       password: '',
//       location: '',
//       group: '',
//       event: '',
//     },
//     {
//       token: '',
//     },
//     {
//       isLogin: false,
//     },
//   ],
// }; // userinfo[0].id ... userinfo[1].token

export function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user, // 로그인 성공 시 payload: data를 불러옴
        token: action.payload.auth_token, // JWT store 역할
        isLogin: true,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        errorMessage: action.errorMessage,
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
        user: action.payload.user,
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
      throw new Error('');
  }
}

export const UserStateContext = createContext();
export const UserDispatchContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  //   const { user } = state;
  //   const { id, userName, email, password, location, group, event } = user;

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  // state 활용하게 해주는 커스텀 훅
  const context = useContext(UserStateContext);

  if (!context) {
    console.log('state Error');
  }
  return context;
}

export function useUserDispatch() {
  // dispatch 활용하게 해주는 커스텀 훅
  const context = useContext(UserDispatchContext);
  if (!context) {
    console.log('dispatch Error');
  }
  return context;
}

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