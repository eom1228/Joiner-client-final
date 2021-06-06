import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
axios.defaults.withCredentials = true;

const UserIcon = () => {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({});
  const [message, setMessage] = useState('');
  const { state, dispatch } = useUserContext();
  const { access_token, user } = state;
  const onChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onSubmit = async e => {
    console.log();
    e.preventDefault();
    const formData = new FormData();
    formData.append('imgFile', file);
    console.log(formData);

    try {
      await axios.post('https://localhost:4000/upload', formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const { fileName, filePath } = response.data;
      console.log(response);

      setUploadedImage({ fileName, filePath });

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
        {uploadedImage ? (
          <img style={{ width: '100%' }} src={uploadedImage.filePath} alt="" />
        ) : null}
        <form
          onSubmit={onSubmit}
          action="upload"
          method="post"
          encType="multipart/form-data"
        >
          <input
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
