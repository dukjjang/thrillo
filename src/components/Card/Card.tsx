import { useState } from 'react';
import { Issue } from '../../types/Types';

interface Props {
  id: number;
  boardId: number;
  issue: Issue;
  targetCard: { boardId: number; cardId: number };
  dragMargin: (boardId: number, cardId: number) => void;
  handleDragEnter: (boardId: number, cardId: number) => void;
  handleDragStart: (boardId: number, cardId: number) => void;
}

const Card = ({
  issue,
  id,
  boardId,
  targetCard,
  dragMargin,
  handleDragEnter,
  handleDragStart,
}: Props) => {
  return (
    <li
      id={id.toString()}
      draggable
      onDragStart={() => {
        handleDragStart(boardId, id);
      }}
      onDragEnter={() => handleDragEnter(boardId, Number(id))}
      className={` ${dragMargin(
        boardId,
        id
      )} duration-300 bg-sky-200 mb-2 cursor-move flex gap-2 p-4 border rounded border-slate-400`}
    >
      <input type='checkbox' />
      <p>{issue.title}</p>
    </li>
  );
};

export default Card;
