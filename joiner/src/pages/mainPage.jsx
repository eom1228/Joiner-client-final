import React from 'react';
// import Footer from './footer';
// import NavBar from './navBar';

const MainPage = props => {
  return (
    <>
      {/* <NavBar /> */}
      <div>
        <div>
          <h1>이쁜이미지 + 그룹생성 해보실래용? (img)</h1>
        </div>
      </div>
      <div>
        <div>
          <h1>맵</h1>
        </div>
        <div>
          <ul>
            <li>이벤트</li>
            <li>이벤트</li>
          </ul>
        </div>
      </div>
      {/* <Footer /> */}

      <div id="maincontainer">
        <section className="mainSection1">
          <div>
            <h1>그룹생성 해보실래용? (img)</h1>
          </div>
        </section>

        <section className="mainSection2">
          <div id="map">
            <h1>맵</h1>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainPage;
