import { useState } from 'react';
import Board from '../components/Board/Board';
import Input from '../components/Input/Input';
import { boards } from '../constants/boards';
import { issuesData } from '../constants/issues';

const Dashboard = () => {
  const [issues, setIssues] = useState(issuesData);
  return (
    <main>
      <h1 className='mb-2 text-4xl'>Todo List</h1>
      <Input />
      <section className='flex'>
        {boards.map((boardName) => {
          const data = issues.filter((issue) => issue.state === boardName);
          return <Board key={boardName} name={boardName} issues={data} />;
        })}
      </section>
    </main>
  );
};

export default Dashboard;
