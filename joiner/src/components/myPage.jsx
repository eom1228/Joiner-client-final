import React from 'react';
import Footer from './footer';
import NavBar from './navBar';

const MyPage = props => {
  return (
    <>
      <div>
        <div className="userImage">
          {/* form 의 type을 enctype="multipart/form-data" 로 설정해야 
          사용자가 전송한 파일을 서버로 전송할 수 있다. */}
          <h1 src="">여기 사람사진있어요!!!</h1>
          <form action="upload" method="post" encType="multipart/form-data">
            <input type="file" name="imgFile" id="" />
            <input type="submit" value="" />
          </form>
        </div>
        <div className="userInfo">
          <h1>유저 정보가 있어용</h1>
          <button>정보 수정</button>
        </div>
      </div>
      <div className="userGroups">
        <h1>그룹들이있어용</h1>
      </div>
      <button>회원 탈퇴</button>
    </>
  );
};

export default MyPage;
