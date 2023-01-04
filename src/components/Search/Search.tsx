import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { IBoard } from '../../types/Types';

interface Props {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}

const Search = ({ setBoards, filter, setFilter }: Props) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className='mb-5 flex justify-center items-center'>
      <input
        className=' border-2 rounded '
        type='text'
        placeholder='담당자 입력'
        value={filter}
        onChange={handleOnChange}
      />
      <button type='button'>Add Todo</button>
    </div>
  );
};

export default Search;
