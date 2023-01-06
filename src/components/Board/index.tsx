import { Dispatch, DragEvent, SetStateAction } from 'react';
import { IBoard } from '../../types/Types';
import Card from '../Card';
import { HiPlusSm } from 'react-icons/hi';
import { emptyCard } from '../../constants/boardsData';

interface Props {
  boards: IBoard[];
  board: IBoard;
  filter: string;
  targetCard: { boardId: number; cardId: number };
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  dragMargin: (boardId: number, cardId: number) => void;
  handleDragEnter: (boardId: number, cardId: number) => void;
  handleDragStart: (boardId: number, cardId: number) => void;
  handleDelete: (boardId: number, cardId: number) => void;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}

const Board = ({
  boards,
  board,
  setBoards,
  targetCard,
  dragMargin,
  handleDrop,
  handleDragEnter,
  handleDragStart,
  handleDelete,
}: Props) => {
  const createEmptyCard = (
    board: IBoard,
    setBoards: Dispatch<SetStateAction<IBoard[]>>
  ) => {
    const { state } = board;

    const newEmptyCard = {
      ...emptyCard,
      state: state,
      id: Math.ceil(Math.random() * 1000),
    };

    const tempBoards = [...boards];

    const targetBoardIndex = Number(
      tempBoards.findIndex((board) => board.state === state)
    );

    const targetBoard = tempBoards[targetBoardIndex];

    targetBoard.cards.push(newEmptyCard);

    setBoards(tempBoards);

    localStorage.setItem('boards', JSON.stringify(tempBoards));
  };

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
          boards={boards}
          setBoards={setBoards}
          targetCard={targetCard}
          handleDragEnter={handleDragEnter}
          handleDragStart={handleDragStart}
          handleDelete={handleDelete}
          dragMargin={dragMargin}
        />
      ))}
      <button
        onClick={() => createEmptyCard(board, setBoards)}
        className='bg-slate-100 rounded-lg w-full py-3 text-sm flex justify-center items-center gap-2'
      >
        <HiPlusSm size={22} />
        <p className=' opacity-40'>Add new card</p>
      </button>
    </ul>
  );
};

export default Board;
