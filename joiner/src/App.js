import React, { useState, useReducer, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter,
  Link,
} from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import { GroupContextProvider } from './contexts/GroupContext';
import { useGroupContext } from './contexts/GroupContext';
import NavBar from './components/navBar';
// import Login from './components/modals/loginModal';
// import Signup from
import LandingPage from './pages/landingPage';
import MainPage from './pages/mainPage';
import Footer from './components/footer';
import MyPage from './pages/myPage';
import GroupPage from './pages/groupPage';
import GroupsByCategoryPage from './pages/groupsByCategoryPage';
import './App.css';
import landingPage from './pages/landingPage';
import mainPage from './pages/mainPage';

const App = ({ location }) => {
  // const state = useUserState();
  // const dispatch = useUserDispatch();
  //   const GlobalStyle = createGlobalStyle`
  // 		body {

  // 		}
  // 	`;
  //   const state = useContext(UserStateContext);
  //   const dispatch = useContext(UserDispatchContext);

  //   console.log(state);

  return (
    // <UserProvider>
    //   <GroupProvider>
    //     <Test />
    <>
      <BrowserRouter>
        <UserContextProvider>
          <GroupContextProvider>
            <NavBar />
            <Switch>
              <Route exact path="/" component={landingPage} />
              <Route path="/main" component={mainPage} />
              <Route path="/groupPage" component={GroupPage} />
              <Route path="/userInfo" component={MyPage} />
              <Route path="/category" component={GroupsByCategoryPage} />
            </Switch>
            <Footer />
          </GroupContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
