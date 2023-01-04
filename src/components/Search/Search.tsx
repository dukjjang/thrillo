import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { IBoard } from '../../types/Types';
import AddModal from '../AddModal/AddModal';

interface Props {
  filter: string;
  boards: IBoard[];
  setFilter: Dispatch<SetStateAction<string>>;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}

const Search = ({ setBoards, filter, boards, setFilter }: Props) => {
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
        className=' py-2 border-2 rounded '
        type='text'
        placeholder='담당자 입력'
        value={filter}
        onChange={handleOnChange}
      />
      <div
        onClick={toggleModal}
        className=' border cursor-pointer  shadow-md   rounded px-5 py-2  text-center text-lg'
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

export default Search;
