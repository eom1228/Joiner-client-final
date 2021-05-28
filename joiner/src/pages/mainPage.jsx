import React, { useEffect } from 'react';
import '../styles/mainpage.scss';
import { markerData } from '../dummyData/markerData';
import { withRouter } from 'react-router-dom';

const { kakao } = window;

function map() {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.39737615195277, 127.11015137142606), //지도 기본좌표
    level: 3,
  };

  const map = new kakao.maps.Map(container, options); //지도 만들어 준것
  // const marker = new kakao.maps.Marker();
  /**************************** 이벤트 리스너 ***************************/

  // //지도에 클릭 이벤트 등록
  // kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
  //   // 클릭한 위도, 경도 정보를 가져와줌.
  //   let latlng = mouseEvent.latLng;
  //   //마커 위치를 클릭한 위치로 옮김.
  //   marker.setPosition(latlng);
  // });

  //마커에 클릭 이벤트 등록
  /******************************************************************/

  ////// 인포윈도우 생성 //////////

  function test(title) {
    return (
      <>
        <div
          onClick={() => {
            overlay.setMap(null);
          }}
        >
          닫기
        </div>
        <div>그룹이름</div>
        <div>이벤트이름 : {title}</div>
        <div>이벤트 설명</div>
      </>
    );
  }

  //데이터베이스에서 등록한 이벤트 마커 가져오기
  //이 부분 수정해주세요 실제 데이터베이스에서 가져올 것들~
  markerData.forEach(el => {
    const marker = new kakao.maps.Marker({
      map: map, // 마커 표시 될 지도
      position: new kakao.maps.LatLng(el.lat, el.lng),
      clickable: true,
      title: el.title, // 마커에 마우스 1초정도 위치하면 나오는 마커이름
    });
    let content = `
    <div onClick={() => {
      overlay.setMap(null);
    }}>닫기버튼</div>        
    <div>${el.title}</div>
    <div>그룹이름 :</div>
    <div>이벤트 설명 :</div>
    `;
    const overlay = new kakao.maps.CustomOverlay({
      content: content,
      position: marker.getPosition(),
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      overlay.setMap(map);
    });
  });
}

const MainPage = props => {
  useEffect(() => {
    // const script = document.createElement('script');
    // script.async = true;
    // script.src =
    //   '//dapi.kakao.com/v2/maps/sdk.js?appkey=fe59e6a12fa1b1dd06d62fcf138604a2';
    // document.head.appendChild(script);
    map();
  }, []);
  return (
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
  );
};

export default withRouter(MainPage);
