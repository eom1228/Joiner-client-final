module.exports = {
  extends: ['plugin:prettier/recommended'], // prettier 포매팅 기능을 eslint에 추가
  parser: 'babel-eslint', // 이 기능을 사용해야 import 시 오류가 뜨지 않습니다.
};
