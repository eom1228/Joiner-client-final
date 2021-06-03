import React, { useEffect, useContext } from 'react';
import '../styles/mainpage.scss';
import { markerData } from '../dummyData/markerData';
import axios from 'axios';

import { useUserContext } from '../contexts/UserContext';

// import { withRouter } from 'react-router-dom';

const { kakao } = window;

function map() {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(37.561219470965206, 126.99292328986841), //지도 기본좌표
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

  if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude, // 위도
        lon = position.coords.longitude; // 경도

      const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        message = '<div style="padding:100px;">폭격 위치 장소</div>'; // 인포윈도우에 표시될 내용입니다

      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);
    });
  } else {
    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    const locPosition = new kakao.maps.LatLng(
        37.561219470965206,
        126.99292328986841,
      ),
      message = '사용자가 어딨는지 모르겠어요 !';

    displayMarker(locPosition, message);
  }
  // 지도에 마커와 인포윈도우를 표시하는 함수입니다
  function displayMarker(locPosition, message) {
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    const iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
  }

  //데이터베이스에서 등록한 이벤트 마커 가져오기
  //이 부분 수정해주세요 실제 데이터베이스에서 가져올 것들~
  markerData.forEach(el => {
    let marker = new kakao.maps.Marker({
      map: map, // 마커 표시 될 지도
      position: new kakao.maps.LatLng(el.lat, el.lng),
      // clickable: true,
      title: el.title, // 마커에 마우스 1초정도 위치하면 나오는 마커이름
    });

    let content = `<div class="markerContent">
    <div class="groupTitle"><span>${el.title}</span></div>
    <div class="groupContent"><span>그룹 : ${el.group}</span></div>
    </div>`;
    let overlay = new kakao.maps.CustomOverlay({
      content: content,
      position: marker.getPosition(),
      yAnchor: 0,
    });

    kakao.maps.event.addListener(marker, 'mouseover', function () {
      overlay.setMap(map);
    });
    kakao.maps.event.addListener(marker, 'mouseout', function () {
      overlay.setMap(null);
    });
  });
}

const MainPage = props => {
  const { state, dispatch } = useUserContext();
  const { user, access_token } = state;
  console.log(state);
  function testzzizzi() {
    axios
      .post('https://localhost:4000/main/createGroup', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        data: {
          title: 'assscweqvewvcwevcwed',
          locations: 'asd',
          information: 'asd',
          groupIntroduce: 'asd',
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => {});
  }
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
          <button onClick={testzzizzi}>뻐뜬</button>
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

export default MainPage;
