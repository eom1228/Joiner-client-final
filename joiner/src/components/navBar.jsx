import React from 'react';
import { Link, useHistory, withRouter, Redirect } from 'react-router-dom';
import '../styles/navbar.scss';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import IsLoginModal from '../components/modals/loginModalBtn';
import IsSignupModal from '../components/modals/signupModalBtn';
// import {
//   userReducer,
//   UserStateContext,
//   initialState,
// } from '../contexts/UserContext';
import logo from '../images/logo_remove.png';

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
  const { groupCurrentState } = useGroupContext();
  const { mapping_id } = groupCurrentState;

  if (!state.isLogin) {
    if (location.pathname === '/main' || location.pathname === '/') {
      return (
        <>
          <nav className="navBarContainer">
            <div className="logoBox">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: `60px`,
                  height: `60px`,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/');
                }}
              />
            </div>
            <div className="linkBox">
              <Link
                to="/category"
                value="groups"
                // onClick={e => {
                //   console.log(state.page);
                //   dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                // }}
                className="linkBtn"
              >
                Category
              </Link>
            </div>
            <div className="signs">
              <IsSignupModal></IsSignupModal>
              <IsLoginModal></IsLoginModal>
            </div>
          </nav>
        </>
      );
    } else if (
      location.pathname === '/category' ||
      location.pathname === '/Category'
    ) {
      return (
        <>
          <nav className="navBarContainer">
            <div className="logoBox">
              <img
                src={logo}
                alt="Logo"
                onClick={() => {
                  history.push('/');
                }}
                style={{
                  width: `60px`,
                  height: `60px`,
                  cursor: 'pointer',
                }}
              />
            </div>
            <div className="linkBox">
              <Link to="/main" value="events" className="linkBtn">
                Events
              </Link>
              <Link
                to="/category"
                value="groups"
                className="linkBtn"
                // onClick={e => {
                //   console.log(state.page);
                //   dispatch({ value: e.target.value, type: 'CHANGE_PAGE_STATE' });
                // }}
              >
                Category
              </Link>
            </div>
            <div className="signs">
              <IsSignupModal value="signUp">Signup</IsSignupModal>
              <IsLoginModal value="signIn">Login</IsLoginModal>
            </div>
          </nav>
        </>
      );
    } else if (
      location.pathname === '/groupPage' ||
      location.pathname === '/GroupPage'
    ) {
      return (
        <nav className="navBarContainer">
          <div className="logoBox">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `60px`,
                height: `60px`,
                cursor: 'pointer',
              }}
              onClick={() => {
                history.push('/');
              }}
            />
          </div>
          <div className="linkBox">
            <Link to="/main" value="events" className="linkBtn">
              Events
            </Link>
            <Link to="/category" value="groups" className="linkBtn">
              Category
            </Link>
          </div>

          <div className="signs">
            <Link value="logout" className="logoutBtn">
              Logout
            </Link>
          </div>
        </nav>
      );
      // <Redirect to="/category" />;
    }
  } else if (state.isLogin) {
    if (location.pathname === '/main' || location.pathname === '/') {
      return (
        <>
          <nav className="navBarContainer">
            <div className="logoBox">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: `60px`,
                  height: `60px`,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/');
                }}
              />
            </div>
            <div className="linkBox">
              <Link to="/category" value="groups" className="linkBtn">
                Category
              </Link>
              <Link to="/userInfo" value="myPage" className="linkBtn">
                MyPage
              </Link>
            </div>
            <div className="signs">
              <Link to="/main" value="logout" className="logoutBtn">
                Logout
              </Link>
            </div>
          </nav>
        </>
      );
    } else if (
      location.pathname === '/category' ||
      location.pathname === '/Category'
    ) {
      return (
        <>
          <nav className="navBarContainer">
            <div className="logoBox">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: `60px`,
                  height: `60px`,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/');
                }}
              />
            </div>
            <div className="linkBox">
              <Link to="/main" value="events" className="linkBtn">
                Events
              </Link>
              <Link to="/category" value="groups" className="linkBtn">
                Category
              </Link>
              <Link to="/userInfo" value="myPage" className="linkBtn">
                MyPage
              </Link>
            </div>

            <div className="signs">
              <Link value="logout" className="logoutBtn">
                Logout
              </Link>
            </div>
          </nav>
        </>
      );
    } else if (location.pathname === '/userInfo') {
      return (
        <>
          <nav className="navBarContainer">
            <div className="logoBox">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: `60px`,
                  height: `60px`,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/');
                }}
              />
            </div>
            <div className="linkBox">
              <Link to="/main" value="events" className="linkBtn">
                Events
              </Link>
              <Link to="/category" value="groups" className="linkBtn">
                Category
              </Link>
            </div>

            <div className="signs">
              <Link value="logout" className="logoutBtn">
                Logout
              </Link>
            </div>
          </nav>
        </>
      );
    } else if (
      location.pathname === '/groupPage' ||
      location.pathname === '/GroupPage'
    ) {
      return (
        <nav className="navBarContainer">
          <div className="logoBox">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `60px`,
                height: `60px`,
                cursor: 'pointer',
              }}
              onClick={() => {
                history.push('/');
              }}
            />
          </div>
          <div className="linkBox">
            <Link to="/main" value="events" className="linkBtn">
              Events
            </Link>
            <Link to="/category" value="groups" className="linkBtn">
              Category
            </Link>
          </div>

          <div className="signs">
            <Link value="logout" className="logoutBtn">
              Logout
            </Link>
          </div>
        </nav>
      );
      // <Redirect to="/category" />;
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
