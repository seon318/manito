import React from 'react';
import './ManitoAssigner.scss';

export default function ManitoAssigner({ assignManitto }) {
  return (
    <div>
      <button type='button' onClick={assignManitto} className='assign-btn'>
        마니또 배정
      </button>
    </div>
  );
}
