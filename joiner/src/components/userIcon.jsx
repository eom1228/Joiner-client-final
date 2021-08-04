import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
axios.defaults.withCredentials = true;

const UserIcon = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { state, dispatch } = useUserContext();
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group } = groupCurrentState;
  const { access_token, user } = state;
  const { filePath, fileName } = user;

  const onChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

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
      .then(res => {
        dispatch({
          type: 'GET_USERICON',
          fileName: res.data.fileName,
          filePath: res.data.filePath,
        });
        console.log('되라', fileName);
      })
      .catch(err => setMessage(err));
  };

  return (
    <>
      <div className="userImage">
        <div className="addPic">
          <h3>📷 프로필 사진을 추가해주세요 📷</h3>
        </div>
        <div>
          <img
            style={{ width: '100%' }}
            src={`https://localhost:4000/userImgs/${fileName}`}
            alt=""
          />
        </div>
        <input
          type="file"
          className="imageFile"
          name="imageFile"
          onChange={onChange}
        />
        <button onClick={onSubmit}>업로드</button>
      </div>
    </>
  );
};

export default UserIcon;
