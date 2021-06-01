import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext.jsx';
import { Link } from 'react-router-dom';
import Logo from '../../images/LOGO.jpg';
import axios from 'axios';
import '../modals/loginStyle.css';

const LoginModal = ({ isOpen, close }) => {
  const [userInputs, setUserInputs] = useState({ email: '', password: '' });
  const { state, dispatch } = useUserContext();
  const { user, access_token } = state;
  const { email, password } = user;
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const postLogin = async () => {
      let response = await axios.post('https://localhost:4000/user/login', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        data: {
          userInputs: userInputs,
        },
        withCredentials: true,
        crossDomain: true,
      });
      dispatch({ type: 'SET_USERINFO', payload: response.data });
    };
    postLogin(dispatch);
  }, []);

  useEffect(() => {
    const getToken = async () => {
      dispatch({ type: 'GET_ACCESSTOKEN' });
      let response = await axios.get('user/userInfo', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        crossDomain: true,
      });
      dispatch({ type: 'SET_ACCESSTOKEN', payload: response.data });
    };
    getToken(dispatch);
  }, [access_token]);

  const handleLogin = e => {
    //이메일&비밀번호 일치하지 않을 경우 Login Failed에 있는 err
    const { name, value } = e.target;
    setUserInputs({ [name]: value });
  };

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

  const clickLoginHandler = e => {
    e.preventDefault();
    if (!email || !password) {
      dispatch({
        type: 'LOGIN_FAILED',
        err: '이메일 주소와 비밀번호를 입력해주세요.',
      });
    }
    if (!isValidEmail(email)) {
      setAlert('유효하지 않은 이메일입니다.');
    }

    if (!isValidPw(password)) {
      setAlert('비밀번호는 영문, 숫자, 특수문자 포함 8자이상 입력해야합니다.');
    }
  };
  return (
    <>
      {isOpen ? (
        <div className="modal">
          <div
            onClick={() => {
              close;
            }}
          >
            <div className="loginModal">
              <span
                className="close"
                onClick={() => {
                  close();
                }}
              >
                &times;
              </span>
              <div className="modalContents" onClick={() => isOpen}>
                <img
                  className="logo"
                  src={Logo}
                  style={{ width: `50px`, height: `50px` }}
                />
                <input
                  value={userInputs.email}
                  className="loginId"
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  onChange={handleLogin}
                />
                <input
                  name={userInputs.password}
                  className="loginPw"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={handleLogin}
                />
                <button
                  className="loginBtn"
                  type="submit"
                  onClick={clickLoginHandler}
                >
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
export default LoginModal;
