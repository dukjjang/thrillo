import {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { IBoard, Issue } from '../../types/Types';
import DropDown from '../DropDown/DropDown';
import { states } from '../../constants/dropList';
import SearchManager from '../SearchManager';

interface Props {
  toggleModal: Dispatch<SetStateAction<boolean>>;
  boards: IBoard[];
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
  item: Issue;
  cardIdx: number;
}
const CardDetail = ({
  toggleModal,
  boards,
  setBoards,
  item,
  cardIdx,
}: Props) => {
  const { id, title, content, state, manager, deadLine, image } = item;
  const [value, setValue] = useState({
    id,
    title,
    content,
    deadLine,
    state,
    manager,
    image,
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

    const targetCard = tempBoards[targetBoardIndex].cards.filter(
      (card) => card.id === Number(id)
    )[0];

    const newValue = {
      ...value,
      id: Math.ceil(Math.random() * 1000),
    };

    if (targetCard !== undefined) targetBoard.cards[cardIdx] = value;
    if (targetCard === undefined) targetBoard.cards.push(newValue);

    tempBoards[targetBoardIndex] = targetBoard;

    setBoards(tempBoards);
    toggleModal(false);
  };

  return (
    <div className=' fixed top-0 left-0 w-full z-20 h-screen '>
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
          <SearchManager manager={manager} setValue={setValue} />
          <DropDown
            value={value.state}
            name='state'
            dropList={states}
            setValue={setValue}
          />
          <div className='flex justify-center gap-10'>
            <button type='submit' className='py-3 px-5 bg-sky-300 rounded'>
              저장
            </button>
            <button
              type='button'
              onClick={() => toggleModal(false)}
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

export default CardDetail;
