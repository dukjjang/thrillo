import { DragEvent } from 'react';
import { IBoard } from '../../types/Types';
import Card from '../Card/Card';

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
      className='mx-3 border w-[500px] h-[700px] p-5'
    >
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
    </ul>
  );
};

export default Board;
