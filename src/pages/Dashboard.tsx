import Board from '../components/Board/Board';
import Input from '../components/Input/Input';
const Dashboard = () => {
  return (
    <div>
      <h1 className='mb-2 text-4xl'>Todo List</h1>
      <Input />
      <Board />
    </div>
  );
};

export default Dashboard;
