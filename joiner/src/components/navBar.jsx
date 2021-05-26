import React, { useReducer, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
// import {
//   userReducer,
//   UserStateContext,
//   initialState,
// } from '../contexts/UserContext';
import logo from '../images/LOGO.jpg';

// 버튼 클릭시 유저 상태 user.page = '어떤페이지'
// 로그인 상태 및 user.page에 따라서 보여주는 버튼 변경

/*
로그인 상태일 경우에서
case1 mainPage일 경우
==========>groups , mypage, logout 
case2 groupPage일 경우
==========>events, groups, mypage, logout 
case3 myPage일 경우
==========>Events Groups Logout 
*/
const NavBar = () => {
  const history = useHistory();
  const { state, dispatch } = useUserContext();
  console.log(state);
  if (!state.isLogin) {
    if (state.user.page === 'mainPage') {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
              }}
            />
            <button
              value="groups"
              onClick={e => {
                console.log(state.page);
                dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                history.push('/main/groupPage');
              }}
            >
              Groups
            </button>
            <button value="signUp">Signup</button>
            <button value="signIn">Login</button>
          </nav>
        </>
      );
    } else if (state.user.page === 'groupPage') {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
              }}
            />
            <button value="events">Events</button>
            <button
              value="groups"
              onClick={e => {
                console.log(state.page);
                dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
              }}
            >
              Groups
            </button>
            <button value="signUp">Signup</button>
            <button value="signIn">Login</button>
          </nav>
        </>
      );
    }
  } else if (state.isLogin) {
    if (state.user.page === 'mainPage' && state.user.page === '') {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
              }}
            />
            <button
              value="groups"
              onClick={e => {
                console.log(state.page);
                dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                history.push('/main/groupPage');
              }}
            >
              Groups
            </button>
            <button
              onClick={e => {
                console.log(state.page);
                dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                history.push('/user/userinfo');
              }}
              value="myPage"
            >
              MyPage
            </button>
            <button value="logout">Logout</button>
          </nav>
        </>
      );
    } else if (state.user.page === 'groupPage' && state.user.page === '') {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
              }}
            />
            <button
              value="events"
              onClick={e => {
                console.log(state.page);
                dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                history.push('/searchEventNearBy');
              }}
            >
              Events
            </button>
            <button
              value="groups"
              onClick={e => {
                console.log(state.page);
                dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                history.push('/category/GroupList');
              }}
            >
              Groups
            </button>
            <button
              onClick={e => {
                console.log(state.page);
                dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                history.push('/user/userInfo');
              }}
              value="myPage"
            >
              MyPage
            </button>
            <button value="logout">Logout</button>
          </nav>
        </>
      );
    } else if (state.user.page === 'myPage') {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
              }}
            />
            <button
              value="events"
              onClick={e => {
                console.log(state.page);
                dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                history.push('/searchEventNearBy');
              }}
            >
              Events
            </button>
            <button
              value="groups"
              onClick={e => {
                console.log(state.page);
                dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                history.push('/category/GroupList');
              }}
            >
              Groups
            </button>
            <button value="logout">Logout</button>
          </nav>
        </>
      );
    }
  }
};

export default NavBar;

// return (
//   <>
//     <nav>
//       <img
//         src={logo}
//         alt="Logo"
//         style={{
//           width: `50px`,
//           height: `50px`,
//         }}
//       />
//       {/* 로그인 상태일 때 */}
//       <button
//         onClick={e => {
//           console.log(state.page);
//           dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
//         }}
//         value="myPage"
//       >
//         MyPage
//       </button>
//       <button value="events">Events</button>
//       <button value="groups">Groups</button>
//       <button value="logout">Logout</button>
//     </nav>
//   </>
// );
