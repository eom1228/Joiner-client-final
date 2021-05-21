import React, { useState } from 'react';

const SignUpButton = props => {
  [isOpen, setIsOpen] = useState(false);

  openModal = () => {
    setIsOpen(true);
  };
  closeModal = () => {
    setIsOpen(false);
  };
  return <></>;
};

export default SignUpButton;
