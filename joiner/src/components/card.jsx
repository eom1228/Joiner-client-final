import React from 'react';

const Card = props => {
  return (
    <>
      <div className="card">
        <img src={props.img} alt="card" className="card_img" />
      </div>
    </>
  );
};

export default Card;
