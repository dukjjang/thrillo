import { Issue } from '../../types/Types';
import { GoKebabHorizontal, GoTrashcan, GoPencil } from 'react-icons/go';
import { useState } from 'react';

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
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const cardOptions = [
    { id: 0, name: '편집' },
    { id: 1, name: '삭제' },
  ];
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
      )} text-sm duration-300 mb-2 cursor-pointer flex justify-between items-center gap-2 p-4 border rounded-lg shadow-lg`}
    >
      <img
        alt='profile'
        src={issue.image}
        className=' rounded-full w-10 h-10 '
      />
      <p>{issue.title}</p>
      <div className=' relative'>
        <button
          className=''
          type='button'
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        >
          <GoKebabHorizontal size={20} />
        </button>
        {isOptionsOpen && (
          <ul className='  w-28 py-2 px-1 border bg-white rounded-lg -mt-2 overflow-hidden shadow-xl absolute z-10 '>
            {cardOptions.map((option) => (
              <li
                className='flex justify-start rounded-md items-center py-2  px-2 gap-2 hover:bg-gray-200 text-sm '
                key={option.id}
              >
                {option.name === '삭제' && <GoTrashcan size={17} />}
                {option.name === '편집' && <GoPencil size={17} />}
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default Card;
