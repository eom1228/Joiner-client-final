import React, { useCallback, useEffect, useReducer, useRef } from 'react';

const api = {
  uploadImg({ timeout = 500 }) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  },
};

const logUploadedImg = (num, color = 'green') => {
  const msg = `%cUploaded ${num} images.`;
  const style = `color:${color};font-weight:bold;`;
  console.log(msg, style);
};

const LOADED = 'LOADED';
const INIT = 'INIT';
const PENDING = 'PENDING';
const IMGS_UPLOADED = 'IMGS_UPLOADED';
const UPLOAD_ERROR = 'UPLOAD_ERROR';

const initialState = {
  files: [],
  pending: [],
  next: null,
  uploading: false,
  uploaded: {},
  status: 'waiting',
};

//   const [fileState, setFileState] = useState({
//     pending: [], // 현재 어떤 이미지를 업로드 중인지 알기 위함
//     next: null, // pending의 다음 이미지
//     uploading: false,
//     uploaded: {},
//     status: 'waiting',
//   });

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return { ...state, files: action.files, status: LOADED };
    case 'SUBMIT':
      return { ...state, uploading: true, pending: state.files, status: INIT };
    case 'NEXT':
      return {
        ...state,
        next: action.next,
        status: PENDING,
      };
    case 'IMG-UPLOADED':
      return {
        ...state,
        next: null,
        pending: action.pending,
        uploaded: {
          ...state.uploaded,
          [action.prev.id]: action.prev.file,
        },
      };
    case 'IMGS-UPLOADED':
      return { ...state, uploading: false, status: IMGS_UPLOADED };
    case 'SET-UPLOAD-ERROR':
      return { ...state, uploadError: action.error, status: UPLOAD_ERROR };
    default:
      return state;
  }
};

const useImgHandlers = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (state.files.length) {
        dispatch({ type: 'SUBMIT' });
      } else {
        window.alert('사진을 추가하세요!');
      }
    },
    [state.files.length],
  );

  const onChange = e => {
    if (e.target.files.length) {
      const arrImgs = Array.from(e.target.files);
      const files = arrImgs.map((file, index) => {
        const src = window.URL.createObjectURL(file);
        return { file, id: index, src };
      });
      dispatch({ type: 'LOAD', files });
    }
  };

  useEffect(() => {
    if (state.pending.length && state.next === null) {
      const next = state.pending[0];
      dispatch({ type: 'NEXT', next });
    }
  }, [state.next, state.pending]);

  const countRef = useRef(0);

  useEffect(() => {
    if (state.pending.length && state.next) {
      const { next } = state;
      api
        .uploadImg(next)
        .then(() => {
          const prev = next;
          logUploadedImg(++countRef.current);
          const pending = state.pending.slice(1);
          dispatch({ type: 'IMG-UPLOADED', prev, pending });
        })
        .catch(error => {
          console.error(err);
          dispatch({ type: 'SET-UPLOAD-ERROR', error });
        });
    }
  }, [state]);

  useEffect(() => {
    if (!state.pending.length && state.uploading) {
      dispatch({ type: 'IMGS-UPLOADED' });
    }
  }, [state.pending.length, state.uploading]);
  return {
    ...state,
    onSubmit,
    onChange,
  };
};

export default useImgHandlers;
