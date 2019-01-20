import React from 'react';
import rotationImg from '../../../public/assets/pluto-rotation.gif';

const Hello = () => {
  return (
    <div>
      <img src={rotationImg} alt="intro gif" />
      <h1>Welcome to Pluto Rotation System.</h1>
    </div>
  );
};

export default Hello;
