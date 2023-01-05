import { Issue } from '../../types/Types';

interface Props {
  id: number;
  boardId: number;
  issue: Issue;
  targetCard: { boardId: number; cardId: number };
  dragMargin: (boardId: number, cardId: number) => void;
  handleDragEnter: (boardId: number, cardId: number) => void;
  handleDragStart: (boardId: number, cardId: number) => void;
  handleDelete: (boardId: number, cardId: number) => void;
}

const Card = ({
  issue,
  id,
  boardId,
  dragMargin,
  handleDragEnter,
  handleDragStart,
  handleDelete,
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
      )} duration-300 bg-sky-200 mb-2 cursor-pointer flex justify-between items-center gap-2 p-4 border rounded border-slate-400`}
    >
      <p>{issue.title}</p>
      <button
        className='bg-red-400 p-2 rounded'
        type='button'
        onClick={(e) => handleDelete(boardId, id)}
      >
        삭제
      </button>
    </li>
  );
};

export default Card;
