import { Issue } from '../../types/issue';
import Card from '../Card/Card';

interface Props {
  name: string;
  issues: Issue[];
}

const Board = ({ name, issues }: Props) => {
  return (
    <div id={name} className='mx-3 border w-[500px] h-[700px] p-5'>
      {issues.map((issue, idx) => (
        <Card key={idx} issue={issue} />
      ))}
    </div>
  );
};

export default Board;
