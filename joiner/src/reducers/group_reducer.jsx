import React, { useReducer } from 'react';

export default function reducer(state, action) {
  switch (action.type) {
    case 'JOIN_GROUP': // 유저가 속한 그룹 => 멤버
      return {
        ...state,
        user: {
          ...state.user,
          [user.group]: [
            // 유저가 속한 그룹목록에 새로 가입한 그룹 추가하기
            ...state.user[user.group],
            action.payload,
          ],
        },
      };

    case 'LEAVE_GROUP':
      return {
        ...state,
        user: {
          ...state.user,
          [user.group]: [
            // ...state.user[user.group]
            state.user.group.filter(
              group => group.id !== action.payload.group.id,
            ),
          ],
        },
      };
  }
}

// -------------------

// case 'CREATE_GROUP':    // 유저가 그룹장 ,, 그룹장 상태 그룹페이지에 만들어서 별도로 관리해도됨
// // return {
// // // 	...state,
// // // 	user: {
// // // 		...state.user,
// // // 		[user.group]: {
// // // 			...state.user[user.group],
// // // 			[userId]: action.userId
// // // 		}
// // // 	}
// // // };
// case 'DELETE_GROUP':
// return;

// }
