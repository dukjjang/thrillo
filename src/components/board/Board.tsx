import { DragEvent } from 'react';
import { IBoard } from '../../types/Types';
import Card from '../Card/Card';
import { HiPlusSm } from 'react-icons/hi';

interface Props {
  board: IBoard;
  filter: string;
  targetCard: { boardId: number; cardId: number };
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  dragMargin: (boardId: number, cardId: number) => void;
  handleDragEnter: (boardId: number, cardId: number) => void;
  handleDragStart: (boardId: number, cardId: number) => void;
  handleDelete: (boardId: number, cardId: number) => void;
}

const Board = ({
  board,
  targetCard,
  dragMargin,
  handleDrop,
  handleDragEnter,
  handleDragStart,
  handleDelete,
}: Props) => {
  return (
    <ul
      id={board.id.toString()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className='py-5 mx-3  w-[500px] md:p-5'
    >
      <div className='px-2 mb-3 '>
        <h2>{board.name}</h2>
      </div>
      {board.cards.map((issue, idx) => (
        <Card
          key={idx}
          id={idx}
          boardId={board.id}
          issue={issue}
          targetCard={targetCard}
          handleDragEnter={handleDragEnter}
          handleDragStart={handleDragStart}
          handleDelete={handleDelete}
          dragMargin={dragMargin}
        />
      ))}
      <button className='bg-slate-100 rounded-lg w-full py-3 text-sm flex justify-center items-center gap-2'>
        <HiPlusSm size={22} />
        <p className=' opacity-50'>Add new Card</p>
      </button>
    </ul>
  );
};

export default Board;
