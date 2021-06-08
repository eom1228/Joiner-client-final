import React, { useEffect, useState } from 'react';
import { useGroupContext } from '../../contexts/GroupContext';
import { useUserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import '../../styles/createEventModal.scss';

axios.defaults.withCredentials = true;
/*global kakao*/

const CreateEventModal = ({ isOpen, handleModal, close, event }) => {
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
  function setLatLng(lat, lng) {
    setInputs({ ...inputs, lat: lat, lng: lng });
  }
  function map() {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=fe59e6a12fa1b1dd06d62fcf138604a2';
    document.head.appendChild(script);

    script.onload = () => {};
  }
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
              lat: inputs.lat,
              lng: inputs.lng,
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
  }

  useEffect(() => {
    if (isOpen === true) {
      // map();

      const container = document.getElementById('eventMap');
      const options = {
        center: new kakao.maps.LatLng(37.561219470965206, 126.99292328986841), //지도 기본좌표
        level: 3,
      };

      const map = new kakao.maps.Map(container, options); //지도 만들어 준것

      // 지도를 클릭한 위치에 표출할 마커입니다
      var marker = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        map: map,
        position: new kakao.maps.LatLng(inputs.lat, inputs.lng),
      });
      // 지도에 마커를 표시합니다
      marker.setMap(map);
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;
        const latLng = { lat: latlng.getLat(), lng: latlng.getLng() };
        // setLatLng(latLng.lat, latLng.lng);
        setInputs({ ...inputs, lat: latlng.getLat(), lng: latlng.getLng() });
        marker.setPosition(latlng);
        console.log(inputs);
      });
    }

    return () => {
      map();
    };
  }, [isOpen, inputs]);

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
    if (e.target.id === 'limit') {
    }
  };

  return (
    <div className="createEventModal" onClick={handleModal}>
      <div
        className="groupEventModal"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="eventContentBox">
          <form>
            <input
              placeholder="이벤트명"
              type="text"
              value={inputs.title}
              id="title"
              onChange={handleChange}
              styled="black"
            />

            <input
              placeholder="활동분야"
              type="text"
              value={inputs.information}
              id="information"
              onChange={handleChange}
            />

            <input type="date"></input>

            <input
              placeholder="인원 제한수"
              value={inputs.limit}
              id="limit"
              type="number"
              pattern="^-?[0-9]\d*\.?\d*$"
              onChange={handleChange}
            />

            <button type="submit" onClick={handleClick}>
              생성
            </button>
            <button onClick={close}>취소</button>
          </form>
          <div id="eventMap" style={{ height: '200px' }}>
            맵
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateEventModal);
