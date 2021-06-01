import React, { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import axios from 'axios';
import DefaultImg from '../images/image-file.png';

const GroupImgs = ({ host }) => {
  const [imgFile, setImgFile] = useState(DefaultImg);
  const [fileUrl, setFileUrl] = useState('');
  // const [accessToken, setAccessToken] = useState('');
  const { state, dispatch } = useUserContext();
  const { access_token, user } = state;
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group } = groupCurrentState;
  const maxNum = 3;

  const uploadFile = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imgFile', e.target.files);
    formData.append('fileUrl', fileUrl);

    await axios
      .patch('/group/groupImg', formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setImgFile(res.data);
        alert('파일이 업로드 되었습니다.');
        console.log('SUCCESS');
      })
      .catch(err => {
        alert('파일 업로드 실패하셨습니다.');
        console.log('FAILED');
      });
  };
  useEffect(() => {
    const getImgs = async e => {
      await axios
        .get('/group/groupImg', {
          headers: {
            // Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
          crossDomain: true,
        })
        .then(res => {
          setImgFile(res.data);
          console.log('SUCCESS');
        })
        .catch(err => {
          // alert('사진을 불러오지 못했습니다');
          console.log('FAILED TO GET IMAGES');
        });
    };
    getImgs();
  }, [imgFile]);

  const changeFile = e => {
    setImgFile(e.target.files);
    setFileUrl(fileUrl.createObjectURL(e.target.file[0]));
  };
  const cancelFile = e => {
    setImgFile(DefaultImg);
    setFileUrl('');
  };
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
          user.userName !== host.userName
            ? alert('그룹장이 아니세요!')
            : uploadFile;
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

export default GroupImgs;
