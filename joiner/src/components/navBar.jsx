import React from 'react';

const NavBar = props => {
  return (
    <>
      <nav>
        <img src="" alt="" />
        {/* 게스트일 때 */}
        <button>Signup</button>
        <button>Login</button>
        {/* 로그인 상태일 때 */}
        <button>MyPage</button>
        <button>Events</button>
        <button>Groups</button>
        <button>Logout</button>
      </nav>
    </>
  );
};

export default NavBar;
