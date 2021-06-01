import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext.jsx';
import { withRouter, Link } from 'react-router-dom';
import Logo from '../../images/logo_remove.png';
import '../modals/signupStyle.css';
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
        history.push('/login');
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
              <span className="close" onClick={() => close()}>
                &times;
              </span>
              <div className="modalContents" onClick={() => isOpen}>
                <img
                  className="logo"
                  src={Logo}
                  style={{ width: `120px`, height: `120px` }}
                />
                <input
                  value={userInputs.userName}
                  className="userName"
                  name="userName"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  onChange={handleSignup}
                />
                <input
                  value={userInputs.email}
                  className="email"
                  name="email"
                  type="text"
                  placeholder="이메일 주소를 입력해주세요"
                  onChange={handleSignup}
                />
                <input
                  value={userInputs.password}
                  className="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={handleSignup}
                />
                <input
                  value={userInputs.location}
                  className="location"
                  name="location"
                  type="text"
                  placeholder="지역을 입력해주세요"
                  onChange={handleSignup}
                />
                <button
                  className="signUpBtn"
                  type="submit"
                  onClick={clickSignupHandler}
                >
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
export default withRouter(SignupModal);
