import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const UserIcon = () => {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({});
  const [message, setMessage] = useState('');

  const onChange = e => {
    setFile(e.target.file);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    console.log('hi');
    try {
      const response = await axios.patch('/upload', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('bye');
      const { fileName, filePath } = response.data;
      console.log('sup');
      setUploadedImage({ fileName, filePath });
      console.log('hey');
      setMessage('이미지 업로드 완료!');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('서버에 문제가 있네용!');
      } else {
        setMessage(err.response.data.msg);
      }
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
