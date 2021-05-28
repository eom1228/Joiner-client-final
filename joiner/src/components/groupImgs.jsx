import React from 'react';
// import { useGroupContext } from '../GroupContext';
import useImgHandlers from './custom/useImgHandler';
// import ImgSlider from './Slider/imgSlider';
import './groupImgs.css';

const Input = props => (
  <input
    type="file"
    accept="image/*"
    name="img-loader-input"
    multiple
    {...props}
  />
);

const GroupImgs = () => {
  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
  } = useImgHandlers();

  return (
    <div id="groupImgContainer">
      <form className="form" onSubmit={onSubmit}>
        {status === 'IMGS_UPLOADED' && (
          <div className="success-container">
            <div>
              <h2>업로드 완료!</h2>
              <small>뭐해? 업로드 됬다니까</small>
            </div>
          </div>
        )}
        <div>
          <Input onChange={onChange} />
          <button type="submit">등록</button>
        </div>
        <div>
          {files.map(({ file, src, id }, index) => (
            <div
              style={{
                opacity: uploaded[id] ? 0.2 : 1,
              }}
              key={`thumb${index}`}
              className="thumbnail-wrapper"
            >
              <img className="thumbnail" src={src} alt="" />
              <div className="thumbnail-caption">{file.name}</div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default GroupImgs;

//   const [fileState, setFileState] = useState({
//     pending: [], // 현재 어떤 이미지를 업로드 중인지 알기 위함
//     next: null, // pending의 다음 이미지
//     uploading: false,
//     uploaded: {},
//     status: 'waiting',
//   });

//   const uploadImg = () => {
//     dispatchEvent({ type: 'UPLOAD_IMG', payload: imgs });
//   };

//   return (
//     <div className="groupImg">
//       <h1>그룹 이미지가 들어갈꺼에요</h1>
//       <ImgSlider imgs={imgs} />
//       <button>{gearIcon}</button>
//       {/* 로컬에 있는 아이콘 가져와서 버튼으로 쓰기! */}
//     </div>
//   );
// };
