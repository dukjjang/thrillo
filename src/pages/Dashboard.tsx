import Board from '../components/Board/Board';
import Input from '../components/Input/Input';
import { useDragAndDrop } from '../hooks/useDranAndDrop';

const Dashboard = () => {
  const { boards, handleDragStart, handleDragEnter, handleDrop } =
    useDragAndDrop();

  return (
    <main>
      <h1 className='mb-2 text-4xl'>Trillo</h1>
      <Input />
      <section className='flex'>
        {boards.map((board) => {
          return (
            <Board
              key={board.id}
              board={board}
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
