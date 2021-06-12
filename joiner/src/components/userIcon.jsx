import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
axios.defaults.withCredentials = true;

const UserIcon = () => {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({});
  const [message, setMessage] = useState('');
  const { state, dispatch } = useUserContext();
  const { access_token, user } = state;
  const [errorMessage, setErrorMessage] = useState('');
  // const imageUrl = URL.createObjectURL(file);
  // const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const getUserIcon = async () => {
      try {
        let res = await axios.get('https://localhost:4000/user/userIcon', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          crossDomain: true,
        });
        if (res.status === 200) {
          dispatch({
            type: 'GET_USERICON',
            fileName: res.data.fileName,
            filePath: res.data.filePath,
          });
          return;
        }
      } catch (e) {
        setErrorMessage(e);
      }
    };
    getUserIcon();
  }, []);

  const onChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const alt = e => {
    return e.target.files[0].name;
  };

  const preview = e => {
    return URL.createObjectURL(e.target.files[0]);
  };
  const onSubmit = async e => {
    console.log();
    e.preventDefault();
    const formData = new FormData();

    formData.append('imgFile', file);
    console.log(formData);

    try {
      const response = await axios.post(
        'https://localhost:4000/upload/userImg',
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('bye');
      const { fileName, filePath } = response.data;

      console.log(response);

      setUploadedImage(fileName, filePath);
      console.log('hey');
      setMessage('이미지 업로드 완료!');
    } catch (err) {
      console.log(err);
      // if (err.response.status === 500) {
      //   console.log(err);
      //   setMessage('서버에 문제가 있네용!');
      // } else {
      //   setMessage(err.response.data.msg);
      // }
    }
  };

  return (
    <>
      {/* form 의 type을 enctype="multipart/form-data" 로 설정해야
    // //       사용자가 전송한 파일을 서버로 전송할 수 있다. */}
      <div className="userImage">
        <div className="addPic">
          <h3>📷 프로필 사진을 추가해주세요 📷</h3>
        </div>
        <img
          style={{ width: '50%' }}
          src={file ? URL.createObjectURL(file) : null}
          alt={file ? file.name : null}
        />
        {/* {uploadedImage ? (
          <img style={{ width: '100%' }} src={uploadedImage.filePath} alt="" />
        ) : null} */}
        <form
          className="form"
          onSubmit={onSubmit}
          action="upload"
          method="post"
          encType="multipart/form-data"
          style={{ textalign: 'center' }}
        >
          <input
            // src={}
            className="file"
            type="file"
            name="imgFile"
            id="customFile"
            onChange={onChange}
          />
          <input type="submit" value="Upload" />
        </form>
      </div>
    </>
  );
};

export default UserIcon;
