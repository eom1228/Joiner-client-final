import React from 'react';

const ModalTest = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <>
      <button onClick={onClose}>Close Modal</button>
      {children}
    </>
  );
};

export default ModalTest;
