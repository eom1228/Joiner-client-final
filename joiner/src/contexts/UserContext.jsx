import React, { useReducer, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

export const initialState = {
  user: {
    id: '',
    userName: '',
    email: '',
    password: '',
    userGroup: [],
    events: [],
    page: '',
    fileName: '',
    filePath: '',
  },
  // users: [],
  err: '',
  access_token: '',
  // token_type: 'Bearer',
  isLogin: true,
  isLoading: false,
  //   errorMessage: null,
};

export function userReducer(state, action) {
  switch (action.type) {
    // case 'FIELD':
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       password: action.payload.user.password,
    //       email: action.payload.user.email,
    //     },
    //   };

    case 'LOGIN':
      return {
        ...state,
        isLoading: true,
        err: '',
      };

    case 'LOGIN_SUCCESS': // login 될때
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      };

    case 'LOGIN_FAILED': //login 안될때
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        email: '',
        password: '',
        err: '이메일 주소와 비밀번호를 입력해주세요.',
      };

    case 'LOGOUT': //logout 할때
      return {
        ...state,
        isLogin: false,
      };

    case 'SET_USERINFO':
      return {
        ...state,
        user: {
          ...state.user,
          id: action.id,
          userName: action.userName,
          email: action.email,
          password: action.password,

          userGroup: action.userGroup,
          events: action.events,
        },
      };

    case 'GET_USERINFO':
      return {
        ...state,
        // user: action.payload.user,
        // token: action.payload.auth_token,
        isLoading: true,
      };

    case 'GET_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          userGroup: action.userGroup,
        },
      };

    case 'GET_USERICON':
      return {
        ...state,
        user: {
          ...state.user,
          fileName: action.fileName,
          filePath: action.filePath,
        },
      };
    case 'UDPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          userName: action.userName,
        },
      };

    case 'UPDATE_FAIL':
      return {
        ...state,
        err: action.err,
      };

    case 'REGISTER_USER':
      return {
        ...state,
        user: action.payload.user,
        // users: state.users.concat(action.payload.user)
      }; // 유저 목록에 신규유저 정보 추가/POST : 필요없을듯..

    case 'REGISTER_FAIL':
      return {
        ...state,
        err: '알맞은 정보를 입력하세요.',
      };

    // case 'UDPDATE_USER':
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       userName: action.payload.value,
    //       email: action.payload.value,
    //       location: action.payload.value,
    //     },
    //   };
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

    case 'CREATE_EVENT':
      return {
        ...state,
        user: {
          ...state.user,
          events: action.events,
        },
      };

    case 'ATTEND_EVENT':
      return {
        ...state,
        user: {
          ...state.user,
          events: action.events,
        },
      };

    case 'CANCEL_EVENT':
      return {
        ...state,
        user: {
          ...state.user,
          events: state.user.events.filter(
            userEvent => userEvent !== action.event,
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

    case 'GET_ACCESSTOKEN':
      return {
        ...state,
        isLoading: true,
      };

    case 'SET_ACCESSTOKEN':
      return {
        ...state,
        access_token: action.access_token,
        isLogin: true,
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
