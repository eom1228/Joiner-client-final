
import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';

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


const NavBar = ({ location }) => {
  const history = useHistory();
  const { state } = useUserContext();
  if (!state.isLogin) {
    if (location.pathname === '/main' || location.pathname === '/') {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
                cursor: 'pointer',
              }}
              onClick={() => {
                history.push('/');
              }}
            />
            <Link
              to="/GroupPage"
              value="groups"
              // onClick={e => {
              //   console.log(state.page);
              //   dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
              // }}
            >
              Groups
            </Link>
            <button value="signUp">Signup</button>
            <button value="signIn">Login</button>
          </nav>
        </>
      );
    } else if (
      location.pathname === '/GroupPage' ||
      location.pathname === '/groupPage'
    ) {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
                cursor: 'pointer',
              }}
              onClick={() => {
                history.push('/');
              }}
            />
            <Link to="/main" value="events">
              Events
            </Link>
            <Link
              to="/groupPage"
              value="groups"
              // onClick={e => {
              //   console.log(state.page);
              //   dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
              // }}
            >
              Groups
            </Link>
            <button value="signUp">Signup</button>
            <button value="signIn">Login</button>
          </nav>
        </>
      );
    }
  } else if (state.isLogin) {
    if (location.pathname === '/main' || location.pathname === '/') {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
                cursor: 'pointer',
              }}
              onClick={() => {
                history.push('/');
              }}
            />
            <Link to="/groupPage" value="groups">
              Groups
            </Link>
            <Link to="/userInfo" value="myPage">
              MyPage
            </Link>
            <Link value="logout">Logout</Link>
          </nav>
        </>
      );
    } else if (
      location.pathname === '/GroupPage' ||
      location.pathname === '/groupPage'
    ) {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
                cursor: 'pointer',
              }}
              onClick={() => {
                history.push('/');
              }}
            />
            <Link to="/main" value="events">
              Events
            </Link>
            <Link to="/groupPage" value="groups">
              Groups
            </Link>
            <Link to="/userInfo" value="myPage">
              MyPage
            </Link>
            <button value="logout">Logout</button>
          </nav>
        </>
      );
    } else if (location.pathname === '/userInfo') {
      return (
        <>
          <nav>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `50px`,
                height: `50px`,
                cursor: 'pointer',
              }}
              onClick={() => {
                history.push('/');
              }}
            />
            <Link to="/main" value="events">
              Events
            </Link>
            <Link to="/groupPage" value="groups">
              Groups
            </Link>
            <button value="logout">Logout</button>
          </nav>
        </>
      );
    }

  }
};

export default withRouter(NavBar);

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
