import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-dom';
import axios from 'axios';
import DefaultImg from '../../images/image-file.png';

const userIconModal = () => {
  const [imgFile, setImgFile] = useState(DefaultImg);
  const [fileUrl, setFileUrl] = useState('');
  const maxNum = 3;

  //서버에 파일들 전송
  const uploadFile = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imgFile', e.target.files);
    formData.append('fileUrl', fileUrl);
    axios
      .patch(
        'https://joiner.com/main/groupPage/groupImg/groupImgUpload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        alert('파일이 업로드 되었습니다.');
        console.log('SUCCESS');
      })
      .catch(err => {
        alert('파일 업로드 실패하셨습니다.');
        console.log('FAILED');
      });
  };

  //파일 수정
  const changeFile = e => {
    setImgFile(e.target.files);
    setFileUrl(fileUrl.createObjectURL(e.target.file[0]));
  };

  //파일 reset
  const cancelFile = e => {
    setImgFile(DefaultImg);
    setFileUrl('');
  };

  //파일 미리보기
  const previewFile = e => {
    if (e.target.files.length) {
      let imgSelect = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(imgSelect);
      reader.onload = () => {
        setImgFile(e.target.result);
      };
    } else {
      setImgFile(DefaultImg);
    }
  };

  return (
    <div className="imagePreview-container">
      <input
        className="image-selector"
        type="file"
        id="input"
        accept="image/jpg,impge/png,image/jpeg,image/gif"
        multiple
        max={maxNum}
        onChange={previewFile}
      />
      <button
        className="image-upload"
        onClick={e => {
          uploadFile;
        }}
      >
        업로드
      </button>
      <button
        className="image-change"
        onClick={e => {
          changeFile;
        }}
      >
        수정
      </button>
      <button
        className="image-delete"
        onClick={e => {
          cancelFile;
        }}
      >
        삭제
      </button>
    </div>
  );
};
export default withRouter(userIconModal);
