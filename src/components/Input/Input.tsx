import React from 'react';

const Input = () => {
  return (
    <div className='mb-5 flex justify-center items-center'>
      <input
        className=' border-2 rounded '
        type='text'
        name='todoName'
        placeholder='wirte your todo'
      />
      <button type='button'>Add Todo</button>
    </div>
  );
};

export default Input;
