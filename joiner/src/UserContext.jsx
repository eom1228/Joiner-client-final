import React, { useReducer, createContext, useContext, useEffect } from 'react';

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
    modal: '',
  },
  // users: [],
  err: '',
  access_token: '', // JWT store 역할
  refresh_token: '',
  token_type: 'Bearer',
  //   errorMessage: null,
  isLogin: false,
  isLoading: false,
  isModal: false,
};

export function userReducer(state, action) {
  switch (action.type) {
    case 'FIELD':
      return {
        ...state,
        [action.fieldName]: action.payload,
      };

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
        userName: action.payload.userName,
        email: action.payload.email,
        location: action.payload.location,
        group: action.payload.group,
        event: action.payload.event,
      };

    case 'REGISTER_USER': // 회원가입하여 정보 넘길때
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

    case 'CALL_API':
      return {
        ...state,
        loading: true,
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

    case 'SHOW_MODAL':
      return {
        ...state,
        isModal: true,
        modal: '',
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        isModal: false,
      };

    case 'ACCESS_TOKEN':
      return {
        ...state,
        access_token: '',
        token_type: 'Bearer',
      };

    case 'REFRESH_TOKEN':
      return {
        ...state,
        refresh_token: '',
        token_type: 'Bearer',
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
    <UserStateContext.Provider value={{ state }}>
      <UserDispatchContext.Provider value={{ dispatch }}>
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
