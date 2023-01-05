import {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { IBoard } from '../../types/Types';
import DropDown from '../DropDown/DropDown';
import { states } from '../../constants/dropList';
import SearchManager from '../SearchManager';

interface Props {
  toggleModal: () => void;
  boards: IBoard[];
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}
const AddModal = ({ toggleModal, boards, setBoards }: Props) => {
  const [value, setValue] = useState({
    id: Math.random(),
    title: '',
    content: '',
    deadLine: '',
    state: '',
    manager: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tempBoards = [...boards];

    const targetBoardIndex = Number(
      tempBoards.findIndex((board) => board.state === value.state)
    );

    const targetBoard = tempBoards.filter(
      (board) => board.state === value.state
    )[0];

    targetBoard.cards.push(value);
    tempBoards[targetBoardIndex] = targetBoard;

    setBoards(tempBoards);
    toggleModal();
  };

  return (
    <div className=' fixed top-0 left-0 w-full h-screen '>
      <div className='  flex justify-center items-center bg-[rgba(0,0,0,0.2)]  h-screen'>
        <form
          onSubmit={handleSubmit}
          className=' bg-white py-20 px-20 w-[60%] md:w-[500px] h-[50%] flex flex-col justify-between  '
        >
          <input
            onChange={handleChange}
            value={value.title}
            name='title'
            className=' rounded p-2 text-2xl'
            placeholder='제목'
          />
          <textarea
            onChange={handleChange}
            value={value.content}
            name='content'
            className='border rounded p-3'
            placeholder='내용'
          />
          <input
            onChange={handleChange}
            value={value.deadLine}
            name='deadLine'
            type='datetime-local'
          />
          <SearchManager setValue={setValue} />
          <DropDown
            value={value.state}
            name='state'
            dropList={states}
            setValue={setValue}
          />
          <div className='flex justify-center gap-10'>
            <button type='submit' className='py-3 px-5 bg-sky-300 rounded'>
              추가
            </button>
            <button
              type='button'
              onClick={toggleModal}
              className='py-3 px-5 bg-red-300 rounded'
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
