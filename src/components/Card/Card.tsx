import React from 'react';

const Card = () => {
  return (
    <div className='duration-300 bg-sky-200 mb-2 cursor-move flex gap-2 p-4 border rounded border-slate-400'>
      <input type='checkbox' />
      <p>청소하기</p>
    </div>
  );
};

export default Card;
