import { useMemo, useState } from 'react';
import Board from '../components/Board';
import Search from '../components/Search';
import { useDragAndDrop } from '../hooks/useDranAndDrop';
import { useSortBoards } from '../hooks/useSortBoards';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';

const Dashboard = () => {
  const [boards, setBoards] = useState(useSortBoards);
  const [filter, setFilter] = useState('');
  const [light, setLight] = useState(false);

  const [targetCard, setTargetCard] = useState({
    boardId: -1,
    cardId: -1,
  });

  const filteredBoards = useMemo(
    () =>
      boards.map((board) => {
        const filteredCards = board.cards.filter((card) => {
          return (
            card.title.toLowerCase().includes(filter.toLowerCase()) ||
            card.manager.toLowerCase().includes(filter.toLowerCase()) ||
            card.content.toLowerCase().includes(filter.toLowerCase())
          );
        });
        const filteredBoard = { ...board, cards: filteredCards };
        return filteredBoard;
      }),
    [filter, boards]
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

        <h1 className=' text-6xl text-center font-semibold'>Trillo</h1>
      </header>
      <Search
        filter={filter}
        boards={boards}
        setFilter={setFilter}
        setBoards={setBoards}
      />
      <div className='flex justify-center'>
        {filteredBoards.map((board) => {
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
