import React, { useState, useReducer, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { UserProvider, useUserState, useUserDispatch } from './UserContext';
// import ModalTest from './components/ModalTest';
import NavBar from './components/navBar';
// import Login from
// import Signup from
import LandingPage from './components/landingPage';
import MainPage from './components/mainPage';
import Footer from './components/footer';
import MyPage from './components/myPage';
import GroupPage from './components/groupPage';
import Test from './test';
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

  const [isOpen, setIsOpen] = useState(false);

  return (

    <UserProvider>
      <Test />

      <Route
        exact
        path="/" // landing이 홈
        render={() => (
          <div>
            <NavBar />
            <LandingPage />
            <Footer />
          </div>
        )}
      />
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route exact path="/signUp" render={() => <Signup />} />
        <Route
          exact
          path="/main"
          render={() => (
            <div>
              <NavBar />
              <MainPage user={user} />
              <Footer />
            </div>
          )}
        />
        <Route
          exact
          path="/mypage"
          render={() => (
            <div>
              <NavBar />
              <MyPage user={user} location={location}>
                <User />
              </MyPage>
              <Footer />
            </div>
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
          path="/GroupPage"
          render={() => (
            <div>
              <NavBar />
              <GroupPage />
              <Footer />
            </div>
          )}
        />
      </Switch>
    </UserProvider>

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
