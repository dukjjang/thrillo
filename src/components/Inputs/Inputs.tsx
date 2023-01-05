import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { IBoard } from '../../types/Types';
import AddModal from '../AddModal/AddModal';

interface Props {
  filter: string;
  boards: IBoard[];
  setFilter: Dispatch<SetStateAction<string>>;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}

const Inputs = ({ setBoards, filter, boards, setFilter }: Props) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className=' mb-5 flex justify-center items-center'>
      <input
        className='px-10 w-[200px] py-2 rounded-lg text-sm mr-2 bg-white '
        type='text'
        placeholder='담당자 검색'
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
        <AddModal
          boards={boards}
          setBoards={setBoards}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
};

export default Inputs;
