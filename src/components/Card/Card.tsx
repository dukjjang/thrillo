import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { IBoard, Issue } from '../../types/Types';
import { GoKebabHorizontal, GoTrashcan, GoPencil } from 'react-icons/go';
import { useCheckClickOutside } from '../../hooks/useCheckClickOutside';
import { cardOptions } from '../../constants/cardOptions';
import CardDetail from '../CardDetail/CardDetail';
import CardMenu from '../CardMenu';

interface Props {
  id: number;
  boardId: number;
  issue: Issue;
  boards: IBoard[];
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
  targetCard: { boardId: number; cardId: number };
  dragMargin: (boardId: number, cardId: number) => void;
  handleDragEnter: (boardId: number, cardId: number) => void;
  handleDragStart: (boardId: number, cardId: number) => void;
  handleDelete: (boardId: number, cardId: number) => void;
}

const Card = ({
  issue,
  id,
  boards,
  setBoards,
  boardId,
  dragMargin,
  handleDragEnter,
  handleDragStart,
  handleDelete,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const optionsRef = useRef<HTMLUListElement>(null);

  useCheckClickOutside(setIsMenuOpen, optionsRef);

  const handleOpenDetail = (e: React.MouseEvent<HTMLLIElement>) => {
    if (isMenuOpen) return;
    const target = e.target as HTMLElement;
    if (target.tagName !== 'svg' && target.tagName !== 'path') {
      setIsOpenDetail(true);
    }
  };

  return (
    <>
      <li
        id={id.toString()}
        onClick={handleOpenDetail}
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
            className={`${isMenuOpen && 'bg-slate-100'} ${
              !isMenuOpen && 'hover:bg-slate-50'
            }  rounded-md  p-2`}
            type='button'
            onClick={() => setIsMenuOpen(true)}
          >
            <GoKebabHorizontal size={22} />
          </button>
          {isMenuOpen && (
            <CardMenu
              optionsRef={optionsRef}
              handleDelete={handleDelete}
              boardId={boardId}
              cardId={id}
            />
          )}
        </div>
      </li>
      <>
        {isOpenDetail && (
          <CardDetail
            cardIdx={id}
            boards={boards}
            setBoards={setBoards}
            toggleModal={setIsOpenDetail}
            item={issue}
          />
        )}
      </>
    </>
  );
};

export default Card;
