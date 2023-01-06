import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { IBoard } from '../../types/Types';
import AddModal from '../CardDetail/CardDetail';
import { RxMagnifyingGlass } from 'react-icons/rx';
import CardDetail from '../CardDetail/CardDetail';
import { emptyCard } from '../../constants/boardsData';

interface Props {
  filter: string;
  boards: IBoard[];
  setFilter: Dispatch<SetStateAction<string>>;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}

const Inputs = ({ setBoards, filter, boards, setFilter }: Props) => {
  const [modal, setModal] = useState(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className='py-6 px-10 m-auto w-[95%] border-b-2 mb-5 flex justify-end items-center'>
      <label className=' cursor-pointer ' htmlFor='managerInput'>
        <RxMagnifyingGlass
          className=' hover:text-sky-400 hover:scale-150 duration-150 '
          size={20}
        />
      </label>
      <input
        id='managerInput'
        className=' focus:w-[200px] focus:border  duration-300 px-2 w-0  py-2 rounded-lg text-sm mr-2 bg-white '
        type='text'
        placeholder='검색'
        onBlur={() => setFilter('')}
        value={filter}
        onChange={handleOnChange}
      />
      <div
        onClick={toggleModal}
        className=' border cursor-pointer shadow-xl rounded-lg px-5 py-2 text-center text-sm bg-sky-300 '
      >
        새로 만들기
      </div>
      {modal && (
        <CardDetail
          cardIdx={-1}
          boards={boards}
          setBoards={setBoards}
          toggleModal={setModal}
          item={emptyCard}
        />
      )}
    </div>
  );
};

export default Inputs;
