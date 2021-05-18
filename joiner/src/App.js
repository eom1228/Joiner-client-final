import ModalTest from './components/ModalTest';
import './App.css';
import React, { useState } from 'react';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <ModalTest
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        Modal Test
      </ModalTest>
    </div>
  );
}

export default App;
