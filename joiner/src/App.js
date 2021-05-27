import React, { useState, useReducer, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import { GroupContextProvider } from './contexts/GroupContext';
import NavBar from './components/navBar';
// import Login from
// import Signup from
import LandingPage from './pages/landingPage';
import MainPage from './pages/mainPage';
import Footer from './components/footer';
import MyPage from './pages/myPage';
import GroupPage from './pages/groupPage';

import './App.css';

const App = () => {
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
      <Route
        exact
        path="/" // landing이 홈
        render={() => (
          <UserContextProvider>
            <NavBar />
            <LandingPage />
            <Footer />
          </UserContextProvider>
        )}
      />
      <Switch>
        <Route path="/user/login" render={() => <Login />} />
        <Route exact path="/signUp" render={() => <Signup />} />
        <Route
          exact
          path="/main"
          render={() => (
            <UserContextProvider>
              <NavBar />
              <MainPage />
              <Footer />
            </UserContextProvider>
          )}
        />
        <Route
          exact
          path="/user/userInfo"
          render={() => (
            <UserContextProvider>
              <NavBar />
              <MyPage />
              <Footer />
            </UserContextProvider>
          )}
        />
        {/* <Route 
					exact path='/GroupsByCategoryPage' 
					render={() => 
						(<div>
							<NavBar />
							<GroupsByCategory />
							<Footer />
						</div>)
					} 
				/> */}
        <Route
          exact
          path="/main/groupPage"
          render={() => (
            <UserContextProvider>
              {/* <UserStateContext.Provider
              value={useReducer(userReducer, initialState)}
            ></UserStateContext.Provider> */}
              <GroupContextProvider>
                <NavBar />
                <GroupPage />

                <Footer />
              </GroupContextProvider>
            </UserContextProvider>
          )}
        />
      </Switch>
    </>
  );
};

export default withRouter(App);

// function App() {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>Open Modal</button>
//       <ModalTest
//         open={isOpen}
//         onClose={() => {
//           setIsOpen(false);
//         }}
//       >
//         Modal Test
//       </ModalTest>
//     </div>
//   );
// }

// export default App;
