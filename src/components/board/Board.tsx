import { Issue } from '../../types/issue';

interface Props {
  name: string;
  issues: Issue[];
}

const Board = ({ name }: Props) => {
  return <div id={name} className='mx-3 border w-[500px] h-[700px] p-5'></div>;
};

export default Board;
