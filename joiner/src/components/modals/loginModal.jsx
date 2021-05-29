import React, { useReducer, useContext, useState } from 'react';
import {
  userReducer,
  useUserState,
  useUserDispatch,
  initialState,
} from '../../UserContext';
import { withRouter, Link } from 'react-router-dom';
import Logo from '../../images/LOGO.jpg';
import axios from 'axios';
import '../modals/loginStyle.css';

axios.defaults.withCredentials = true;

const LoginModal = ({ isOpen, close }) => {
  const { state } = useUserState();
  const { dispatch } = useUserDispatch();
  const { user, isLogin, isLoading, err } = state;
  const { email, password } = user;
  const [alert, setAlert] = useState('');

  const isValidEmail = str => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(str);
  };

  const isValidPw = str => {
    const regExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/i;
    return regExp.test(str);
  };

  const handleLogin = () => {
    //이메일&비밀번호 일치하지 않을 경우 Login Failed에 있는 err
    if (!email || !password) {
      dispatch({
        type: 'LOGIN_FAILED',
        err: '이메일 주소와 비밀번호를 입력해주세요.',
      });
      return;
    }

    //유효성 검사
    if (!isValidEmail(email)) {
      setAlert('유효하지 않은 이메일입니다.');
      return;
    }

    if (!isValidPw(password)) {
      setAlert('비밀번호는 영문, 숫자, 특수문자 포함 8자이상 입력해야합니다.');
      return;
    }

    axios
      .post('https://joiner/user/login', { email, password })
      .then(data => {
        const token = data.data.data.access_token;
        dispatch({ type: 'ACCESS_TOKEN' });
        dispatch({ type: 'SHOW_MODAL' });
        dispatch({ type: 'LOGIN_SUCCESS' });
        return axios.get('https://joiner/user/userInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          crossDomain: true,
        });
      })
      .then(data => {
        const { userName, email, location, group, event } = data.data.data;
        dispatch({
          type: 'SET_USERINFO',
          payload: {
            userName: action.payload.userName,
            email: action.payload.email,
            location: action.payload.location,
            group: action.payload.group,
            event: action.payload.event,
          },
        });
      })
      .catch(err => {
        dispatch({
          type: 'LOGIN_FAILED',
          err: '이메일 주소와 비밀번호를 입력해주세요.',
        });
      });
  };
  return (
    <>
      {isOpen ? (
        <div className="modal">
          <div onClick={close}>
            <div className="loginModal">
              <span className="close" onClick={close}>
                &times;
              </span>
              <div className="modalContents" onClick={isOpen}>
                <img
                  className="logo"
                  src={Logo}
                  style={{ width: `50px`, height: `50px` }}
                />
                <input
                  value={email}
                  className="loginId"
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  onChange={e => {
                    dispatch({ type: 'FIELD', payload: e.target.value });
                  }}
                />
                <input
                  value={password}
                  className="loginPw"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={e => {
                    dispatch({ type: 'FIELD', payload: e.target.value });
                  }}
                />
                <button className="loginBtn" onClick={handleLogin}>
                  LOG IN
                </button>
                <div className="loginEnd">
                  <div className="loginLine">회원이 아니신가요?</div>
                  <Link to="/signUp">SIGN UP</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default withRouter(LoginModal);
