import React, { useEffect, useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Card from '../components/card';
import '../styles/landingpage.scss';
//현재스크롤 위치 알아야함
//스크롤 위치 값  컴포넌트한테 전달 시켜줘야함
//컴포넌트 내부에서 상태 값을 들고있어야함.
const LandingPage = props => {
  const [position, setPosition] = useState(0);
  const history = useHistory();

  const ulRef = useRef();
  const hoguRef = useRef();
  const textRef = useRef();
  const text2Ref = useRef();
  const text3Ref = useRef();
  const graphRef = useRef();

  const section = document.getElementsByTagName('section');
  let page = 0;
  let scroll = 0;
  function onScroll() {
    // console.log(window.scrollY);
    setPosition(window.scrollY);
    scroll = window.scrollY;
    scrollPage();
  }

  function scrollPage() {
    for (let i = 0; i < section.length; i++) {
      if (
        scroll > section[i].offsetTop &&
        scroll < section[i].offsetTop + section[i].offsetHeight
      ) {
        page = i;
        pageChange();
        break;
      }
    }
    if (
      scroll > section[1].offsetTop - 100 &&
      scroll < section[1].offsetTop + section[1].offsetHeight
    ) {
      textRef.current.classList.add('active');
      text2Ref.current.classList.add('active');
      text3Ref.current.classList.add('active');
      hoguRef.current.classList.add('active');
      graphRef.current.classList.add('active');
    } else if (scroll > section[1].offsetHeight) {
      textRef.current.classList.remove('active');
      text2Ref.current.classList.remove('active');
      text3Ref.current.classList.remove('active');
      hoguRef.current.classList.remove('active');
      graphRef.current.classList.remove('active');
    }
  }

  function pageChange() {
    for (let i = 0; i < section.length; i++) {
      // pointBtn[i].classList.remove('active');

      ulRef.current.children[i].classList.remove('active');
    }
    // pointBtn[page].classList.add('active');
    ulRef.current.children[page].classList.add('active');
  }

  useEffect(() => {
    //첫 마운트시 윈도우에 scroll 이벤트 등록
    window.addEventListener('scroll', onScroll);
    const lists = ulRef.current.children;
    for (let i = 0; i < lists.length; i++) {
      lists[i].onclick = () => {
        page = i;
        pageChange();
        console.log('working');
        window.scrollTo({
          top: section[page].offsetTop,
          behavior: 'smooth',
        });
      };
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []); //마운트 시 한 번만 실행되게.

  return (
    <div id="firstContainer">
      <ul className="pointWrap" ref={ulRef}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <section
        className="section section1"
        style={{
          backgroundPositionY: position / 4,
          // transform: `translateY(${-position / 20}px)`,
          // opacity: 1 - position / 4000,
          // transform: `perspective(400px) translateZ(${position / 5}px)`,
        }}
      >
        <h1
          style={{
            opacity: 1 - position / 300,
            // transform: `translateX(${position / 3}px)`,
          }}
        >
          JOINER
        </h1>
        <p
          style={{
            opacity: (position - 100) / 100,
          }}
          id="serviceDesc"
        >
          우리의 서비스는 사용자들이 그룹과 이벤트를 만들어 약속된 장소에서 만나
          활동하는 서비스입니다
        </p>
      </section>
      <section className="section">
        <div className="animated-title">
          <div className="text-top">
            <div className="hogu" ref={hoguRef}>
              <span className="text" ref={textRef}>
                참여하고
              </span>
              <span className="text2" ref={text2Ref}>
                만들고
              </span>
            </div>
          </div>
          <div className="text-bottom">
            <div ref={text3Ref}>잊지 못할 추억으로.</div>
          </div>
          <div className="graph" ref={graphRef}>
            {' '}
            <img
              src="https://cdn.pixabay.com/photo/2015/10/12/15/05/girl-984155_1280.jpg"
              alt="graphImage"
              className="graph_img"
            />
          </div>
        </div>
      </section>

      <section className="section section3">
        <div className="item2">
          <span>산에서, </span>
          <span>공연장에서, </span>
          <span>축구장에서, </span>
          <p>사람들과 함께하세요</p>
        </div>
        <div id="cardWrapper">
          <Card img="https://cdn.pixabay.com/photo/2016/08/01/20/15/girl-1562025_1280.jpg" />
          <Card img="https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_1280.jpg" />
          <Card img="https://cdn.pixabay.com/photo/2020/03/13/23/13/girls-4929292_1280.jpg" />
        </div>
      </section>

      <section className="section section4">
        <div className="innerWrap">
          <div className="innerItemHeader">
            <h3>원하는 그룹이 없나요? 그러면 만드세요.</h3>
            <p>어떤 활동을 하든, 그룹을 만들어 사람들과 함께할 수 있답니다.</p>
          </div>
          <div className="innerItemImage">
            {/* <img src="" alt="groupImage" className="groupImage" /> */}
          </div>
        </div>

        <div className="innerWrap">
          <div className="innerItemHeader2">
            <h3>원하는 날짜에 활동을 누군가와 같이.</h3>
            <p>HELP </p>
          </div>
          <div className="innerItemImage">
            {/* <img src="" alt="groupImage" className="groupImage" /> */}
          </div>
        </div>
      </section>

      <section className="section section5">
        <div className="innerWrap">
          <h3>그룹장이 아니신가요?</h3>
          <p>채팅방을 활용하여 사람들에게 이벤트를 제안할 수 있습니다.</p>
          <div>
            <img
              src="https://images.pexels.com/photos/6422563/pexels-photo-6422563.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="이미지"
            />
          </div>
          <button
            onClick={() => {
              history.push('/main');
            }}
            className="btn_toMain"
          >
            지금 Joiner와 함께하세요
          </button>
        </div>
      </section>
    </div>
  );
};
export default withRouter(LandingPage);
