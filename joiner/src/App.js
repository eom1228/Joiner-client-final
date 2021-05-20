import { Switch, Route, withRouter } from 'react-router-dom';
import React, { useReducer, useContext } from 'react';
import { userReducer, UserStateContext, initialState } from './UserContext';
// import ModalTest from './components/ModalTest';
import NavBar from './components/navBar';
// import Login from
// import Signup from
import LandingPage from './components/landingPage';
import MainPage from './components/mainPage';
import Footer from './components/footer';
import MyPage from './components/myPage';
import GroupPage from './components/groupPage';
import './App.css';

const App = () => {
  return (
    <>
      <UserStateContext.Provider value={useReducer(userReducer, initialState)}>
        <NavBar />
        <MyPage />
        <Footer />
      </UserStateContext.Provider>
    </>
  );
};

export default App;
