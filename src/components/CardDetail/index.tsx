import {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
  LegacyRef,
} from 'react';
import { IBoard, Issue } from '../../types/Types';
import DropDown from '../DropDown';
import { states } from '../../constants/dropList';
import SearchManager from '../SearchManager';
import { useClickOutside } from '../../hooks/useClickOutside';

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

    const fromIndex = cardIdx;

    const tempBoards = [...boards];

    const targetBoardIndex = Number(
      tempBoards.findIndex((board) => board.state === value.state)
    );

    const targetBoard = tempBoards.filter(
      (board) => board.state === value.state
    )[0];

    const originalIdx = boards[targetBoardIndex].cards.findIndex(
      (card) => card.id === id
    );

    const currentId = cardIdx > 0 ? originalIdx : originalIdx;

    const targetCard = tempBoards[targetBoardIndex].cards[currentId];

    const newValue = {
      ...value,
      id: cardIdx < 0 ? Math.ceil(Math.random() * 1000) : id,
    };

    const fromBoard = tempBoards.filter((board) => board.state === state)[0];

    if (state !== value.state) {
      fromBoard.cards.splice(fromIndex, 1);
    }

    if (targetCard !== undefined) {
      targetBoard.cards[currentId] = value;
    }

    if (targetCard === undefined || cardIdx < 0) {
      targetBoard.cards.push(newValue);
      tempBoards[targetBoardIndex] = targetBoard;
    }

    setBoards(tempBoards);

    localStorage.setItem('boards', JSON.stringify(tempBoards));
    toggleModal(false);
  };

  const domNode = useClickOutside(toggleModal);

  return (
    <div className=' fixed top-0 left-0 w-full z-20 h-screen '>
      <div className='  flex justify-center items-center bg-[rgba(0,0,0,0.03)]  h-screen'>
        <form
          ref={domNode as LegacyRef<HTMLFormElement>}
          onSubmit={handleSubmit}
          className='border rounded-lg shadow-xl bg-white py-20 px-20 w-full h-full md:h-[600px] md:w-[500px] flex flex-col justify-between  '
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
