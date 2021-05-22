import React, { useReducer, useContext, useState } from 'react';
import {
  userReducer,
  useUserState,
  useUserDispatch,
  initialState,
} from '../../UserContext';
import { withRouter, Link } from 'react-router-dom';
import Logo from './logo.jpeg';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Login = ({ isOpen, close }) => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const { email, password, err, token } = state;
  const [inputs, setInputs] = useState({ email, password });

  const loginHandler = e => {
    const { name, value } = e.target;
    setInputs({ [name]: value });
  };

  const clickLoginHandler =
    (() => {
      dispatch({ type: 'HANDLE_LOGIN' });
      const postLogin = async () => {
        let response = await axios.post('/login');
        if (response.status === 200) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            user: response.user,
            token: response.token,
          });
          return;
        }
        loginDispatch({ type: 'LOGIN_FAILED', errorMessage: err });
      };
      postLogin();
    },
    []);

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
                  name="email"
                  className="loginId"
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  onChange={loginHandler}
                />
                <input
                  name="password"
                  className="loginPw"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={loginHandler}
                />
                <button className="loginBtn" onClick={clickLoginHandler}>
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

export default withRouter(Login);
