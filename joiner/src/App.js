// import ModalTest from '../../ModalTest';
import './App.css';
import React, { useState } from 'react';
import MyPage from './components/myPage';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  return <MyPage />;
}

export default App;
