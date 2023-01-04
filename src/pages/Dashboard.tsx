import { useMemo, useState } from 'react';
import Board from '../components/Board/Board';
import Search from '../components/Search/Search';
import { boardsData } from '../constants/boardsData';
import { useDragAndDrop } from '../hooks/useDranAndDrop';

const Dashboard = () => {
  const [boards, setBoards] = useState(boardsData);
  const [filter, setFilter] = useState('');
  const { handleDragStart, handleDragEnter, handleDrop } = useDragAndDrop(
    boards,
    setBoards
  );

  const filteredBoards = useMemo(
    () =>
      boards.map((board) => {
        const filteredCards = board.cards.filter((card) => {
          return card.manager.toLowerCase().includes(filter.toLowerCase());
        });
        const filteredBoard = { ...board, cards: filteredCards };
        return filteredBoard;
      }),
    [filter, boards]
  );

  return (
    <main>
      <h1 className='mb-2 text-4xl'>Trillo</h1>
      <Search filter={filter} setFilter={setFilter} setBoards={setBoards} />
      <section className='flex'>
        {filteredBoards.map((board) => {
          return (
            <Board
              key={board.id}
              board={board}
              filter={filter}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              handleDragEnter={handleDragEnter}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Dashboard;
