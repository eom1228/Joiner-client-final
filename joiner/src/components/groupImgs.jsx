import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import axios from 'axios';
import styled from 'styled-components';

const ImgContents = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-grow: 3;
  flex-basis: 60%;
  position: relative;
  justify-content: center;
  align-items: center;
  border: 0.4rem solid #34314c;
  border-radius: 1rem;
  background-color: white;
`;
const Test = styled.span`
  padding: 6px 20px;
  background-color: beige;
  border-radius: 1rem;
  color: black;
  cursor: pointer;
  justify-content: bottom;
`;
const GroupImgs = ({ host }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { state, dispatch } = useUserContext();
  const { access_token, user } = state;
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group } = groupCurrentState;
  const { fileName, filePath } = group;

  const onChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onSubmit = () => {
    console.log();
    const formData = new FormData();
    formData.append('imgFile', file);
    console.log(formData);

    if (user.id === host) {
      axios
        .post(`https://localhost:4000/upload/groupImg`, formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data',
          },
          data: {
            group_id: group.id,
          },
        })
        .then(res => {
          console.log(res);
          console.log('hehe', host);
          console.log('userid', user.id);
          groupDispatch({
            type: 'GET_GROUPIMG',
            fileName: res.data.fileName,
            filePath: res.data.filePath,
          });

          setMessage('이미지 업로드 완료!');
        })
        .catch(err => console.log(err));
    } else {
      alert('그룹장이 아니세요!');
    }
  };

  return (
    <ImgContents>
      <div className="groupImage">
        {console.log(filePath)}

        <img
          style={{ width: '100%' }}
          src={`https://localhost:4000/groupImgs/${fileName}`}
          alt=""
        />

        <div className="addImage">
          <Test>
            <label for="customFile">
              파일 선택
              <input
                type="file"
                name="imageFile"
                id="customFile"
                onChange={onChange}
                style={{ display: 'none' }}
              />
            </label>
          </Test>
          <button onClick={onSubmit}>업로드</button>
        </div>
      </div>
    </ImgContents>
  );
};

export default GroupImgs;
