import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
axios.defaults.withCredentials = true;

const UserIcon = () => {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({});
  const [message, setMessage] = useState('');
  const [userIcon, setUserIcon] = useState('');
  const { state, dispatch } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group } = groupCurrentState;
  const { access_token, user } = state;
  const { filePath, fileName } = user;
  const [errorMessage, setErrorMessage] = useState('');
  // const imageUrl = URL.createObjectURL(file);
  // const [fileUrl, setFileUrl] = useState(null);

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

  // useEffect(() => {
  //   const getUserIcon = async () => {
  //     try {
  //       let res = await axios.get('https://localhost:4000/uploads', {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //           'Content-Type': 'application/json',
  //         },
  //         withCredentials: true,
  //         crossDomain: true,
  //       });
  //     } catch (e) {
  //       setErrorMessage(e);
  //     }
  //   };
  //   getUserIcon();
  // }, []);

  const onSubmit = () => {
    console.log();
    const formData = new FormData();

    formData.append('imageFile', file);
    console.log(formData);

    axios
      .post('https://localhost:4000/upload/userImg', formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      //application/json
      //multipart/form-data
      .then(res => {
        console.log(res.data);
        const { fileName, filePath } = res.data;
        setUploadedImage(fileName, filePath);
      })
      .catch(err => setMessage(err));

    // if (err.response.status === 500) {
    //   console.log(err);
    //   setMessage('서버에 문제가 있네용!');
    // } else {
    //   setMessage(err.response.data.msg);
    // }
  };

  return (
    <>
      {/* form 의 type을 enctype="multipart/form-data" 로 설정해야
    // //       사용자가 전송한 파일을 서버로 전송할 수 있다. */}
      <div className="userImage">
        <div>
          {!uploadedImage.fileName || !uploadedImage.filePath ? (
            <img
              style={{ width: '100%' }}
              src={`https://localhost:4000/userImgs/${fileName}`}
              alt=""
            />
          ) : (
            <img
              style={{ width: '100%' }}
              src={`https://localhost:4000/userImgs/${uploadedImage.fileName}`}
              alt=""
            />
          )}
        </div>

        {/* {uploadedImage ? (
          <img style={{ width: '100%' }} src={uploadedImage.filePath} alt="" />
        ) : null} */}
        {/* <form
          className="form"
          onSubmit={onSubmit}
          action="upload"
          method="post"
          encType="multipart/form-data"
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
        </form> */}
        <input type="file" name="imageFile" onChange={onChange} />
        <button onClick={onSubmit}>업로드</button>
      </div>
    </>
  );
};

export default UserIcon;
