import React, { useState, useEffect } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { useGroupContext } from '../contexts/GroupContext';
import axios from 'axios';
import DefaultImg from '../images/image-file.png';

const GroupImgs = ({ host }) => {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState({});
  const [message, setMessage] = useState('');
  const { state, dispatch } = useUserContext();
  const { access_token, user } = state;
  const { groupCurrentState, groupDispatch } = useGroupContext();
  const { group } = groupCurrentState;

  const onChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onSubmit = async e => {
    console.log();
    e.preventDefault();
    const formData = new FormData();
    formData.append('imgFile', file, file.name);
    console.log(formData);

    try {
      await axios.post(`https://localhost:4000/upload/${file.name}`, formData, {
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
    }
  };

  return (
    <>
      {/* form 의 type을 enctype="multipart/form-data" 로 설정해야
// //       사용자가 전송한 파일을 서버로 전송할 수 있다. */}
      <div className="groupImage">
        {uploadedImage ? (
          <img style={{ width: '100%' }} src={uploadedImage.filePath} alt="" />
        ) : null}
        <form
          onSubmit={e => {
            user.id !== host.id ? alert('그룹장이 아니세요!') : onSubmit;
          }}
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

//   return (
//     <div className="imagePreview-container">
//       <input
//         className="image-selector"
//         type="file"
//         id="input"
//         accept="image/jpg,image/png,image/jpeg,image/gif"
//         multiple
//         max={maxNum}
//         onChange={previewFile}
//       />
//       <button
//         className="image-upload"
//         onClick={e => {
//           user.id !== host.id
//             ? alert('그룹장이 아니세요!')
//             : uploadFile;
//         }}
//       >
//         업로드
//       </button>
//       <button className="image-change" onClick={changeFile}>
//         수정
//       </button>
//       <button className="image-delete" onClick={cancelFile}>
//         삭제
//       </button>
//     </div>
//   );
// };

export default GroupImgs;
