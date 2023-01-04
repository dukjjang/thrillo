import React from 'react';

const Board = () => {
  return (
    <main className='flex'>
      <div id='todo' className=' border w-[500px] h-[700px] p-5'></div>
      <div id='inProgress' className=' border w-[500px] h-[700px] p-5'></div>
      <div id='completed' className=' border w-[500px] h-[700px] p-5'></div>
    </main>
  );
};

export default Board;
