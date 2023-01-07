import { Dispatch, SetStateAction, useState, ChangeEvent, useRef } from 'react';
import { IBoard } from '../../types/Types';
import { RxMagnifyingGlass } from 'react-icons/rx';
import CardDetail from '../CardDetail';
import { emptyCard } from '../../constants/boardsData';

interface Props {
  filter: string;
  boards: IBoard[];
  setFilter: Dispatch<SetStateAction<string>>;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}

const Search = ({ setBoards, filter, boards, setFilter }: Props) => {
  const [modal, setModal] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleblur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const next = e.relatedTarget;
    if (next !== null && filter) {
      searchRef.current?.focus();
      return;
    }
  };

  return (
    <div className='py-6 md:px-10 m-auto w-[95%] border-b-2 mb-5 flex justify-end items-center'>
      <label className=' cursor-pointer ' htmlFor='managerInput'>
        <RxMagnifyingGlass
          className=' hover:text-sky-400 hover:scale-150 duration-150 '
          size={20}
        />
      </label>
      <input
        id='managerInput'
        ref={searchRef}
        className=' focus:w-[200px] block p-0 focus:border  duration-300 focus:px-2 focus:py-2 rounded-lg text-sm mr-2 bg-white w-0 '
        type='text'
        placeholder='검색'
        onBlur={(e) => {
          handleblur(e);
        }}
        value={filter}
        onChange={handleOnChange}
      />
      <div
        onClick={toggleModal}
        className=' border cursor-pointer shadow-xl rounded-lg px-3 py-2 text-center text-sm bg-sky-300  '
      >
        새로 만들기
      </div>
      {modal && (
        <CardDetail
          cardIdx={-20}
          boards={boards}
          setBoards={setBoards}
          toggleModal={setModal}
          item={emptyCard}
        />
      )}
    </div>
  );
};

export default Search;
