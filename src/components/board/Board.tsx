import { DragEvent } from 'react';
import { IBoard } from '../../types/Types';
import Card from '../Card/Card';

interface Props {
  board: IBoard;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  handleDragEnter: (boardId: number, cardId: number) => void;
  handleDragStart: (boardId: number, cardId: number) => void;
}

const Board = ({
  board,
  handleDrop,
  handleDragEnter,
  handleDragStart,
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
          handleDragEnter={handleDragEnter}
          handleDragStart={handleDragStart}
        />
      ))}
    </ul>
  );
};

export default Board;
