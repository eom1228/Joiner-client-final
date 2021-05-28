import React, { useState, useEffect } from 'react';
// import Footer from './footer';
// import NavBar from './navBar';
import { useUserContext } from '../contexts/UserContext';
import axios from 'axios';

axios.defaults.withCredentials = true;

const UserInfo = () => {
  const [inputs, setInputs] = useState({ userName: '', email: '' });
  const [isToggleOn, setIsToggleOn] = useState(false);

  const { state, dispatch } = useUserContext();
  const { user, token } = state;
  const { userName, email, location } = user;

  useEffect(() => {
    const updateUserInfo = async () => {
      let response = await axios.put('/user/userInfo/userInfoUpdate', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          inputs: inputs,
        },
        withCredentials: true,
        crossDomain: true,
      });
      dispatch({ type: 'UPDATE_USER', payload: response.inputs });
    };
    updateUserInfo(dispatch);
  }, [inputs.userName, inputs.email, location]);

  const handleClick = () => {
    setIsToggleOn({ isToggleOn: !isToggleOn });
  };

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('수정 완료!');
  };

  return (
    <>
      {isToggleOn ? (
        <div className="userInfo">
          <div className="userNameField">
            <p>{userName}</p>
            <span>
              <input
                id="userName"
                placeholder="이름"
                value={inputs.userName}
                onChange={handleChange}
              />
            </span>
          </div>
          <div className="emailField">
            <p>{email}</p>
            <span>
              <input
                id="email"
                placeholder="이메일"
                value={inputs.email}
                onChange={handleChange}
              />
            </span>
          </div>
          <div className="locationField">
            <p>{location}</p>
            <span>
              <button />
            </span>{' '}
            // 내 위치 버튼
          </div>
        </div>
      ) : (
        <div className="userInfo">
          <div className="userNameText">
            <p>{userName}</p>
          </div>
          <div className="emailText">
            <p>{email}</p>
          </div>
          <div className="locationText">
            <p>{location}</p>
          </div>
        </div>
      )}

      {!isToggleOn ? (
        <button onClick={handleClick}>정보 수정</button>
      ) : (
        <div>
          <button type="submit" onClick={handleSubmit}>
            완료
          </button>
        </div>
      )}
    </>
  );
};

export default UserInfo;
