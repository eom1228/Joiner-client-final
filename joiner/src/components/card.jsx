import React from 'react';

const Card = props => {
  return (
    <>
      <div className="card">
        {/* <h3>사진사진사진사진</h3> */}
        <img src={props.img} alt="card" className="card_img" />
      </div>
    </>
  );
};

export default Card;
