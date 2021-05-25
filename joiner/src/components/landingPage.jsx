import React, { useEffect, useState, useRef } from 'react';
import Card from './card';

//현재스크롤 위치 알아야함
//스크롤 위치 값  컴포넌트한테 전달 시켜줘야함
//컴포넌트 내부에서 상태 값을 들고있어야함.
const LandingPage = props => {
  const [position, setPosition] = useState(0);
  const [hogu, setHogu] = useState(0);
  const ulRef = useRef();
  const section = document.getElementsByTagName('section');
  // const pointBtn = document.querySelectorAll('.pointWrap li');
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
        scroll > section[i].offsetTop - window.outerHeight / 1.5 &&
        scroll <
          section[i].offsetTop -
            window.outerHeight / 1.5 +
            section[i].offsetHeight
      ) {
        page = i;
        setHogu(i);
        pageChange();
        break;
      }
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
    <>
      <ul className="pointWrap" ref={ulRef}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <p className="test">{hogu}</p>
      <section
        className="section1"
        style={{
          backgroundPositionY: position / 4,
          // transform: `translateY(${-position / 20}px)`,
          // opacity: 1 - position / 4000,
          // transform: `perspective(400px) translateZ(${position / 5}px)`,
        }}
      >
        <h1
          style={{
            opacity: 1 - position / 600,
            // transform: `translateX(${position / 3}px)`,
          }}
        >
          삶이 너무 힘들어요
        </h1>
        <p
          style={{
            opacity: (position - 265) / 300,
          }}
        >
          우리의 서비스는 사용자들이 그룹과 이벤트를 만들어 약속된 장소에서 만나
          활동하는 서비스입니다
        </p>
      </section>
      <section className="section2">
        <div>
          <h3>산에서, 공연장에서, 축구장에서</h3>
        </div>
        <div className="innerWrap" id="cardWrapper">
          <Card img="https://cdn.pixabay.com/photo/2016/08/01/20/15/girl-1562025_1280.jpg" />
          <Card img="https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_1280.jpg" />
        </div>
      </section>

      <section>
        <div className="innerWrap">
          <h3>만들고, 참여하고, 잊지 못할 추억으로.</h3>
          <h3>Img</h3>
        </div>
      </section>

      <section>
        <div className="innerWrap">
          <h3>원하는 그룹이 없나요? 그러면 만드세요.</h3>
          <h3>Img</h3>
        </div>
      </section>

      <section>
        <div className="innerWrap">
          <h3>원하는 날짜에 활동을 누군가와 같이.</h3>
          <h3>Img</h3>
        </div>
      </section>

      <section>
        <div className="innerWrap">
          <h3>그룹장이 아니신가요?</h3>
          <h3>그러면 제안하세요.</h3>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
