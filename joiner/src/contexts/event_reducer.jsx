import React, { useReducer } from 'react';

export default function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_NEARBY_EVENTS':
      return;
    case 'JOIN_EVENT':
      return;
    case 'CANCEL_ATTENDANCE':
      return;
  }
}

// ----------------------   아래는 주최자가 하는짓,, 이벤트 페이지에서 따로 정의할 것
// 		case 'CREATE_EVENT':
// 			return;
// 		case 'CANCEL_EVENT':
// 			return;
//     }
// }
