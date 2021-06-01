import React, { useReducer, useContext, useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext.jsx';
import { withRouter, Link } from 'react-router-dom';
import Logo from '../../images/logo_remove.png';
import axios from 'axios';
<<<<<<< HEAD
// import '../modals/loginStyle.css';

axios.defaults.withCredentials = true;
=======
import '../modals/loginStyle.css';
import IsSignupModal from './signupModalBtn.jsx';
>>>>>>> 876ede1bf81be69145fd6dd028c582499f4acfb2

const LoginModal = ({ isOpen, close }) => {
  const [userInputs, setUserInputs] = useState({ email: '', password: '' });
  const { state, dispatch } = useUserContext();
  const { user, access_token } = state;
  const { email, password } = user;
  const [alert, setAlert] = useState('');

  const clickLoginHandler = () => {
    let data = axios
      .post('https://localhost:4000/user/login', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        data: {
          email: userInputs.email,
          password: userInputs.password,
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {
        console.log(res);
      });
  };

  // useEffect(() => {
  //   const getToken = async () => {
  //     dispatch({ type: 'GET_ACCESSTOKEN' });
  //     let response = await axios.get('user/userInfo', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //       crossDomain: true,
  //     });
  //     dispatch({ type: 'SET_ACCESSTOKEN', payload: response.data });
  //   };
  //   getToken(dispatch);
  // }, [access_token]);

  const handleLogin = e => {
    //이메일&비밀번호 일치하지 않을 경우 Login Failed에 있는 err
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
            <div className="loginModal">
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
                  value={userInputs.email}
                  className="loginId"
                  name="email"
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  onChange={handleLogin}
                />
                <input
                  name={userInputs.password}
                  className="loginPw"
                  name="password"
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
                  <IsSignupModal>SIGN UP</IsSignupModal>
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
