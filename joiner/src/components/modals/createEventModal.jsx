import React, { useEffect, useState } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { useUserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

axios.defaults.withCredentials = true;

function map() {
  const container = document.getElementById('eventMap');
  const options = {
    center: new kakao.maps.LatLng(37.561219470965206, 126.99292328986841), //지도 기본좌표
    level: 3,
  };

  const map = new kakao.maps.Map(container, options); //지도 만들어 준것
  // const marker = new kakao.maps.Marker();
  /**************************** 이벤트 리스너 ***************************/

  //지도에 클릭 이벤트 등록
  kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    // 클릭한 위도, 경도 정보를 가져와줌.
    let latlng = mouseEvent.latLng;
    //마커 위치를 클릭한 위치로 옮김.
    setInputs({ ...inputs, lat: latlng.getLat(), lng: latlng.getLng() });
    // console.log(inputs);
    marker.setPosition(latlng);
  });

  //마커에 클릭 이벤트 등록
  /******************************************************************/

  if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude, // 위도
        lon = position.coords.longitude; // 경도

      const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        message = '<div style="padding:100px;">where you are</div>'; // 인포윈도우에 표시될 내용입니다

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
}

const CreateEventModal = ({ isOpen, close, event }) => {
  const [inputs, setInputs] = useState({
    title: '',
    information: '',
    date: '',
    lat: '',
    lng: '',
    limit: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [modalStatus, setModalStatus] = useState({
    // 수정완료 확인 누를 시 모달창 닫아주기 위함
    close: '',
  });

  const { state } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();

  const { token } = state;
  const { group } = groupCurrentState;
  const { events } = group;

  function handleClick() {
    const createGroupEvent = async () => {
      try {
        let res = await axios.post(
          'http://localhost:4000/main/groupPage/createEvent',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            data: {
              group_id: group.id,
              title: inputs.title,
              information: inputs.information,
              limit: inputs.limit, // 확인!!!
            },
            withCredentials: true,
            crossDomain: true,
          },
        );
        if (res.status === 200) {
          setStatusMessage(res.data);
        }
      } catch (e) {
        setStatusMessage(e);
      }
    };

    createGroupEvent(groupDispatch);
  }

  useEffect(() => {
    map();
  }, [inputs]);

  //   useEffect(() => {
  //     // getGroup에서 dep array group.events로 하면 상관 없을듯??
  //     if (createGroupEvent(groupDispatch)) {
  //       const getNewGroupEvent = async () => {
  //         let response = await axios.get('main/groupPage/newEvent', {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             'Content-Type': 'application/json',
  //           },
  //           data: {
  //             data,
  //           },
  //           withCredentials: true,
  //           crossDomain: true,
  //         });
  //         groupDispatch({ type: 'GET_CREATEDEVENT', payload: response.data });
  //       };
  //       getNewGroupEvent(groupDispatch);
  //     }
  //   }, [data]);

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('생성 완료!');
    setModalStatus(close);
  };

  return isOpen ? (
    <>
      <form>
        <p>
          <input
            placeholder="이벤트명"
            value={inputs.title}
            id="eventTitle"
            onChange={handleChange}
            styled="black"
          />
        </p>

        <p>
          <input
            placeholder="활동분야"
            value={inputs.information}
            id="eventContent"
            onChange={handleChange}
          />
        </p>

        <input type="date"></input>

        <p>
          <div id="eventMap"></div>
        </p>
        <p>
          <input
            placeholder="인원 제한수"
            value={inputs.limit}
            id="eventLimit"
            onChange={handleChange}
          />
        </p>

        <button type="submit" onClick={handleClick}>
          생성
        </button>
        <button onClick={close}>취소</button>
      </form>
    </>
  ) : null;
};

export default withRouter(CreateEventModal);
