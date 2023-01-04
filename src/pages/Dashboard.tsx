import Board from '../components/Board/Board';
import Input from '../components/Input/Input';
import { boards } from '../constants/boards';
const Dashboard = () => {
  return (
    <main>
      <h1 className='mb-2 text-4xl'>Todo List</h1>
      <Input />
      <section className='flex'>
        {boards.map((board) => (
          <Board name={board} />
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
