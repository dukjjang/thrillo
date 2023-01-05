import { useRef, useState } from 'react';
import { Issue } from '../../types/Types';
import { GoKebabHorizontal, GoTrashcan, GoPencil } from 'react-icons/go';
import { useCheckClickOutside } from '../../hooks/useCheckClickOutside';
import { cardOptions } from '../../constants/cardOptions';

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
  const optionsRef = useRef<HTMLUListElement>(null);

  useCheckClickOutside(setIsOptionsOpen, optionsRef);

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
      )} min-w-[122px] bg-white text-sm duration-300 mb-3 cursor-pointer flex justify-between items-center gap-2 p-4 border rounded-lg shadow-lg`}
    >
      <img
        draggable='false'
        alt='profile'
        src={issue.image}
        className=' object-cover hidden md:block rounded-full w-10 h-10 '
      />
      <p>{issue.title}</p>
      <div className=' relative'>
        <button
          className=''
          type='button'
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        >
          <GoKebabHorizontal size={22} />
        </button>
        {isOptionsOpen && (
          <ul
            ref={optionsRef}
            className=' w-28 py-2 px-1 border bg-white rounded-lg -mt-2 overflow-hidden shadow-xl absolute z-10 '
          >
            {cardOptions.map((option) => {
              const { name } = option;
              return (
                <li
                  className='flex justify-start rounded-md items-center py-2  px-2 gap-2 hover:bg-gray-200 text-sm '
                  key={id}
                  onClick={() => {
                    name === '삭제' && handleDelete(boardId, id);
                  }}
                >
                  {name === '삭제' && <GoTrashcan size={17} />}
                  {name === '편집' && <GoPencil size={17} />}
                  <p>{name}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
};

export default Card;
