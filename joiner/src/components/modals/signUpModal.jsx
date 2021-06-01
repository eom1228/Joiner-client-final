import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext.jsx';
import { Link } from 'react-router-dom';
import Logo from '../../images/LOGO.jpg';
import axios from 'axios';

const SignupModal = ({ isOpen, close }) => {
  const [userInputs, setUserInputs] = useState({
    userName: '',
    email: '',
    password: '',
    location: '',
  });
  const { state, dispatch } = useUserContext();
  const { user, err, access_token } = state;
  const { userName, email, password, location } = user;
  const [alert, setAlert] = useState('');

  const clickSignupHandler = () => {
    // if (!userName || !email || !password || !location) {
    //   dispatch({ type: 'REGISTER_FAIL', err: '알맞은 정보를 입력하세요.' });
    // }

    // if (!isValidEmail(email)) {
    //   setAlert('올바른 이메일 형식이 아닙니다.');
    // }

    // if (!isValidPw(password)) {
    //   setAlert('비밀번호는 영문, 숫자, 특수문자 포함 8자이상 입력해야합니다.');
    // }
    const data = axios
      .post('https://localhost:4000/user/signUp', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: userInputs.email,
          userName: userInputs.userName,
          password: userInputs.password,
          location: userInputs.location,
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        console.log(res);
      });
  };

  const handleSignup = e => {
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    setUserInputs({ ...userInputs, [name]: value });
    console.log(userInputs);
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

  return (
    <>
      {isOpen ? (
        <div className="modal">
          <div onClick={() => close}>
            <div className="signupModal">
              <span className="close" onClick={() => close}>
                &times;
              </span>
              <div className="modalContents" onClick={() => isOpen}>
                <img
                  className="logo"
                  src={Logo}
                  style={{ width: `50px`, height: `50px` }}
                />
                <input
                  value={userInputs.userName}
                  name="userName"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  onChange={handleSignup}
                />
                <input
                  value={userInputs.email}
                  name="email"
                  type="text"
                  placeholder="이메일 주소를 입력해주세요"
                  onChange={handleSignup}
                />
                <input
                  value={userInputs.password}
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={handleSignup}
                />
                <input
                  value={userInputs.location}
                  name="location"
                  type="text"
                  placeholder="지역을 입력해주세요"
                  onChange={handleSignup}
                />
                <button className="signUpBtn" onClick={clickSignupHandler}>
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
export default SignupModal;
