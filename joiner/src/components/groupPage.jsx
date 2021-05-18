import React from 'react';
import Footer from './footer';
import NavBar from './navBar';

const GroupPage = props => {
  return (
    <>
      <NavBar />
      <div className="groupImgSummaryWrapper">
        <div className="groupImg">
          <h1>그룹 이미지가 들어갈꺼에요</h1>
        </div>
        <div className="groupSummary">
          <h1>
            groupTitle 등 ul li 카테고리 호스트 멤버수 로케이션 등이
            들어갈꺼에요
          </h1>
        </div>
      </div>
      <div className="groupInfoEventsWrapper">
        <div>
          <div className="groupFilterBtnWrapper">
            <button>정보</button>
            <button>회원</button>
            <button>채팅</button>
          </div>
          <div className="groupInfo">
            <p>그룹에 대한 정보가 들어갈꺼에요</p>
          </div>
        </div>
        <div>
          <div>
            <button>그룹 가입</button>
            {/* 그룹 가입 시 이벤트 생성, 그룹탈퇴 버튼 추가 */}
            <button>이벤트 생성</button>
            <button>그룹 탈퇴</button>
            {/* <button>수정</button> 그룹장일경우 수정버튼추가 */}
          </div>
          <div>
            <p>그룹 이벤트들이 들어갈 거에요.</p>
            <ul>
              <li>이벤트</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GroupPage;
