import { useMemo, useState } from 'react';
import Board from '../components/Board/Board';
import Search from '../components/Inputs/Inputs';
import { useDragAndDrop } from '../hooks/useDranAndDrop';
import { useSortBoards } from '../hooks/useSortBoards';

const Dashboard = () => {
  const [boards, setBoards] = useState(useSortBoards);
  const [filter, setFilter] = useState('');
  const [targetCard, setTargetCard] = useState({
    boardId: -1,
    cardId: -1,
  });

  const {
    handleDragStart,
    handleDragEnter,
    handleDrop,
    dragMargin,
    handleDelete,
  } = useDragAndDrop(boards, setBoards, targetCard, setTargetCard);

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

  console.log(filteredBoards);
  return (
    <main className='relative h-screen py-10 px-10 lg:px-[250px] xl:px-[300px] '>
      <header>
        <h1 className='mb-10 text-7xl text-center'>Trillo</h1>
      </header>{' '}
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
