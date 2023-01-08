import { useMemo, useState } from 'react';
import Board from '../components/Board';
import Search from '../components/Search';
import { useDragAndDrop } from '../hooks/useDranAndDrop';
import { useSortBoards } from '../constants/getLocalData';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { IBoard } from '../types/Types';
import useDebounce from '../hooks/useDebounce';

const Dashboard = () => {
  const [boards, setBoards] = useState(useSortBoards);
  const [filter, setFilter] = useState('');
  const [light, setLight] = useState(false);

  const [targetCard, setTargetCard] = useState({
    boardId: -1,
    cardId: -1,
  });

  const debouncedSearch = useDebounce(filter, 300);

  const filteredBoards = useMemo(
    () =>
      boards.map((board: IBoard) => {
        const filteredCards = board.cards.filter((card) => {
          return (
            card.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            card.managers.filter((m) =>
              m.toLowerCase().includes(debouncedSearch.toLowerCase())
            ).length ||
            card.content.toLowerCase().includes(debouncedSearch.toLowerCase())
          );
        });
        const filteredBoard = { ...board, cards: filteredCards };
        return filteredBoard;
      }),
    [boards, debouncedSearch]
  );

  const {
    handleDragStart,
    handleDragEnter,
    handleDrop,
    dragMargin,
    handleDelete,
  } = useDragAndDrop(
    boards,
    filteredBoards,
    setBoards,
    targetCard,
    setTargetCard
  );

  return (
    <main className='relative h-screen py-10 px-10 lg:px-[250px] xl:px-[300px] '>
      <header className='mb-10 gap-2 flex justify-center items-center'>
        {light ? (
          <FaLightbulb
            onClick={() => setLight(!light)}
            size={40}
            className=' cursor-pointer text-yellow-400'
          />
        ) : (
          <FaRegLightbulb
            className=' cursor-pointer'
            onClick={() => setLight(!light)}
            size={40}
          />
        )}

        <h1 className=' text-6xl text-center font-semibold'>Thrillo</h1>
      </header>
      <Search
        filter={filter}
        boards={boards}
        setFilter={setFilter}
        setBoards={setBoards}
      />
      <div className='grid md:grid-cols-3'>
        {filteredBoards.map((board: IBoard) => {
          return (
            <Board
              key={board.id}
              board={board}
              boards={boards}
              setBoards={setBoards}
              filter={filter}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              handleDragEnter={handleDragEnter}
              targetCard={targetCard}
              dragMargin={dragMargin}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Dashboard;
