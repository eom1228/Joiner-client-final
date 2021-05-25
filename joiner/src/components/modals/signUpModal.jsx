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

axios.defaults.withCredentials = true;

const Signup = ({ isOpen, close }) => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const { userName, email, password, location, err, token } = state;
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

  const handleSignup = () => {
    if (!userName || !email || !password || !location) {
      dispatch({ type: 'REGISTER_FAIL', err: '알맞은 정보를 입력하세요.' });
      return;
    }

    if (!isValidEmail(email)) {
      setAlert('올바른 이메일 형식이 아닙니다.');
      return;
    }

    if (!isValidPw(password)) {
      setAlert('비밀번호는 영문, 숫자, 특수문자 포함 8자이상 입력해야합니다.');
      return;
    }

    axios
      .post('https://joiner/user/signUp', {
        userName,
        email,
        password,
        location,
      })
      .then(data => {
        if (
          data.status === 200 &&
          data.data === '이미 존재하는 이메일 주소입니다.'
        ) {
          setAlert('이미 가입한 이메일 주소입니다.');
          return;
        }
        dispatch({
          type: 'REGISTER_USER',
          payload: {
            userName: action.payload.userName,
            email: action.payload.email,
            password: action.payload.password,
            location: action.payload.location,
          },
        });
        dispatch({ type: 'SHOW_MODAL', modal: 'login' }).catch(err => {
          dispatch({ type: 'REGISTER_FAIL', err: '알맞은 정보를 입력하세요.' });
        });
      });
  };
  return (
    <>
      {isOpen ? (
        <div className="modal">
          <div onClick={close}>
            <div className="signupModal">
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
                  value={userName}
                  className="userName"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  onChange={e => {
                    dispatch({ type: 'FIELD', payload: e.target.value });
                  }}
                />
                <input
                  value={email}
                  className="email"
                  type="text"
                  placeholder="이메일 주소를 입력해주세요"
                  onChange={e => {
                    dispatch({ type: 'FIELD', payload: e.target.value });
                  }}
                />
                <input
                  value={password}
                  className="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={e => {
                    dispatch({ type: 'FIELD', payload: e.target.value });
                  }}
                />
                <input
                  value={location}
                  className="loaction"
                  type="text"
                  placeholder="지역을 입력해주세요"
                  onChange={e => {
                    dispatch({ type: 'FIELD', payload: e.target.value });
                  }}
                />
                <button className="signUpBtn" onClick={handleSignup}>
                  SIGN UP
                </button>
                <div className="signupEnd">
                  <div className="signupLine">로그인을 시도 해보실까요?</div>
                  <Link to="/login">LOG IN</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default withRouter(Signup);
